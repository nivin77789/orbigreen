import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-primary">
      <Nav />

      <main className="pt-28">
        <section className="relative mx-auto max-w-[1280px] px-6 pb-12 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">Get in Touch</span>
            <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Contact{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Orbigreen
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-primary/70">
              Reach our team for general enquiries, partnership discussions, or follow-up on an active sourcing
              program. For detailed quotes with attachments, use the quotation form.
            </p>
            <Link
              to="/quotation"
              className="gradient-border-cta mt-8 inline-flex rounded-full px-6 py-3 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Request Quotation with attachments →
            </Link>
          </motion.div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
