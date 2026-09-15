import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { WordPressBlogCard } from "@/components/WordPressBlogCard";
import { BlogCard } from "@/components/BlogCard";
import { LinkedInPostCard } from "@/components/LinkedInPostCard";
import { useBlogs } from "@/context/BlogContext";
import { fetchLinkedInPosts } from "@/lib/linkedinService";
import type { LinkedInPost } from "@/types/linkedin";
import type { WordPressPost } from "@/types/wordpress";
import type { BlogPost } from "@/types/blog";

const EASE = [0.16, 1, 0.3, 1] as const;

type CombinedItem =
  | { itemType: "wp"; id: string; date: number; post: WordPressPost }
  | { itemType: "internal"; id: string; date: number; post: BlogPost }
  | { itemType: "linkedin"; id: string; date: number; post: LinkedInPost };

export default function BlogPage() {
  const { wpPosts, wpLoading, publishedPosts } = useBlogs();
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPost[]>([]);
  const [liLoading, setLiLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

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

  const combinedItems = useMemo(() => {
    const blogList: CombinedItem[] =
      wpPosts.length > 0
        ? wpPosts.map((post) => ({
            itemType: "wp" as const,
            id: `wp-${post.id}`,
            date: post.date ? new Date(post.date).getTime() : 0,
            post,
          }))
        : publishedPosts.map((post) => ({
            itemType: "internal" as const,
            id: `internal-${post.id}`,
            date: new Date(post.publishedAt || post.createdAt).getTime() || 0,
            post,
          }));

    const liList: CombinedItem[] = linkedInPosts.map((post) => ({
      itemType: "linkedin" as const,
      id: `li-${post.id}`,
      date: post.createdAt ? new Date(post.createdAt).getTime() : 0,
      post,
    }));

    return [...blogList, ...liList].sort((a, b) => b.date - a.date);
  }, [wpPosts, publishedPosts, linkedInPosts]);

  const visibleItems = useMemo(
    () => combinedItems.slice(0, visibleCount),
    [combinedItems, visibleCount],
  );

  const isLoading = wpLoading || liLoading;

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-[5.25rem] lg:pt-[5.5rem]">
        {/* Banner Section */}
        <section className="border-b border-primary/10 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-3 px-6 py-5 lg:px-10 lg:py-6"
          >
            <div>
              <SectionLabel>Orbigreen Media & Insights</SectionLabel>
              <h1 className="mt-1 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-primary">
                Blogs & Articles
              </h1>
            </div>
          </motion.div>
        </section>

        {/* Combined Posts Section */}
        <section className="border-b border-primary/10 bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            {isLoading ? (
              <div className="py-12 text-center">
                <p className="text-[15px] lg:text-[16px] text-primary/55">
                  Loading latest articles and updates…
                </p>
              </div>
            ) : combinedItems.length > 0 ? (
              <>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                  {visibleItems.map((item, idx) => {
                    return (
                      <div key={item.id} className="break-inside-avoid mb-8 inline-block w-full">
                        {item.itemType === "wp" && (
                          <WordPressBlogCard post={item.post} index={idx} />
                        )}
                        {item.itemType === "internal" && (
                          <BlogCard post={item.post} index={idx} />
                        )}
                        {item.itemType === "linkedin" && (
                          <LinkedInPostCard post={item.post} index={idx} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {visibleCount < combinedItems.length && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 3)}
                      className="gradient-border-cta inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Show More</span>
                      <span className="text-[16px]">↓</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-primary/10 bg-section px-6 py-12 text-center">
                <p className="text-[16px] font-semibold text-primary">
                  No articles or updates published yet.
                </p>
                <p className="mt-1 text-[14px] text-primary/60">
                  Check back soon for latest industry insights.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-primary/10 py-14">
          <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
            <p className="text-[15px] lg:text-[16px] text-primary/65">
              Need sourcing support for your program?{" "}
              <Link
                to="/quotation"
                className="font-semibold text-primary transition-colors hover:text-secondary"
              >
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
