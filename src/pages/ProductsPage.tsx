import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductsShowcase } from "@/components/ProductsShowcase";

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative pt-28">
        <ProductsShowcase variant="page" />

        <section className="relative px-6 pb-28 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-light mx-auto max-w-[1280px] rounded-3xl px-6 py-16 text-center lg:px-10"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Get Started</span>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-primary">
              Need a custom sourcing program?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-primary/70">
              Share your drawings, quantities, and delivery targets — we'll qualify suppliers and build a
              procurement plan around your product requirements.
            </p>
            <Link
              to="/quotation"
              className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Discuss your requirement
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
