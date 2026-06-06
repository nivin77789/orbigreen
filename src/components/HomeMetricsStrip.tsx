import { motion } from "framer-motion";

const METRICS = [
  { n: "500+", l: "Projects" },
  { n: "50+", l: "Global Clients" },
  { n: "15+", l: "Years" },
  { n: "100%", l: "Quality Focus" },
];

const HIGHLIGHTS = [
  {
    t: "Your in-market team",
    d: "Local sourcing and quality support without setting up your own foreign entity.",
  },
  {
    t: "Compliance & QA",
    d: "Audits, inspections, and documentation built into every sourcing program.",
  },
  {
    t: "Multi-market access",
    d: "Diversify supply risk by expanding into multiple sourcing regions.",
  },
  {
    t: "On-the-ground visibility",
    d: "Know who is making your parts, at what cost, and under which conditions.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function StatsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="home-stats-bg" />
      <div className="home-stats-orb home-stats-orb--1" />
      <div className="home-stats-orb home-stats-orb--2" />
      <div className="home-stats-orb home-stats-orb--3" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--section-bg)_100%)]" />
    </div>
  );
}

export function HomeMetricsStrip() {
  return (
    <section
      id="stats"
      className="relative flex h-svh min-h-svh w-full snap-start snap-always items-center justify-center overflow-hidden border-t border-primary/10"
    >
      <StatsBackground />

      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="relative z-10 flex w-full max-w-[1080px] flex-col items-center justify-center gap-3 px-4 sm:gap-4 sm:px-6 lg:gap-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid w-full grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.l}
              variants={fadeUp}
              custom={i}
              className="glass-card-light group rounded-xl px-3 py-4 text-center transition-all duration-500 sm:rounded-2xl sm:px-4 sm:py-5 lg:py-6"
            >
              <div className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-[clamp(1.35rem,3.5vw,2.25rem)] font-semibold leading-none tracking-tight text-transparent">
                {metric.n}
              </div>
              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary/60 sm:mt-2 sm:text-[10px]">
                {metric.l}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid w-full grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.t}
              variants={fadeUp}
              custom={i + 4}
              className="glass-card-light group flex flex-col rounded-xl p-3 text-center transition-all duration-500 ease-out hover:glass-card-hover sm:rounded-2xl sm:p-4 lg:p-5"
            >
              <span className="text-[clamp(1.1rem,2.5vw,1.75rem)] font-semibold tabular-nums leading-none tracking-tight text-primary/30 transition-colors duration-500 group-hover:text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 text-[12px] font-semibold leading-snug tracking-tight text-primary sm:mt-2 sm:text-[14px] lg:text-[15px]">
                {item.t}
              </h3>
              <p className="mt-1 line-clamp-4 text-[10px] leading-relaxed text-primary/65 sm:mt-1.5 sm:line-clamp-5 sm:text-[11px] lg:text-[12px]">
                {item.d}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
