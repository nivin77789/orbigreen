import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";

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

const WORKFLOW_STEP_COUNT = WORKFLOW_STEPS.length;

export const WORKFLOW_SCROLL_END = 0.72;

export function workflowStepFromScroll(progress: number) {
  if (progress >= WORKFLOW_SCROLL_END) return WORKFLOW_STEP_COUNT - 1;
  return Math.min(
    WORKFLOW_STEP_COUNT - 1,
    Math.floor((progress / WORKFLOW_SCROLL_END) * WORKFLOW_STEP_COUNT),
  );
}

type HomeWorkflowProps = {
  activeStep: number;
  onStepSelect?: (index: number) => void;
};

export function HomeWorkflow({ activeStep, onStepSelect }: HomeWorkflowProps) {
  const safeStep = Math.min(WORKFLOW_STEP_COUNT - 1, Math.max(0, activeStep));
  const active = WORKFLOW_STEPS[safeStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: EASE }}
      className="home-workflow home-workflow--hero pointer-events-auto mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8"
    >
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="home-workflow__header mx-auto max-w-2xl text-center"
      >
        <SectionLabel tone="white">How We Work</SectionLabel>
        <h3 className="mt-3 text-balance text-[clamp(1.55rem,3.4vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-white">
          A clear, engineered{" "}
          <span className="text-white/95">sourcing workflow.</span>
        </h3>
        <div className="home-workflow__heading-line mx-auto mt-4" aria-hidden />
      </motion.header>

      <ol className="home-workflow-chevron-flow mt-5 sm:mt-6" aria-label="Sourcing workflow steps">
        {WORKFLOW_STEPS.map((step, i) => {
          const isActive = i === safeStep;
          const isPast = i < safeStep;

          return (
            <motion.li
              key={step.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 + i * 0.05, ease: EASE }}
              className="home-workflow-chevron-item list-none"
            >
              <button
                type="button"
                className={`home-workflow-chevron group ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
                onMouseEnter={() => onStepSelect?.(i)}
                onFocus={() => onStepSelect?.(i)}
                onClick={() => onStepSelect?.(i)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${step.t}`}
              >
                <span className="home-workflow-chevron__sheen" aria-hidden />
                <span className="home-workflow-chevron__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="home-workflow-chevron__icon">{step.icon}</span>
                <span className="home-workflow-chevron__title">{step.t}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={safeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="home-workflow-chevron-detail mt-4 sm:mt-5"
          role="region"
          aria-live="polite"
          aria-label={`Step ${safeStep + 1} details`}
        >
          <div className="home-workflow-chevron-detail__inner">
            <span className="home-workflow-chevron-detail__icon">{active.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="home-workflow-chevron-detail__step">
                Step {String(safeStep + 1).padStart(2, "0")}
              </p>
              <h4 className="home-workflow-chevron-detail__title">{active.t}</h4>
              <p className="home-workflow-chevron-detail__copy">{active.d}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
