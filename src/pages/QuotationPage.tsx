import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { QuotationForm } from "@/components/QuotationForm";
import { EMAIL, OFFICE_ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export default function QuotationPage() {
  return (
    <div className="min-h-screen bg-white text-primary">
      <Nav />

      <main className="pt-28">
        <section className="relative mx-auto max-w-[1280px] px-6 pb-12 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
              Get a Quote
            </span>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Request a{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Quotation
              </span>
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-primary/70">
              Submit your sourcing requirement with drawings or specifications attached. Our team will review
              and respond with supplier options, lead times, and commercial terms.
            </p>
          </motion.div>
        </section>

        <section className="border-t border-primary/10 bg-section pb-20 pt-12">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-10">
            <div>
              <h2 className="text-[clamp(1.35rem,2vw,1.75rem)] font-semibold text-primary">
                What to include
              </h2>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-primary/70">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  Part drawings, 3D models, or reference images
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  Material grade, tolerances, and quality standards
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  Annual volume or batch quantity
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  Delivery location and target timeline
                </li>
              </ul>

              <dl className="mt-10 space-y-5 rounded-2xl border border-primary/10 bg-white p-6">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${PHONE_TEL}`} className="text-[16px] font-medium text-primary hover:text-secondary">
                      {PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${EMAIL}`} className="text-[16px] font-medium text-primary hover:text-secondary">
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50">Office</dt>
                  <dd className="mt-1 text-[14px] leading-relaxed text-primary/70">{OFFICE_ADDRESS}</dd>
                </div>
              </dl>
            </div>

            <QuotationForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
