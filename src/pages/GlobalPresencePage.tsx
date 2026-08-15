import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { QuotationForm } from "@/components/QuotationForm";
import { GlobalNetworkSection } from "@/components/GlobalNetworkSection";
import { SectionLabel } from "@/components/SectionLabel";

const EASE = [0.16, 1, 0.3, 1] as const;

type FormMode = "contact" | "quotation";

function GetInTouchHero() {
  const [formMode, setFormMode] = useState<FormMode>("contact");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-8 pt-[5.25rem] sm:px-6 lg:px-10 lg:pb-12 lg:pt-[5.75rem]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="max-w-xl lg:pt-2"
          >
            <SectionLabel>Get in Touch</SectionLabel>
            <h1 className="mt-3 text-balance text-[clamp(1.85rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-tight text-primary">
              Our global presence{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                & network
              </span>
            </h1>
            <div className="global-presence-heading-line mt-5" />

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setFormMode("contact")}
                aria-pressed={formMode === "contact"}
                className={`w-full rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold transition-all sm:w-auto ${
                  formMode === "contact"
                    ? "gradient-border-cta shadow-[0_0_28px_-4px_rgba(92,191,42,0.4)]"
                    : "glass-card-light text-primary hover:glass-card-hover"
                }`}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => setFormMode("quotation")}
                aria-pressed={formMode === "quotation"}
                className={`w-full rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold transition-all sm:w-auto ${
                  formMode === "quotation"
                    ? "gradient-border-cta shadow-[0_0_28px_-4px_rgba(92,191,42,0.4)]"
                    : "glass-card-light text-primary hover:glass-card-hover"
                }`}
              >
                Request Quotation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <AnimatePresence mode="wait">
              {formMode === "contact" ? (
                <ContactForm key="contact" compact />
              ) : (
                <QuotationForm key="quotation" compact />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function GlobalPresencePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-primary">
      <Nav />

      <main>
        <GetInTouchHero />

        <GlobalNetworkSection />

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-primary/10 py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-white to-secondary/[0.06]" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative z-10 mx-auto max-w-[1280px] px-6 text-center lg:px-10"
          >
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
              Expand your supply base{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                with confidence
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] lg:text-[17px] leading-relaxed text-primary/65">
              Tell us your target regions and product categories — we’ll map the right supplier network and provide
              customized, tailor-made service solutions aligned with your program requirements.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/quotation"
                className="gradient-border-cta rounded-full px-7 py-3.5 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
              >
                Request Quotation
              </Link>
              <Link
                to="/contact"
                className="glass-card-light rounded-full px-7 py-3.5 text-[14px] lg:text-[15px] font-semibold text-primary hover:glass-card-hover"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
