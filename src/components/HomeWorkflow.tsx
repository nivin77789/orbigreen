import { type ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const progressPct = ((safeStep + 1) / WORKFLOW_STEP_COUNT) * 100;
  const flowRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const flow = flowRef.current;
    const step = stepRefs.current[safeStep];
    if (!flow || !step) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flowRect = flow.getBoundingClientRect();
    const stepRect = step.getBoundingClientRect();
    const targetLeft =
      flow.scrollLeft + (stepRect.left - flowRect.left) - (flowRect.width - stepRect.width) / 2;

    flow.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [safeStep]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="home-workflow home-workflow--hero pointer-events-auto mx-auto w-full max-w-[1080px] px-2 sm:px-4 lg:px-6"
    >
      <header className="home-workflow__header mx-auto max-w-xl text-center">
        <h3 className="home-workflow__title font-semibold tracking-tight text-white">
          How We Work
        </h3>
      </header>

      <div className="home-workflow__stack mt-3 sm:mt-4">
        <div
          className="home-workflow-progress"
          role="group"
          aria-label={`Workflow progress: step ${safeStep + 1} of ${WORKFLOW_STEP_COUNT}`}
        >
          <div className="home-workflow-progress__meta">
            <span>
              Step {String(safeStep + 1).padStart(2, "0")}{" "}
              <span className="home-workflow-progress__of">/ {WORKFLOW_STEP_COUNT}</span>
            </span>
            <span className="home-workflow-progress__pct">{Math.round(progressPct)}%</span>
          </div>
          <div className="home-workflow-progress__track">
            <motion.div
              className="home-workflow-progress__fill"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>
        </div>

        <ol ref={flowRef} className="home-workflow-pipeline" aria-label="Sourcing workflow steps">
          {WORKFLOW_STEPS.map((step, i) => {
            const isActive = i === safeStep;
            const isPast = i < safeStep;
            const isLast = i === WORKFLOW_STEPS.length - 1;

            return (
              <li
                key={step.t}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`home-workflow-pipeline__item list-none${isLast ? " is-last" : ""}`}
              >
                <motion.button
                  type="button"
                  className={`home-workflow-pipeline__node ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
                  onMouseEnter={() => onStepSelect?.(i)}
                  onFocus={() => onStepSelect?.(i)}
                  onClick={() => onStepSelect?.(i)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${step.t}`}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="home-workflow-pipeline__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="home-workflow-pipeline__label">{step.t}</span>
                </motion.button>
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={safeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="home-workflow-detail"
            role="region"
            aria-live="polite"
          >
            <span className="home-workflow-detail__icon">{active.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="home-workflow-detail__title">{active.t}</p>
              <p className="home-workflow-detail__desc">{active.d}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
