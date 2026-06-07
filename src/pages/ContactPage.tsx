import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <section className="relative mx-auto max-w-[1280px] px-6 pb-12 lg:px-10">
          <div className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[90px]" />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Get in Touch</span>
            <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Request a{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Quote
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/70">
              Share your sourcing requirements and we'll respond with supplier options, timelines, and a clear
              path to procurement.
            </p>
          </motion.div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
