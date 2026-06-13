import { motion } from "framer-motion";
import { INDUSTRIES } from "@/data/industriesData";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";

const EASE = [0.16, 1, 0.3, 1] as const;

function IndustriesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="industries-section-grid absolute inset-0" />
      <div className="absolute -left-[12%] top-[8%] h-[45vh] w-[45vw] rounded-full bg-primary/[0.05] blur-[100px]" />
      <div className="absolute -right-[10%] bottom-[5%] h-[40vh] w-[40vw] rounded-full bg-secondary/[0.07] blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_30%,var(--section-bg)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

export function IndustriesSection() {
  return (
    <section className="relative overflow-hidden border-t border-primary/10 bg-white py-16 sm:py-20 lg:py-20">
      <IndustriesBackground />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-xl"
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-secondary">Industries We Serve</span>
            <h2 className="mt-3 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-primary">
              Sourcing across{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                12 sectors
              </span>
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-primary/60">
              Qualified suppliers, quality assurance, and logistics for diverse manufacturing programs.
            </p>
            <div className="industries-heading-line mt-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="industries-stat-pill shrink-0 self-start lg:self-auto"
          >
            <AnimatedStatValue
              value="12"
              delay={0.15}
              className="block text-[clamp(2.15rem,4.2vw,3rem)] font-semibold leading-none tracking-tight text-primary"
            />
            <span className="mt-1 block text-[12px] font-bold uppercase tracking-[0.22em] text-primary/55">
              Industrial Sectors
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-3.5">
          {INDUSTRIES.map((industry, i) => (
            <motion.article
              key={industry.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: EASE } }}
              className={`industry-card industry-card--compact industry-card--${(i % 4) + 1} group relative overflow-hidden rounded-2xl px-3.5 py-4 text-center sm:px-4 sm:py-5`}
            >
              <div className="industry-card__sheen" aria-hidden />
              <div className="industry-card__glow" aria-hidden />
              <div className="industry-card__top-line" aria-hidden />

              <div className="relative z-10 flex flex-col items-center gap-2.5 sm:gap-3">
                <div className="industry-card__icon-ring relative">
                  <div className="industry-card__icon flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
                    {industry.icon}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold leading-tight tracking-tight text-primary sm:text-[15px]">
                    {industry.name}
                  </h3>
                  <p className="industry-card__tagline mt-1 text-[12px] leading-snug text-primary/52 sm:text-[13px]">
                    {industry.tagline}
                  </p>
                </div>
              </div>

              <div className="industry-card__accent-bar" aria-hidden />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
