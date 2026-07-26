import { useEffect, useState, type FormEvent } from "react";
import { collection, getDocs, orderBy, query, type DocumentData } from "firebase/firestore";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/firebase";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const SESSION_KEY = "orbigreen_admin_session";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-primary/10 bg-white/90 px-3.5 py-2.5 text-[14px] text-primary outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)]";

const labelClass = "section-label text-primary/50";

type Submission = { id: string } & DocumentData;

function formatDate(value: unknown): string {
  const ts = value as { toDate?: () => Date } | undefined;
  if (ts?.toDate) {
    return ts.toDate().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
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
        Submissions dashboard
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-primary/65">
        Sign in to view contact messages and quotation requests.
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
                            className="truncate text-secondary underline hover:text-secondary/80"
                          >
                            {file.name}
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

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [tab, setTab] = useState<"contacts" | "quotations">("contacts");
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [quotations, setQuotations] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

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

  useEffect(() => {
    if (!isAdmin) return;

    let cancelled = false;
    setLoading(true);
    setLoadError("");

    Promise.all([
      getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc"))),
      getDocs(query(collection(db, "quotations"), orderBy("createdAt", "desc"))),
    ])
      .then(([contactsSnap, quotationsSnap]) => {
        if (cancelled) return;
        setContacts(contactsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setQuotations(quotationsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
                <SectionLabel>Admin</SectionLabel>
                <h1 className="mt-3 text-[clamp(1.9rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
                  Form submissions
                </h1>
                <p className="mt-2 text-[14px] text-primary/65">
                  Contact messages and quotation requests submitted through the website.
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

            <div className="mt-8 flex gap-2">
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
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-primary/10 bg-white">
              {loading ? (
                <p className="px-5 py-8 text-[14px] text-primary/55">Loading…</p>
              ) : loadError ? (
                <p className="px-5 py-8 text-[14px] text-red-600">{loadError}</p>
              ) : tab === "contacts" ? (
                <SubmissionsTable rows={contacts} columns={["name", "email", "message"]} />
              ) : (
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
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
