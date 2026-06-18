import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { useBlogs } from "@/context/BlogContext";

export default function BlogPage() {
  const { publishedPosts, loading } = useBlogs();

  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <section className="mx-auto max-w-[1280px] px-6 pb-12 lg:px-10 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[13px] lg:text-[15px] font-bold uppercase tracking-[0.3em] text-secondary">
              Blog
            </span>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Insights for{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                industrial sourcing
              </span>
            </h1>
            <p className="mt-6 text-[16px] lg:text-[17px] leading-relaxed text-primary/70">
              Practical articles on global sourcing, supplier quality, engineering coordination, and
              sustainable procurement for OEM teams.
            </p>
          </motion.div>
        </section>

        <section className="border-t border-primary/10 bg-white py-14 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
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
        </section>

        <section className="border-t border-primary/10 py-14">
          <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
            <p className="text-[15px] lg:text-[16px] text-primary/65">
              Need sourcing support for your program?{" "}
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
