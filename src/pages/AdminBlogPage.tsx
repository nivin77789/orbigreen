import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useBlogs } from "@/context/BlogContext";
import type { BlogPost, BlogPostInput } from "@/types/blog";
import { slugify } from "@/lib/blogStore";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMPTY_FORM: BlogPostInput = {
  title: "",
  excerpt: "",
  content: "",
  author: "Orbigreen Editorial",
  category: "Sourcing Insights",
  coverImage: "",
  tags: [],
  published: true,
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-primary/10 bg-white/90 px-3.5 py-2.5 text-[14px] lg:text-[15px] text-primary outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)]";

const labelClass = "section-label text-primary/50";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function postToForm(post: BlogPost): BlogPostInput {
  return {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    category: post.category,
    coverImage: post.coverImage ?? "",
    tags: post.tags,
    published: post.published,
    slug: post.slug,
    publishedAt: post.publishedAt,
  };
}

function AdminLogin({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ok = onLogin(password);
    if (!ok) {
      setError("Incorrect password. Try again.");
      return;
    }
    setError("");
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-20">
      <SectionLabel>Admin</SectionLabel>
      <h1 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-primary">
        Blog management
      </h1>
      <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-primary/65">
        Sign in to create, edit, publish, and delete blog articles.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-primary/10 bg-white p-6">
        <label className="block">
          <span className={labelClass}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="mt-3 text-[13px] lg:text-[14px] font-medium text-red-600">{error}</p> : null}
        <button
          type="submit"
          className="gradient-border-cta mt-5 w-full rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-[12px] lg:text-[13px] text-primary/45">
        Default password: <code className="rounded bg-section px-1.5 py-0.5">orbigreen2026</code>
      </p>
    </div>
  );
}

function BlogEditor({
  initial,
  editingId,
  onSave,
  onCancel,
}: {
  initial: BlogPostInput;
  editingId?: string;
  onSave: (input: BlogPostInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BlogPostInput>(initial);
  const [tagsInput, setTagsInput] = useState(initial.tags.join(", "));
  const [saving, setSaving] = useState(false);

  const previewSlug = useMemo(
    () => slugify(form.slug?.trim() || form.title || "new-post"),
    [form.slug, form.title],
  );

  const update = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    await onSave({
      ...form,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    setSaving(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary/10 bg-white p-6 sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[20px] lg:text-[22px] font-semibold text-primary">
            {editingId ? "Edit article" : "New article"}
          </h2>
          <p className="mt-1 text-[13px] lg:text-[14px] text-primary/55">Slug preview: /blog/{previewSlug}</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="glass-card-light rounded-full px-4 py-2 text-[13px] lg:text-[14px] font-semibold text-primary hover:glass-card-hover"
        >
          Cancel
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block lg:col-span-2">
          <span className={labelClass}>Title</span>
          <input
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Custom slug (optional)</span>
          <input
            value={form.slug ?? ""}
            onChange={(event) => update("slug", event.target.value)}
            className={fieldClass}
            placeholder="auto-generated-from-title"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Category</span>
          <input
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Author</span>
          <input
            value={form.author}
            onChange={(event) => update("author", event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Cover image URL</span>
          <input
            value={form.coverImage ?? ""}
            onChange={(event) => update("coverImage", event.target.value)}
            className={fieldClass}
            placeholder="/blog-covers/example.webp"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className={labelClass}>Excerpt</span>
          <textarea
            value={form.excerpt}
            onChange={(event) => update("excerpt", event.target.value)}
            className={`${fieldClass} min-h-[88px] resize-y`}
            required
          />
        </label>

        <label className="block lg:col-span-2">
          <span className={labelClass}>Content</span>
          <textarea
            value={form.content}
            onChange={(event) => update("content", event.target.value)}
            className={`${fieldClass} min-h-[220px] resize-y leading-relaxed`}
            placeholder="Separate paragraphs with a blank line."
            required
          />
        </label>

        <label className="block lg:col-span-2">
          <span className={labelClass}>Tags (comma separated)</span>
          <input
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            className={fieldClass}
            placeholder="Sourcing, Quality, OEM"
          />
        </label>

        <label className="flex items-center gap-3 lg:col-span-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => update("published", event.target.checked)}
            className="h-4 w-4 rounded border-primary/20 text-secondary focus:ring-secondary"
          />
          <span className="text-[14px] lg:text-[15px] font-semibold text-primary">Published</span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="gradient-border-cta rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold disabled:opacity-60"
        >
          {saving ? "Saving…" : editingId ? "Update article" : "Publish article"}
        </button>
      </div>
    </motion.form>
  );
}

export default function AdminBlogPage() {
  const { posts, loading, isAdmin, login, logout, addPost, editPost, removePost, resetToSeed } = useBlogs();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const editingPost = editingId ? posts.find((post) => post.id === editingId) : undefined;

  const startCreate = () => {
    setEditingId(null);
    setShowEditor(true);
  };

  const startEdit = (id: string) => {
    setEditingId(id);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setEditingId(null);
    setShowEditor(false);
  };

  const handleSave = async (input: BlogPostInput) => {
    if (editingId) {
      await editPost(editingId, input);
    } else {
      await addPost(input);
    }
    closeEditor();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;
    await removePost(id);
    if (editingId === id) closeEditor();
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
                <SectionLabel>Admin</SectionLabel>
                <h1 className="mt-3 text-[clamp(1.9rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
                  Manage blog articles
                </h1>
                <p className="mt-2 text-[14px] lg:text-[15px] text-primary/65">
                  Changes are saved in this browser via local storage.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/blog"
                  className="glass-card-light rounded-full px-4 py-2.5 text-[13px] lg:text-[14px] font-semibold text-primary hover:glass-card-hover"
                >
                  View blog
                </Link>
                <button
                  type="button"
                  onClick={() => void resetToSeed()}
                  className="glass-card-light rounded-full px-4 py-2.5 text-[13px] lg:text-[14px] font-semibold text-primary hover:glass-card-hover"
                >
                  Reset to defaults
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-primary/10 bg-white px-4 py-2.5 text-[13px] lg:text-[14px] font-semibold text-primary/70"
                >
                  Sign out
                </button>
              </div>
            </div>

            {!showEditor ? (
              <button
                type="button"
                onClick={startCreate}
                className="gradient-border-cta mt-8 rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold"
              >
                + New article
              </button>
            ) : null}

            {showEditor ? (
              <div className="mt-8">
                <BlogEditor
                  initial={editingPost ? postToForm(editingPost) : EMPTY_FORM}
                  editingId={editingId ?? undefined}
                  onSave={handleSave}
                  onCancel={closeEditor}
                />
              </div>
            ) : null}

            <div className="mt-10 overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <div className="border-b border-primary/10 px-5 py-4">
                <h2 className="text-[16px] lg:text-[17px] font-semibold text-primary">All articles ({posts.length})</h2>
              </div>

              {loading ? (
                <p className="px-5 py-8 text-[14px] lg:text-[15px] text-primary/55">Loading…</p>
              ) : posts.length === 0 ? (
                <p className="px-5 py-8 text-[14px] lg:text-[15px] text-primary/55">No articles yet.</p>
              ) : (
                <div className="divide-y divide-primary/8">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[15px] lg:text-[16px] font-semibold text-primary">{post.title}</h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.14em] ${
                              post.published
                                ? "bg-secondary/15 text-secondary"
                                : "bg-primary/8 text-primary/55"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] lg:text-[14px] text-primary/55">
                          /blog/{post.slug} · Updated {formatDate(post.updatedAt)}
                        </p>
                        <p className="mt-2 line-clamp-2 text-[13px] lg:text-[14px] text-primary/65">{post.excerpt}</p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        {post.published ? (
                          <Link
                            to={`/blog/${post.slug}`}
                            className="rounded-full border border-primary/10 px-3.5 py-2 text-[12px] lg:text-[13px] font-semibold text-primary/70"
                          >
                            View
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => startEdit(post.id)}
                          className="rounded-full border border-primary/10 px-3.5 py-2 text-[12px] lg:text-[13px] font-semibold text-primary"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(post.id)}
                          className="rounded-full border border-red-200 px-3.5 py-2 text-[12px] lg:text-[13px] font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
