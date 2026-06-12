import { motion } from "framer-motion";
import { INDUSTRIES } from "@/data/industriesData";

const EASE = [0.16, 1, 0.3, 1] as const;

function IndustriesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="industries-section-grid absolute inset-0" />
      <div className="absolute -left-[12%] top-[8%] h-[45vh] w-[45vw] rounded-full bg-primary/[0.05] blur-[100px]" />
      <div className="absolute -right-[10%] bottom-[5%] h-[40vh] w-[40vw] rounded-full bg-secondary/[0.07] blur-[90px]" />
      <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_30%,var(--section-bg)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

export function IndustriesSection() {
  return (
    <section className="relative overflow-hidden border-t border-primary/10 bg-white py-18 sm:py-20 lg:py-24">
      <IndustriesBackground />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">Industries We Serve</span>
            <h2 className="mt-3 text-[clamp(1.85rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-primary">
              Single-window sourcing across{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                industrial sectors
              </span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-primary/65">
              From automotive and power to construction and mining — we deliver qualified suppliers, quality
              assurance, and logistics for diverse manufacturing programs.
            </p>
            <div className="industries-heading-line mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="industries-stat-pill shrink-0 self-start lg:self-auto"
          >
            <span className="block text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-tight text-primary">
              12
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
              Industrial Sectors
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {INDUSTRIES.map((industry, i) => (
            <motion.article
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.55, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
              className={`industry-card industry-card--${(i % 4) + 1} group relative overflow-hidden rounded-[1.35rem] p-4 sm:rounded-2xl sm:p-5`}
            >
              <div className="industry-card__sheen" aria-hidden />
              <div className="industry-card__glow" aria-hidden />
              <span className="industry-card__index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 flex flex-col items-center gap-3 text-center sm:gap-3.5">
                <div className="industry-card__icon-ring relative">
                  <div className="industry-card__icon flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
                    {industry.icon}
                  </div>
                </div>
                <h3 className="text-[13px] font-semibold leading-snug tracking-tight text-primary transition-colors duration-500 group-hover:text-primary sm:text-[14px]">
                  {industry.name}
                </h3>
              </div>

              <div className="industry-card__accent-bar" aria-hidden />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
