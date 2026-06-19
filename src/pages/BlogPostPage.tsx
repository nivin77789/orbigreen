import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useBlogs } from "@/context/BlogContext";

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { publishedPosts, loading } = useBlogs();
  const post = publishedPosts.find((item) => item.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-section text-primary">
        <Nav />
        <main className="flex min-h-[60vh] items-center justify-center pt-28">
          <p className="text-[15px] lg:text-[16px] text-primary/55">Loading article…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-section text-primary">
        <Nav />
        <main className="mx-auto max-w-[1280px] px-6 pt-32 pb-20 text-center lg:px-10">
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-primary">Article not found</h1>
          <p className="mt-3 text-[15px] lg:text-[16px] text-primary/65">
            This post may have been removed or is not published yet.
          </p>
          <Link
            to="/blog"
            className="gradient-border-cta mt-8 inline-flex rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold"
          >
            Back to Media
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <article>
          <header className="relative overflow-hidden border-b border-primary/10 bg-white">
            {post.coverImage ? (
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <img src={post.coverImage} alt="" className="h-full w-full object-cover object-center opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/92 to-white" />
              </div>
            ) : null}

            <div className="relative mx-auto max-w-[860px] px-6 pb-12 pt-8 lg:px-10 lg:pb-14">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-semibold text-primary/60 transition-colors hover:text-primary"
              >
                ← Back to Media
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <SectionLabel>{post.category}</SectionLabel>
                <h1 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-primary">
                  {post.title}
                </h1>
                <p className="mt-4 text-[15px] lg:text-[16px] leading-relaxed text-primary/68">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] lg:text-[14px] text-primary/55">
                  <span>{post.author}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(post.publishedAt ?? post.updatedAt)}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/10 bg-section px-3 py-1 text-[11px] lg:text-[12px] font-semibold text-primary/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </header>

          <div className="mx-auto max-w-[860px] px-6 py-12 lg:px-10 lg:py-16">
            <div className="space-y-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[16px] lg:text-[17px] leading-[1.8] text-primary/78">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-primary/10 bg-white p-6 sm:p-8">
              <h2 className="text-[18px] lg:text-[20px] font-semibold text-primary">Discuss your sourcing program</h2>
              <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed text-primary/65">
                Talk to our team about supplier qualification, quality planning, or global sourcing support.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/quotation"
                  className="gradient-border-cta rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold"
                >
                  Request Quotation
                </Link>
                <Link
                  to="/contact"
                  className="glass-card-light rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold text-primary hover:glass-card-hover"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
