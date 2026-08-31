import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { fetchJobs, submitJobApplication } from "@/lib/jobService";
import type { JobRole } from "@/types/job";

const EASE = [0.16, 1, 0.3, 1] as const;

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-primary/10 bg-white/90 px-3.5 py-2.5 text-[14px] text-primary outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)]";

const labelClass = "section-label text-primary/50";

interface ApplyModalProps {
  job: JobRole;
  onClose: () => void;
}

function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      await submitJobApplication(
        job.id,
        job.title,
        {
          applicantName: name,
          email,
          phone,
          experienceYears: experience,
          coverNote,
        },
        resume,
      );
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-10 flex flex-col w-full max-w-xl max-h-[85vh] overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-primary/10 p-6 bg-white">
          <div>
            <SectionLabel>Apply Now</SectionLabel>
            <h3 className="mt-1 text-[20px] font-semibold text-primary">{job.title}</h3>
            <p className="text-[13px] text-primary/60">
              {job.department} · {job.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-primary/5 p-2 text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
          >
            ✕
          </button>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-[28px] text-secondary">
                ✓
              </div>
              <h4 className="mt-4 text-[18px] font-semibold text-primary">Application Submitted!</h4>
              <p className="mt-2 text-[14px] text-primary/65">
                Thank you for applying to Orbigreen Techsource. Our talent team will review your application and contact
                you soon.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="gradient-border-cta mt-6 rounded-full px-6 py-2.5 text-[14px] font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className={labelClass}>Full Name *</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  placeholder="e.g. Alex Morgan"
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Email Address *</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                    placeholder="alex@example.com"
                    required
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Phone Number *</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Years of Experience</span>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={fieldClass}
                  placeholder="e.g. 4 years in Quality Engineering"
                />
              </label>

              <label className="block">
                <span className={labelClass}>Resume / CV (PDF, DOCX up to 10MB)</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  className="mt-1.5 w-full text-[13px] text-primary/70 file:mr-3 file:rounded-xl file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-[12px] file:font-semibold file:text-primary hover:file:bg-primary/20"
                />
              </label>

              <label className="block">
                <span className={labelClass}>Cover Note / Short Intro</span>
                <textarea
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className={`${fieldClass} min-h-[90px] resize-y`}
                  placeholder="Briefly describe why you are a great fit for this role..."
                />
              </label>

              {error ? <p className="text-[13px] font-medium text-red-600">{error}</p> : null}

              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-primary/15 bg-white px-5 py-2.5 text-[13px] font-semibold text-primary/70 hover:bg-primary/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="gradient-border-cta rounded-full px-6 py-2.5 text-[14px] font-semibold disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<JobRole | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchJobs()
      .then((data) => {
        if (active) setJobs(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleApplyClick = (job: JobRole) => {
    if (job.linkedinUrl && job.linkedinUrl.trim()) {
      window.open(job.linkedinUrl.trim(), "_blank", "noopener,noreferrer");
    } else {
      setApplyJob(job);
    }
  };

  const departments = useMemo(() => {
    const depts = new Set<string>();
    jobs.forEach((j) => {
      if (j.department) depts.add(j.department);
    });
    return ["All", ...Array.from(depts)];
  }, [jobs]);

  const activeJobs = useMemo(() => {
    return jobs.filter((j) => j.status === "active");
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return activeJobs.filter((job) => {
      const matchDept = selectedDept === "All" || job.department === selectedDept;
      const matchSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDept && matchSearch;
    });
  }, [activeJobs, selectedDept, searchQuery]);

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <SectionLabel>Join Our Global Team</SectionLabel>
              <h1 className="mt-3 text-[clamp(2.2rem,4vw,3.75rem)] font-bold tracking-tight text-primary leading-[1.1]">
                Build the Future of <br className="hidden sm:inline" />
                <span className="text-secondary">Industrial Sourcing & Engineering</span>
              </h1>
              <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-primary/70">
                At Orbigreen Techsource, we combine deep technical manufacturing expertise with global supply chain
                orchestration. Explore open engineering, quality, operations, and commercial opportunities across our
                worldwide network.
              </p>
            </div>

            {/* Value Highlights */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-card-light rounded-2xl p-5 border border-primary/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-[20px] text-secondary font-bold">
                  🌐
                </div>
                <h3 className="mt-3 text-[16px] font-semibold text-primary">Global Footprint</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-primary/65">
                  Collaborate across manufacturing hubs in Asia, Europe, and North America.
                </p>
              </div>

              <div className="glass-card-light rounded-2xl p-5 border border-primary/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-[20px] text-secondary font-bold">
                  ⚙️
                </div>
                <h3 className="mt-3 text-[16px] font-semibold text-primary">Engineering First</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-primary/65">
                  Work on high-precision castings, CNC machining, and heavy engineering projects.
                </p>
              </div>

              <div className="glass-card-light rounded-2xl p-5 border border-primary/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-[20px] text-secondary font-bold">
                  📈
                </div>
                <h3 className="mt-3 text-[16px] font-semibold text-primary">Rapid Growth</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-primary/65">
                  Accelerate your career trajectory with cross-functional exposure and mentorship.
                </p>
              </div>

              <div className="glass-card-light rounded-2xl p-5 border border-primary/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-[20px] text-secondary font-bold">
                  🌱
                </div>
                <h3 className="mt-3 text-[16px] font-semibold text-primary">Sustainable Vision</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-primary/65">
                  Promoting green supply chains, waste reduction, and smart manufacturing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section id="openings" className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10">
          <div className="flex flex-col gap-6 border-t border-primary/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionLabel>Career Opportunities</SectionLabel>
              <h2 className="mt-1 text-[24px] sm:text-[28px] font-bold text-primary">Open Positions</h2>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search position or location..."
                className="rounded-full border border-primary/15 bg-white/90 px-4 py-2 text-[13px] text-primary outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)] min-w-[200px]"
              />

              <div className="flex flex-wrap gap-1.5">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                      selectedDept === dept
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white/80 text-primary/70 hover:bg-white hover:text-primary border border-primary/10"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Listings List */}
          <div className="mt-8 space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-primary/10 bg-white p-8 text-center text-primary/60">
                Loading available positions...
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="rounded-2xl border border-primary/10 bg-white p-10 text-center">
                <p className="text-[16px] font-medium text-primary">No open positions matching your filters.</p>
                <p className="mt-1 text-[13px] text-primary/55">
                  Try adjusting your search criteria or department filter.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                const isExternal = Boolean(job.linkedinUrl && job.linkedinUrl.trim());
                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[18px] sm:text-[20px] font-bold text-primary hover:text-secondary transition-colors">
                            {job.title}
                          </h3>
                          <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-bold text-secondary uppercase tracking-wider">
                            {job.type}
                          </span>
                          {isExternal && (
                            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                              LinkedIn ↗
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-[13px] text-primary/65">
                          <span className="flex items-center gap-1">📍 {job.location}</span>
                          <span className="flex items-center gap-1">🏷️ {job.department}</span>
                          {job.experience ? (
                            <span className="flex items-center gap-1">💼 {job.experience}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick(job);
                          }}
                          className="gradient-border-cta rounded-full px-5 py-2 text-[13px] font-semibold flex items-center gap-1"
                        >
                          {isExternal ? "Apply on LinkedIn ↗" : "Apply Now"}
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-primary/5 px-3 py-2 text-[12px] font-semibold text-primary/70 hover:bg-primary/10"
                        >
                          {isExpanded ? "Less Details ▲" : "View Details ▼"}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-primary/10 bg-section/40 p-6 lg:p-8 space-y-6 text-[14px] leading-relaxed text-primary/80"
                        >
                          <div>
                            <h4 className="font-semibold text-primary text-[15px]">Role Overview</h4>
                            <p className="mt-1.5 text-primary/75">{job.description}</p>
                          </div>

                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-primary text-[15px]">Key Responsibilities</h4>
                              <ul className="mt-2 list-disc list-inside space-y-1.5 text-primary/75">
                                {job.responsibilities.map((resp, idx) => (
                                  <li key={idx}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.requirements && job.requirements.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-primary text-[15px]">Qualifications & Skills</h4>
                              <ul className="mt-2 list-disc list-inside space-y-1.5 text-primary/75">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.benefits && job.benefits.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-primary text-[15px]">What We Offer</h4>
                              <ul className="mt-2 list-disc list-inside space-y-1.5 text-primary/75">
                                {job.benefits.map((ben, idx) => (
                                  <li key={idx}>{ben}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleApplyClick(job)}
                              className="gradient-border-cta rounded-full px-6 py-2.5 text-[14px] font-semibold flex items-center gap-1.5"
                            >
                              {isExternal ? "Apply on LinkedIn ↗" : "Apply for this Position"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>{applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}</AnimatePresence>

      <Footer />
    </div>
  );
}
