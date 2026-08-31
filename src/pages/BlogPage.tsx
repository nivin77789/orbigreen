import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { SectionLabel } from "@/components/SectionLabel";
import { useBlogs } from "@/context/BlogContext";
import { fetchLinkedInPosts, parseLinkedInEmbedSrc } from "@/lib/linkedinService";
import type { LinkedInPost } from "@/types/linkedin";
import { getProductBySlug } from "@/data/productsData";
import globalSourcingImage from "@/services image/global-sourcing.webp";
import qualityInspectionImage from "@/services image/quality-inspection.webp";
import logisticsImage from "@/services image/transport-logistics.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

const MEDIA_GALLERY = [
  {
    title: "Precision Machining",
    label: "Components",
    image: getProductBySlug("machining")!.image,
  },
  {
    title: "Fabrication Programs",
    label: "Manufacturing",
    image: getProductBySlug("fabrication")!.image,
  },
  {
    title: "Global Sourcing",
    label: "Supplier Network",
    image: globalSourcingImage,
  },
  {
    title: "Quality Inspection",
    label: "Assurance",
    image: qualityInspectionImage,
  },
  {
    title: "Delivery Coordination",
    label: "Logistics",
    image: logisticsImage,
  },
];

export default function BlogPage() {
  const { publishedPosts, loading } = useBlogs();
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
                Media & Insights
              </h1>
            </div>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="media-gallery-section border-t border-primary/10 bg-white py-8 lg:py-10">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="section-heading text-balance text-primary">Gallery</h2>
            </motion.div>

            <div className="media-gallery-grid grid gap-4">
              {MEDIA_GALLERY.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
                  className="media-gallery-card group relative min-h-[180px] overflow-hidden rounded-[1.35rem] sm:min-h-[200px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6">
                    <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
                      {item.label}
                    </span>
                    <h3 className="mt-3 text-[20px] lg:text-[22px] font-semibold leading-tight tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* LinkedIn Updates Section */}
            {(!liLoading && linkedInPosts.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="mt-14 border-t border-primary/10 pt-10 lg:mt-16 lg:pt-12"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <SectionLabel>Social Feed</SectionLabel>
                    <h2 className="mt-1 text-balance text-[clamp(1.8rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                      LinkedIn Highlights
                    </h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  {linkedInPosts.map((post) => (
                    <div
                      key={post.id}
                      className="overflow-hidden rounded-3xl border border-primary/10 bg-section/40 p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <h3 className="mb-4 text-[16px] font-bold text-primary">{post.title}</h3>
                      <div className="overflow-hidden rounded-2xl bg-white border border-primary/10 shadow-inner">
                        <iframe
                          src={parseLinkedInEmbedSrc(post.embedCode)}
                          title={post.title}
                          className="w-full h-[520px] border-0"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Blogs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mt-14 border-t border-primary/10 pt-10 lg:mt-16 lg:pt-12"
            >
              <h2 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                Blogs & Articles
              </h2>

              <div className="mt-8 lg:mt-10">
                {loading ? (
                  <p className="text-center text-[15px] lg:text-[16px] text-primary/55">Loading articles…</p>
                ) : publishedPosts.length === 0 ? (
                  <div className="rounded-3xl border border-primary/10 bg-section px-6 py-14 text-center">
                    <p className="text-[16px] lg:text-[17px] font-semibold text-primary">No articles published yet.</p>
                    <p className="mt-2 text-[14px] lg:text-[15px] text-primary/60">Check back soon for new insights.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {publishedPosts.map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
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
