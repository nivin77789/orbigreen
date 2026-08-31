import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { fetchLinkedInPosts, getLinkedInDirectUrl, parseLinkedInEmbedSrc } from "@/lib/linkedinService";
import type { LinkedInPost } from "@/types/linkedin";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BlogPage() {
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPost[]>([]);
  const [liLoading, setLiLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchLinkedInPosts()
      .then((data) => {
        if (active) setLinkedInPosts(data);
      })
      .finally(() => {
        if (active) setLiLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-[5.25rem] lg:pt-[5.5rem]">
        <section className="border-b border-primary/10 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-3 px-6 py-4 lg:px-10 lg:py-5"
          >
            <div>
              <h1 className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold uppercase tracking-[0.22em] text-secondary">
                Media & Social Updates
              </h1>
            </div>
          </motion.div>
        </section>

        {/* LinkedIn Feed Section */}
        <section className="border-t border-primary/10 bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <SectionLabel>Blogs & Media</SectionLabel>
              <h2 className="mt-1 text-balance text-[clamp(1.8rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                Blogs / Articles
              </h2>
            </motion.div>

            {liLoading ? (
              <p className="mt-8 text-center text-[15px] lg:text-[16px] text-primary/55">Loading posts…</p>
            ) : linkedInPosts.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-primary/10 bg-section px-6 py-14 text-center">
                <p className="text-[16px] lg:text-[17px] font-semibold text-primary">No LinkedIn posts embedded yet.</p>
                <p className="mt-2 text-[14px] lg:text-[15px] text-primary/60">
                  Check back soon for the latest news and industry insights.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {linkedInPosts.map((post) => {
                  const directUrl = getLinkedInDirectUrl(post.embedCode);
                  const embedSrc = parseLinkedInEmbedSrc(post.embedCode);

                  return (
                    <div
                      key={post.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-primary/10 bg-section/40 p-5 sm:p-6 shadow-sm transition-all hover:border-primary/25 hover:shadow-md"
                    >
                      <div>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <a
                            href={directUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[16px] font-bold text-primary transition-colors hover:text-secondary"
                          >
                            {post.title} ↗
                          </a>
                          <a
                            href={directUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[12px] font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                          >
                            <span>View on LinkedIn</span>
                            <span className="text-[13px]">↗</span>
                          </a>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-white border border-primary/10 shadow-inner">
                          <iframe
                            src={embedSrc}
                            title={post.title}
                            className="w-full h-[520px] border-0"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-primary/10 py-14">
          <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
            <p className="text-[15px] lg:text-[16px] text-primary/65">
              Need sourcing support for your program!{" "}
              <Link to="/quotation" className="font-semibold text-primary transition-colors hover:text-secondary">
                Request a quotation
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
