import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { fetchLinkedInPosts } from "@/lib/linkedinService";
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
                  return (
                    <div
                      key={post.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-primary/10 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-primary/25 hover:shadow-md"
                    >
                      <div>
                        {post.imageUrl ? (
                          <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-2xl border border-primary/10 bg-slate-50/70 p-2 sm:p-3">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-auto max-h-[520px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                            />
                          </div>
                        ) : null}

                        <h3 className="text-[19px] lg:text-[21px] font-bold leading-snug tracking-tight text-primary">
                          {post.title}
                        </h3>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-primary/8 pt-4">
                        <Link
                          to={`/blog/post/${post.id}`}
                          className="gradient-border-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-transform group-hover:translate-x-1"
                        >
                          <span>Read More</span>
                          <span className="text-[14px]">→</span>
                        </Link>
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
