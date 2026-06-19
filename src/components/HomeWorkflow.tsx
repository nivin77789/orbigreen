import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const stroke = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const WORKFLOW_STEPS: { t: string; d: string; icon: ReactNode }[] = [
  {
    t: "Requirement Understanding",
    d: "Review technical drawings, specifications, and full project scope.",
    icon: (
      <svg {...stroke}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
  },
  {
    t: "Supplier Identification",
    d: "Select qualified manufacturers based on capability, capacity, and certifications.",
    icon: (
      <svg {...stroke}>
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5H4a2 2 0 0 0-2 2Z" />
        <path d="M9 22v-4h6v4" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    t: "Costing & Quotation",
    d: "Coordinate RFQs and commercial evaluation to arrive at optimal landed cost.",
    icon: (
      <svg {...stroke}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8" />
        <path d="M8 10h2" />
        <path d="M14 10h2" />
        <path d="M8 14h2" />
        <path d="M14 14h2" />
        <path d="M8 18h8" />
      </svg>
    ),
  },
  {
    t: "Production Planning",
    d: "Freeze manufacturing schedules and quality plans aligned to milestones.",
    icon: (
      <svg {...stroke}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    ),
  },
  {
    t: "Quality Assurance",
    d: "Conduct in-process and final inspections, documenting quality at every stage.",
    icon: (
      <svg {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    t: "Delivery Management",
    d: "Coordinate logistics and documentation to ensure on-time, in-full shipments.",
    icon: (
      <svg {...stroke}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
];

export function HomeWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: EASE }}
      className="home-workflow pointer-events-auto mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8"
    >
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="home-workflow__header mx-auto max-w-2xl text-center"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-secondary sm:text-[12px] lg:text-[13px]">
          How We Work
        </span>
        <h3 className="mt-3 text-balance text-[clamp(1.65rem,3.6vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-primary">
          A clear, engineered{" "}
          <span className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
            sourcing workflow.
          </span>
        </h3>
        <div className="home-workflow__heading-line mx-auto mt-4" aria-hidden />
      </motion.header>

      <div className="home-workflow__rail mt-7 hidden sm:block" aria-hidden>
        <div className="home-workflow__rail-track">
          <motion.div
            className="home-workflow__rail-fill"
            animate={{ scaleX: (activeStep + 1) / WORKFLOW_STEPS.length }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        </div>
        <ol className="home-workflow__rail-nodes">
          {WORKFLOW_STEPS.map((step, i) => {
            const isActive = i <= activeStep;
            const isCurrent = i === activeStep;
            return (
              <li key={step.t}>
                <button
                  type="button"
                  className={`home-workflow__rail-node ${isActive ? "home-workflow__rail-node--active" : ""} ${
                    isCurrent ? "home-workflow__rail-node--current" : ""
                  }`}
                  onMouseEnter={() => setActiveStep(i)}
                  onFocus={() => setActiveStep(i)}
                  aria-label={`Step ${i + 1}: ${step.t}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <ol className="home-workflow__grid mt-6 sm:mt-7">
        {WORKFLOW_STEPS.map((step, i) => {
          const isActive = i === activeStep;
          return (
            <motion.li
              key={step.t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.06, ease: EASE }}
              onMouseEnter={() => setActiveStep(i)}
              onFocus={() => setActiveStep(i)}
              className="list-none"
            >
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={`home-workflow__card group ${isActive ? "home-workflow__card--active" : ""}`}
              >
                <span className="home-workflow__card-watermark" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="home-workflow__card-shine" aria-hidden />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="home-workflow__card-icon">{step.icon}</span>
                    <span className="home-workflow__card-index">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <h4 className="mt-3 text-[14px] font-semibold leading-snug tracking-tight text-primary sm:text-[15px] lg:text-[16px]">
                    {step.t}
                  </h4>
                  <p className="mt-2 flex-1 text-[12px] leading-relaxed text-primary/68 sm:text-[13px] lg:text-[14px]">
                    {step.d}
                  </p>
                </div>
              </motion.article>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
