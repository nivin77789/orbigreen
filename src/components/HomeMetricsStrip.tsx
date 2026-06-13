import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";

const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS = [
  { n: "500+", l: "Projects", hint: "Delivered worldwide" },
  { n: "50+", l: "Global Clients", hint: "Across industries" },
  { n: "15+", l: "Years", hint: "Sourcing expertise" },
  { n: "100%", l: "Quality Focus", hint: "Commitment to spec" },
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
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
  }),
};

function MetricsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="metrics-section-grid absolute inset-0" />
      <div className="absolute -left-[10%] top-[15%] h-[42vh] w-[42vw] rounded-full bg-primary/[0.06] blur-[90px]" />
      <div className="absolute -right-[8%] bottom-[10%] h-[38vh] w-[38vw] rounded-full bg-secondary/[0.08] blur-[80px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_35%,var(--section-bg)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/45 to-transparent" />
    </div>
  );
}

function MetricsBand() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="metrics-band relative w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric, i) => (
          <motion.div
            key={metric.l}
            variants={fadeUp}
            custom={i}
            className="metrics-band-item group relative px-4 py-6 text-center sm:px-5 sm:py-7 lg:px-6 lg:py-8"
          >
            {i > 0 && (
              <span
                className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/15 to-transparent lg:block"
                aria-hidden
              />
            )}
            {i % 2 === 1 && (
              <span
                className="absolute left-0 top-4 h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent lg:hidden"
                aria-hidden
              />
            )}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <AnimatedStatValue
                value={metric.n}
                delay={i * 0.1}
                className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-none tracking-tight text-transparent"
              />
            </motion.div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70 sm:mt-2.5">
              {metric.l}
            </div>
            <div className="mt-1 text-[10px] text-primary/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:mt-1.5">
              {metric.hint}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="metrics-band-shine absolute inset-x-0 top-0 h-px"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function HighlightTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative w-full"
    >
      <div className="mb-5 flex items-end justify-between gap-4 px-1 sm:mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
            Why Orbigreen
          </span>
          <h3 className="mt-2 text-[clamp(1.25rem,2.5vw,1.65rem)] font-semibold tracking-tight text-primary">
            Sourcing advantages that scale
          </h3>
        </div>
        <span className="text-[11px] font-bold tabular-nums tracking-widest text-primary/40">
          {String(activeIndex + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8 lg:items-stretch">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          {HIGHLIGHTS.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.button
                key={item.t}
                type="button"
                variants={fadeUp}
                custom={i + 4}
                onClick={() => setActiveIndex(i)}
                whileHover={{ x: isActive ? 0 : 4 }}
                className={`highlight-pill group relative flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-500 sm:px-5 sm:py-4 ${
                  isActive
                    ? "highlight-pill--active shadow-[0_12px_40px_-14px_rgba(11,95,126,0.2)]"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold tabular-nums tracking-tight transition-colors duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-primary to-secondary text-white"
                      : "bg-primary/[0.06] text-primary/35 group-hover:text-secondary"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[13px] font-semibold leading-snug tracking-tight transition-colors duration-500 sm:text-[14px] ${
                    isActive ? "text-primary" : "text-primary/75"
                  }`}
                >
                  {item.t}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="highlight-active-bar"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-secondary to-accent sm:left-5 sm:right-5"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          custom={8}
          className="highlight-panel relative min-h-[200px] overflow-hidden rounded-[1.5rem] p-6 sm:min-h-[220px] sm:p-7 lg:min-h-0 lg:p-8"
        >
          <div className="highlight-panel-grid absolute inset-0 opacity-50" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative z-10 flex h-full flex-col justify-between"
            >
              <div>
                <motion.span
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.4, ease: EASE }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Advantage {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
                <h4 className="mt-4 text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold leading-snug tracking-tight text-primary">
                  {HIGHLIGHTS[activeIndex].t}
                </h4>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-primary/68 sm:text-[15px]">
                  {HIGHLIGHTS[activeIndex].d}
                </p>
              </div>
              <div className="mt-6 flex gap-1.5">
                {HIGHLIGHTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show highlight ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex ? "w-8 bg-gradient-to-r from-secondary to-accent" : "w-3 bg-primary/15"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HomeMetricsStrip() {
  return (
    <section
      id="stats"
      className="content-auto relative flex min-h-svh w-full items-center justify-center overflow-hidden border-t border-primary/10 bg-white py-16 sm:py-20 lg:py-24"
    >
      <MetricsBackground />

      <div className="relative z-10 w-full max-w-[1140px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">By the Numbers</span>
          <h2 className="mt-3 text-balance text-[clamp(1.75rem,3.5vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-primary">
            Proven scale.{" "}
            <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              Measured impact.
            </span>
          </h2>
        </motion.div>

        <MetricsBand />

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <HighlightTimeline />
        </div>
      </div>
    </section>
  );
}
