import { useEffect, useState, type FormEvent } from "react";
import { collection, getDocs, orderBy, query, type DocumentData } from "firebase/firestore";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/firebase";
import { addJobRole, deleteJobRole, fetchJobs, updateJobRole } from "@/lib/jobService";
import { addLinkedInPost, deleteLinkedInPost, fetchLinkedInPosts, parseLinkedInEmbedSrc } from "@/lib/linkedinService";
import type { JobRole, JobRoleInput } from "@/types/job";
import type { LinkedInPost } from "@/types/linkedin";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const SESSION_KEY = "orbigreen_admin_session";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-primary/10 bg-white px-3.5 py-2.5 text-[14px] lg:text-[15px] text-primary outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)]";

const labelClass = "section-label text-primary/50";

type Submission = { id: string } & DocumentData;

function formatDate(value: unknown): string {
  const ts = value as { toDate?: () => Date } | undefined;
  if (ts?.toDate) {
    return ts.toDate().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  }
  if (typeof value === "string") {
    return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  }
  return "—";
}

function AdminLogin({ onLogin }: { onLogin: (username: string, password: string) => boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!onLogin(username, password)) {
      setError("Incorrect username or password.");
      return;
    }
    setError("");
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-20">
      <SectionLabel>Admin</SectionLabel>
      <h1 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-primary">
        Management Center Sign in
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-primary/65">
        Sign in to view form submissions, post job roles, and embed LinkedIn posts.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-primary/10 bg-white p-6">
        <label className="block">
          <span className={labelClass}>Username</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={fieldClass}
            placeholder="Username"
            autoComplete="username"
            required
          />
        </label>
        <label className="mt-4 block">
          <span className={labelClass}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="mt-3 text-[13px] font-medium text-red-600">{error}</p> : null}
        <button
          type="submit"
          className="gradient-border-cta mt-5 w-full rounded-full px-6 py-3 text-[14px] font-semibold"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

function SubmissionsTable({ rows, columns }: { rows: Submission[]; columns: string[] }) {
  if (rows.length === 0) {
    return <p className="px-5 py-8 text-[14px] text-primary/55">No submissions yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-primary/10 text-primary/50">
            <th className="px-4 py-3 font-semibold">Received</th>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 font-semibold capitalize">
                {col.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/8">
          {rows.map((row) => (
            <tr key={row.id} className="align-top">
              <td className="whitespace-nowrap px-4 py-3 text-primary/60">{formatDate(row.createdAt)}</td>
              {columns.map((col) => (
                <td key={col} className="max-w-[240px] px-4 py-3 text-primary">
                  {col === "attachments" ? (
                    Array.isArray(row.attachments) && row.attachments.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {(row.attachments as { name: string; url: string }[]).map((file) => (
                          <a
                            key={file.url}
                            href={file.url}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate text-secondary underline hover:text-secondary/80 font-medium"
                          >
                            📄 {file.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )
                  ) : (
                    String(row[col] ?? "—")
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- JOB EDITOR MODAL --- */
interface JobEditorModalProps {
  initialJob?: JobRole | null;
  onSave: (input: JobRoleInput) => Promise<void>;
  onClose: () => void;
}

function JobEditorModal({ initialJob, onSave, onClose }: JobEditorModalProps) {
  const [title, setTitle] = useState(initialJob?.title ?? "");
  const [department, setDepartment] = useState(initialJob?.department ?? "Engineering & Quality");
  const [location, setLocation] = useState(initialJob?.location ?? "Mumbai, India / Hybrid");
  const [type, setType] = useState(initialJob?.type ?? "Full-time");
  const [experience, setExperience] = useState(initialJob?.experience ?? "3-5 years");
  const [linkedinUrl, setLinkedinUrl] = useState(initialJob?.linkedinUrl ?? "");
  const [description, setDescription] = useState(initialJob?.description ?? "");
  const [responsibilitiesText, setResponsibilitiesText] = useState((initialJob?.responsibilities ?? []).join("\n"));
  const [requirementsText, setRequirementsText] = useState((initialJob?.requirements ?? []).join("\n"));
  const [benefitsText, setBenefitsText] = useState((initialJob?.benefits ?? []).join("\n"));
  const [status, setStatus] = useState<"active" | "closed">(initialJob?.status ?? "active");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !department.trim() || !description.trim()) {
      setErr("Title, Department, and Description are required.");
      return;
    }
    setSaving(true);
    setErr("");

    try {
      await onSave({
        title,
        department,
        location,
        type,
        experience,
        linkedinUrl: linkedinUrl.trim() || undefined,
        description,
        responsibilities: responsibilitiesText.split("\n").filter(Boolean),
        requirements: requirementsText.split("\n").filter(Boolean),
        benefits: benefitsText.split("\n").filter(Boolean),
        status,
      });
      onClose();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Failed to save job posting.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[150] flex flex-col bg-section text-primary overflow-hidden">
      <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-primary/10 bg-white/90 px-6 py-4 backdrop-blur-md lg:px-12">
        <div>
          <SectionLabel>Admin Job Editor</SectionLabel>
          <h1 className="mt-1 text-[20px] lg:text-[24px] font-bold tracking-tight text-primary">
            {initialJob ? "Edit Job Posting" : "Post New Job Role"}
          </h1>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-[18px] text-primary/70 transition-colors hover:bg-primary/15 hover:text-primary"
          aria-label="Close page"
        >
          ✕
        </button>
      </header>

      <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 lg:px-12 lg:py-12">
        <form
          id="job-editor-form"
          onSubmit={handleSubmit}
          className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-primary/10 bg-white p-6 sm:p-10 shadow-lg"
        >
          <label className="block">
            <span className={labelClass}>Job Title *</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              placeholder="e.g. Senior Quality Engineer"
              required
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Department *</span>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={fieldClass}
                placeholder="e.g. Engineering & Quality"
                required
              />
            </label>

            <label className="block">
              <span className={labelClass}>Location *</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={fieldClass}
                placeholder="e.g. Mumbai, India / Hybrid"
                required
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Employment Type</span>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={fieldClass}
                placeholder="Full-time / Part-time"
              />
            </label>

            <label className="block">
              <span className={labelClass}>Experience</span>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={fieldClass}
                placeholder="e.g. 3-5 years"
              />
            </label>

            <label className="block">
              <span className={labelClass}>Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "closed")}
                className={fieldClass}
              >
                <option value="active">Active (Open)</option>
                <option value="closed">Closed (Archived)</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className={labelClass}>LinkedIn Post / External Application Link (optional)</span>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className={fieldClass}
              placeholder="https://www.linkedin.com/jobs/view/..."
            />
          </label>

          <label className="block">
            <span className={labelClass}>Description / Summary *</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${fieldClass} min-h-[120px] resize-y leading-relaxed`}
              placeholder="Brief summary of the role..."
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Responsibilities (one per line)</span>
            <textarea
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              className={`${fieldClass} min-h-[140px] resize-y leading-relaxed`}
              placeholder="Evaluate RFQs&#10;Conduct supplier quality audits"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Requirements / Qualifications (one per line)</span>
            <textarea
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              className={`${fieldClass} min-h-[140px] resize-y leading-relaxed`}
              placeholder="Degree in Mechanical Engineering&#10;5+ years experience"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Benefits & Perks (one per line)</span>
            <textarea
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              className={`${fieldClass} min-h-[100px] resize-y leading-relaxed`}
              placeholder="Competitive salary package&#10;Health insurance & bonuses"
            />
          </label>

          {err ? <p className="text-[14px] font-medium text-red-600">{err}</p> : null}
        </form>
      </div>

      <footer className="sticky bottom-0 z-20 flex shrink-0 items-center justify-end gap-3 border-t border-primary/10 bg-white/90 px-6 py-4 backdrop-blur-md lg:px-12">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-primary/15 bg-white px-6 py-3 text-[14px] font-semibold text-primary/70 transition-colors hover:bg-primary/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="job-editor-form"
          disabled={saving}
          className="gradient-border-cta rounded-full px-8 py-3 text-[15px] font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : initialJob ? "Update Job Posting" : "Publish Job Role"}
        </button>
      </footer>
    </div>
  );
}

/* --- LINKEDIN POST MODAL --- */
function LinkedInModal({
  onSave,
  onClose,
}: {
  onSave: (title: string, embedCode: string) => Promise<void>;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !embedCode.trim()) {
      setErr("Title and Embed Code / URL are required.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      await onSave(title, embedCode);
      onClose();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Failed to add LinkedIn post.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[150] flex flex-col bg-section text-primary overflow-hidden">
      <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-primary/10 bg-white/90 px-6 py-4 backdrop-blur-md lg:px-12">
        <div>
          <SectionLabel>LinkedIn Post Embed</SectionLabel>
          <h1 className="mt-1 text-[20px] lg:text-[24px] font-bold tracking-tight text-primary">
            Embed LinkedIn Post
          </h1>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-[18px] text-primary/70 transition-colors hover:bg-primary/15 hover:text-primary"
          aria-label="Close page"
        >
          ✕
        </button>
      </header>

      <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 lg:px-12 lg:py-12">
        <form
          id="linkedin-form"
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-primary/10 bg-white p-6 sm:p-10 shadow-lg"
        >
          <label className="block">
            <span className={labelClass}>Post Title / Headline *</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              placeholder="e.g. Latest Manufacturing & Sourcing Update"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>LinkedIn Embed Code or Iframe URL *</span>
            <textarea
              value={embedCode}
              onChange={(e) => setEmbedCode(e.target.value)}
              className={`${fieldClass} min-h-[160px] resize-y font-mono text-[13px]`}
              placeholder={`Paste raw <iframe src="..."></iframe> embed code OR embed URL here...`}
              required
            />
            <span className="mt-1.5 block text-[12px] text-primary/50">
              Tip: Go to any LinkedIn post, click "Embed this post", copy the HTML snippet and paste it above.
            </span>
          </label>

          {err ? <p className="text-[14px] font-medium text-red-600">{err}</p> : null}
        </form>
      </div>

      <footer className="sticky bottom-0 z-20 flex shrink-0 items-center justify-end gap-3 border-t border-primary/10 bg-white/90 px-6 py-4 backdrop-blur-md lg:px-12">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-primary/15 bg-white px-6 py-3 text-[14px] font-semibold text-primary/70 transition-colors hover:bg-primary/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="linkedin-form"
          disabled={saving}
          className="gradient-border-cta rounded-full px-8 py-3 text-[15px] font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Embed LinkedIn Post"}
        </button>
      </footer>
    </div>
  );
}

/* --- MAIN ADMIN PAGE COMPONENT --- */
export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [tab, setTab] = useState<"contacts" | "quotations" | "jobs" | "linkedin">("contacts");
  
  // Data States
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [quotations, setQuotations] = useState<Submission[]>([]);
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Modals
  const [editingJob, setEditingJob] = useState<JobRole | null | "NEW">(null);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);

  const login = (username: string, password: string) => {
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) return false;
    sessionStorage.setItem(SESSION_KEY, "1");
    setIsAdmin(true);
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  };

  const reloadJobs = async () => {
    const fetchedJobs = await fetchJobs();
    setJobs(fetchedJobs);
  };

  const reloadLinkedInPosts = async () => {
    const fetched = await fetchLinkedInPosts();
    setLinkedInPosts(fetched);
  };

  useEffect(() => {
    if (!isAdmin) return;

    let cancelled = false;
    setLoading(true);
    setLoadError("");

    Promise.all([
      getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc"))),
      getDocs(query(collection(db, "quotations"), orderBy("createdAt", "desc"))),
      fetchJobs(),
      fetchLinkedInPosts(),
    ])
      .then(([contactsSnap, quotationsSnap, fetchedJobs, fetchedLi]) => {
        if (cancelled) return;
        setContacts(contactsSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
        setQuotations(quotationsSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
        setJobs(fetchedJobs);
        setLinkedInPosts(fetchedLi);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load submissions.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  // Job Actions
  const handleSaveJob = async (input: JobRoleInput) => {
    if (editingJob && editingJob !== "NEW") {
      await updateJobRole(editingJob.id, input);
    } else {
      await addJobRole(input);
    }
    await reloadJobs();
    setEditingJob(null);
  };

  const handleDeleteJob = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job role?")) return;
    setJobs((prev) => prev.filter((j) => j.id !== id));
    try {
      await deleteJobRole(id);
    } catch (err) {
      console.warn("Error deleting job role:", err);
    }
    await reloadJobs();
  };

  const handleToggleJobStatus = async (job: JobRole) => {
    const nextStatus = job.status === "active" ? "closed" : "active";
    await updateJobRole(job.id, {
      ...job,
      status: nextStatus,
    });
    await reloadJobs();
  };

  // LinkedIn Actions
  const handleAddLinkedIn = async (title: string, embedCode: string) => {
    await addLinkedInPost({ title, embedCode });
    await reloadLinkedInPosts();
  };

  const handleDeleteLinkedIn = async (id: string) => {
    if (!window.confirm("Delete this LinkedIn post embed?")) return;
    setLinkedInPosts((prev) => prev.filter((p) => p.id !== id));
    await deleteLinkedInPost(id);
    await reloadLinkedInPosts();
  };

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-28">
        {!isAdmin ? (
          <AdminLogin onLogin={login} />
        ) : (
          <div className="mx-auto max-w-[1100px] px-6 pb-20 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel>Admin Dashboard</SectionLabel>
                <h1 className="mt-3 text-[clamp(1.9rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
                  Management Center
                </h1>
                <p className="mt-2 text-[14px] text-primary/65">
                  View contact messages, quotation requests, manage career postings, and embed LinkedIn posts.
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-primary/10 bg-white px-4 py-2.5 text-[13px] font-semibold text-primary/70"
              >
                Sign out
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTab("contacts")}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                  tab === "contacts" ? "gradient-border-cta" : "glass-card-light text-primary/70"
                }`}
              >
                Contact messages ({contacts.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("quotations")}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                  tab === "quotations" ? "gradient-border-cta" : "glass-card-light text-primary/70"
                }`}
              >
                Quotation requests ({quotations.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("jobs")}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                  tab === "jobs" ? "gradient-border-cta" : "glass-card-light text-primary/70"
                }`}
              >
                Job Roles ({jobs.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("linkedin")}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                  tab === "linkedin" ? "gradient-border-cta" : "glass-card-light text-primary/70"
                }`}
              >
                LinkedIn Posts ({linkedInPosts.length})
              </button>
            </div>

            {/* Top Action Bar */}
            {tab === "jobs" && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingJob("NEW")}
                  className="gradient-border-cta rounded-full px-5 py-2 text-[13px] font-semibold"
                >
                  + Post New Job Role
                </button>
              </div>
            )}
            {tab === "linkedin" && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowLinkedInModal(true)}
                  className="gradient-border-cta rounded-full px-5 py-2 text-[13px] font-semibold"
                >
                  + Embed LinkedIn Post
                </button>
              </div>
            )}

            {/* Content Table Container */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
              {loading ? (
                <p className="px-5 py-8 text-[14px] text-primary/55">Loading…</p>
              ) : loadError ? (
                <p className="px-5 py-8 text-[14px] text-red-600">{loadError}</p>
              ) : tab === "contacts" ? (
                <SubmissionsTable rows={contacts} columns={["name", "email", "message"]} />
              ) : tab === "quotations" ? (
                <SubmissionsTable
                  rows={quotations}
                  columns={[
                    "company",
                    "contact_person",
                    "email",
                    "phone",
                    "category",
                    "quantity",
                    "details",
                    "attachments",
                  ]}
                />
              ) : tab === "jobs" ? (
                jobs.length === 0 ? (
                  <p className="px-5 py-8 text-[14px] text-primary/55">No job postings created yet.</p>
                ) : (
                  <div className="divide-y divide-primary/8">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[16px] font-bold text-primary">{job.title}</h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                job.status === "active"
                                  ? "bg-secondary/15 text-secondary"
                                  : "bg-primary/10 text-primary/50"
                              }`}
                            >
                              {job.status}
                            </span>
                            {job.linkedinUrl && (
                              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                                🔗 LinkedIn Attached
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-primary/65">
                            {job.department} · {job.location} · {job.type} ({job.experience})
                          </p>
                          <p className="line-clamp-1 text-[13px] text-primary/55">{job.description}</p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleJobStatus(job)}
                            className="rounded-full border border-primary/15 px-3 py-1.5 text-[12px] font-semibold text-primary/80 hover:bg-primary/5"
                          >
                            {job.status === "active" ? "Close Role" : "Re-open Role"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingJob(job)}
                            className="rounded-full border border-primary/15 px-3 py-1.5 text-[12px] font-semibold text-primary hover:bg-primary/5"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteJob(job.id)}
                            className="rounded-full border border-red-200 px-3 py-1.5 text-[12px] font-semibold text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : linkedInPosts.length === 0 ? (
                <p className="px-5 py-8 text-[14px] text-primary/55">No LinkedIn posts embedded yet.</p>
              ) : (
                <div className="grid gap-6 p-6 sm:grid-cols-2">
                  {linkedInPosts.map((post) => {
                    const iframeSrc = parseLinkedInEmbedSrc(post.embedCode);
                    return (
                      <div
                        key={post.id}
                        className="flex flex-col justify-between rounded-2xl border border-primary/10 bg-section/30 p-4 shadow-sm"
                      >
                        <div>
                          <h3 className="text-[15px] font-bold text-primary">{post.title}</h3>
                          <div className="mt-3 overflow-hidden rounded-xl bg-white border border-primary/10">
                            <iframe
                              src={iframeSrc}
                              title={post.title}
                              className="w-full h-[420px] border-0"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteLinkedIn(post.id)}
                            className="rounded-full border border-red-200 px-4 py-1.5 text-[12px] font-semibold text-red-600 hover:bg-red-50"
                          >
                            Delete Embed
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {editingJob && (
        <JobEditorModal
          initialJob={editingJob === "NEW" ? null : editingJob}
          onSave={handleSaveJob}
          onClose={() => setEditingJob(null)}
        />
      )}

      {showLinkedInModal && (
        <LinkedInModal onSave={handleAddLinkedIn} onClose={() => setShowLinkedInModal(false)} />
      )}

      <Footer />
    </div>
  );
}
