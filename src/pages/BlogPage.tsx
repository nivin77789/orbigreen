import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { useBlogs } from "@/context/BlogContext";
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
                Media
              </h1>
            </div>
          </motion.div>
        </section>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mt-12 border-t border-primary/10 pt-10 lg:mt-14 lg:pt-12"
            >
              <h2 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                Blogs
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
