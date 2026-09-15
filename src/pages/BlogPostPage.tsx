import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useBlogs } from "@/context/BlogContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

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
  const { publishedPosts, wpPosts, loading, wpLoading } = useBlogs();

  const wpPost = wpPosts.find((item) => item.slug === slug);
  const localPost = publishedPosts.find((item) => item.slug === slug);

  const isWP = Boolean(wpPost);
  const title = wpPost?.title ?? localPost?.title ?? "Media";
  const excerpt = wpPost?.excerpt ?? localPost?.excerpt;
  const category = wpPost?.categories[0] ?? localPost?.category ?? "Article";
  const author = wpPost?.author ?? localPost?.author ?? "Orbigreen Editorial";
  const dateStr = wpPost?.date ?? localPost?.publishedAt ?? localPost?.updatedAt;
  const coverImage = wpPost?.featuredImage ?? localPost?.coverImage;
  const tags = wpPost?.tags ?? localPost?.tags ?? [];
  const link = wpPost?.link;

  useDocumentTitle(title, excerpt);

  if (loading || wpLoading) {
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

  if (!wpPost && !localPost) {
    return (
      <div className="min-h-screen bg-section text-primary">
        <Nav />
        <main className="mx-auto max-w-[1280px] px-6 pt-32 pb-20 text-center lg:px-10">
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-primary">Article not found</h1>
          <p className="mt-3 text-[15px] lg:text-[16px] text-primary/65">
            This post may have been removed or is not available.
          </p>
          <Link
            to="/blog"
            className="gradient-border-cta mt-8 inline-flex rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold"
          >
            Back to Media & Blogs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <article>
          <header className="relative overflow-hidden border-b border-primary/10 bg-white">
            {coverImage ? (
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <img src={coverImage} alt="" className="h-full w-full object-cover object-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/92 to-white" />
              </div>
            ) : null}

            <div className="relative mx-auto max-w-[860px] px-6 pb-12 pt-8 lg:px-10 lg:pb-14">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-semibold text-primary/60 transition-colors hover:text-primary"
              >
                ← Back to Media & Blogs
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <SectionLabel>{category}</SectionLabel>
                <h1 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-primary">
                  {title}
                </h1>
                {excerpt && (
                  <p className="mt-4 text-[15px] lg:text-[16px] leading-relaxed text-primary/68">{excerpt}</p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] lg:text-[14px] text-primary/55">
                  <span>{author}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(dateStr)}</span>
                </div>
                {tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/10 bg-section px-3 py-1 text-[11px] lg:text-[12px] font-semibold text-primary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </header>

          <div className="mx-auto max-w-[860px] px-6 py-12 lg:px-10 lg:py-16">
            {isWP && wpPost ? (
              <div
                className="prose prose-lg max-w-none space-y-6 text-[16px] lg:text-[17px] leading-[1.8] text-primary/80 [&_p]:mb-4 [&_h1]:text-2xl [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_a]:text-secondary [&_a]:underline [&_img]:rounded-2xl [&_img]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic"
                dangerouslySetInnerHTML={{ __html: wpPost.content }}
              />
            ) : localPost ? (
              <div className="space-y-5">
                {localPost.content.split(/\n\n+/).filter(Boolean).map((paragraph, index) => (
                  <p key={index} className="text-[16px] lg:text-[17px] leading-[1.8] text-primary/78">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {link && (
              <div className="mt-8 flex justify-end">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-secondary hover:underline"
                >
                  <span>View original post on WordPress</span>
                  <span>↗</span>
                </a>
              </div>
            )}

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
