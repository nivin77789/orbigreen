import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import {
  fetchLinkedInPostById,
  getLinkedInDirectUrl,
  parseLinkedInEmbedSrc,
  parseLinkedInEmbedHeight,
} from "@/lib/linkedinService";
import type { LinkedInPost } from "@/types/linkedin";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MediaPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<LinkedInPost | null>(null);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(post?.title ?? "Media Post", post?.summary);

  useEffect(() => {
    let active = true;
    if (id) {
      fetchLinkedInPostById(id)
        .then((data) => {
          if (active) setPost(data);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-section text-primary">
        <Nav />
        <main className="flex min-h-[60vh] items-center justify-center pt-28">
          <p className="text-[15px] lg:text-[16px] text-primary/55">Loading post…</p>
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
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-primary">Post not found</h1>
          <p className="mt-3 text-[15px] lg:text-[16px] text-primary/65">
            This media post may have been removed or is unavailable.
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

  const directUrl = getLinkedInDirectUrl(post.embedCode);
  const embedSrc = parseLinkedInEmbedSrc(post.embedCode);
  const embedHeight = parseLinkedInEmbedHeight(post.embedCode);
  const iframeHeight = Math.max(embedHeight, 720);

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-28 pb-16">
        <article className="mx-auto max-w-[960px] px-6 lg:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary/60 transition-colors hover:text-primary mb-6"
          >
            ← Back to Media & Social Updates
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel>LinkedIn Post</SectionLabel>
            <h1 className="mt-3 text-balance text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-primary">
              {post.title}
            </h1>
            {post.summary ? (
              <p className="mt-4 text-[16px] lg:text-[18px] leading-relaxed text-primary/75">
                {post.summary}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border-cta inline-flex items-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
              >
                <span>View in LinkedIn</span>
                <span className="text-[16px]">↗</span>
              </a>
            </div>
          </motion.header>

          {/* Full Size Post Image */}
          {post.imageUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              className="mt-8 overflow-hidden rounded-3xl border border-primary/10 bg-white p-3 sm:p-4 shadow-lg"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </motion.div>
          ) : null}

          {/* Full LinkedIn Embed Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="mt-12"
          >
            <h2 className="mb-4 text-[18px] lg:text-[20px] font-bold text-primary">
              Original LinkedIn Post Embed
            </h2>
            <div className="relative overflow-hidden rounded-3xl bg-white border border-primary/10 shadow-md">
              <iframe
                src={embedSrc}
                title={post.title}
                className="w-full border-0"
                style={{ height: `${iframeHeight}px` }}
                allowFullScreen
              />
            </div>
          </motion.section>

          <div className="mt-12 flex justify-center">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-border-cta inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold"
            >
              <span>View in LinkedIn</span>
              <span>↗</span>
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
