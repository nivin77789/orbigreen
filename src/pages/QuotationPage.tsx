import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { QuotationForm } from "@/components/QuotationForm";
import { EMAIL, OFFICE_ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHECKLIST = [
  {
    title: "Drawings & models",
    detail: "Part drawings, 3D models, or reference images",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Material & standards",
    detail: "Material grade, tolerances, and quality standards",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <path
          d="M12 3 2 7.5 12 12l10-4.5L12 3z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M2 12l10 4.5L22 12M2 16.5 12 21l10-4.5" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Volume",
    detail: "Annual volume or batch quantity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M7 14l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Delivery",
    detail: "Delivery location and target timeline",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function QuotationBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="quotation-page-grid absolute inset-0" />
      <div className="absolute -left-[8%] top-[6%] h-[42vh] w-[38vw] rounded-full bg-primary/[0.06] blur-[90px]" />
      <div className="absolute -right-[6%] bottom-[8%] h-[38vh] w-[34vw] rounded-full bg-secondary/[0.08] blur-[80px]" />
      <div className="absolute left-1/2 top-1/3 h-[36vh] w-[40vw] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_25%,white_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent" />
    </div>
  );
}

export default function QuotationPage() {
  return (
    <div className="min-h-dvh bg-white text-primary">
      <Nav />

      <main className="relative pt-[5.5rem] lg:pt-[5.75rem]">
        <section className="quotation-viewport relative overflow-hidden">
          <QuotationBackground />

          <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] max-w-[1320px] flex-col gap-8 px-5 py-6 sm:px-6 lg:min-h-[calc(100dvh-5.75rem)] lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:py-8 xl:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex w-full shrink-0 flex-col lg:max-w-[26rem] xl:max-w-[28rem]"
            >
              <SectionLabel>Get a Quote</SectionLabel>
              <h1 className="mt-2 text-balance text-[clamp(1.85rem,4vw,2.65rem)] font-semibold leading-[1.06] tracking-tight text-primary xl:text-[2.75rem]">
                Request a{" "}
                <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                  Quotation
                </span>
              </h1>
              <p className="mt-3 max-w-md text-[14px] lg:text-[15px] leading-relaxed text-primary/68 sm:text-[15px] lg:text-[16px]">
                Submit your sourcing requirement with drawings or specifications attached. Our team will review
                and respond with supplier options, lead times, and commercial terms.
              </p>
              <div className="industries-heading-line mt-4" />

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:mt-6">
                {CHECKLIST.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease: EASE }}
                    className="quotation-check-card group flex gap-3 rounded-2xl p-3.5 sm:p-4"
                  >
                    <div className="quotation-check-card__icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] lg:text-[13px] font-semibold tracking-tight text-primary sm:text-[13px] lg:text-[14px]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] lg:text-[12px] leading-snug text-primary/58 sm:text-[12px] lg:text-[13px]">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:mt-6">
                <a href={`tel:${PHONE_TEL}`} className="quotation-contact-chip group">
                  <span className="quotation-contact-chip__label">Phone</span>
                  <span className="quotation-contact-chip__value">{PHONE_DISPLAY}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="quotation-contact-chip group">
                  <span className="quotation-contact-chip__label">Email</span>
                  <span className="quotation-contact-chip__value truncate">{EMAIL}</span>
                </a>
                <div className="quotation-contact-chip quotation-contact-chip--static sm:col-span-2">
                  <span className="quotation-contact-chip__label">Office</span>
                  <span className="quotation-contact-chip__value text-[12px] lg:text-[13px] leading-snug">{OFFICE_ADDRESS}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 lg:mt-5">
                {["24h review", "Supplier options", "Commercial terms"].map((badge) => (
                  <span key={badge} className="quotation-trust-badge">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
              className="w-full min-w-0 flex-1 lg:max-h-[calc(100dvh-7rem)]"
            >
              <QuotationForm />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
