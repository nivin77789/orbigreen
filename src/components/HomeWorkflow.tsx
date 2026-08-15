import { type ReactNode } from "react";
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
    t: "Technical Requirement Analysis",
    d: "Review engineering drawings, material specifications, standards, and project deliverables to establish complete technical and commercial requirements.",
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
    t: "Supplier Qualification & Selection",
    d: "Identify and evaluate manufacturing partners based on technical capability, production capacity, quality systems, certifications, and delivery performance.",
    icon: (
      <svg {...stroke}>
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5H4a2 2 0 0 0-2 2Z" />
        <path d="M9 22v-4h6v4" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    t: "Strategic Sourcing & Commercial Evaluation",
    d: "Manage RFQ/RFP processes, perform technical-commercial bid analysis, and optimize total landed cost while ensuring compliance with project requirements.",
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
    t: "Production Planning & Execution Control",
    d: "Finalize manufacturing schedules, inspection and test plans, and milestone-based production activities to ensure seamless project execution.",
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
    t: "QA & QC",
    d: "Execute stage-wise quality surveillance, in-process inspections, final acceptance testing, and documentation review to ensure full compliance with specifications and standards.",
    icon: (
      <svg {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    t: "Logistics & Delivery Assurance",
    d: "Coordinate packaging and delivery management for both local and international shipments, including export/import documentation, ensuring timely, traceable, and compliant delivery.",
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="home-workflow home-workflow--hero pointer-events-auto mx-auto w-full max-w-[920px] px-2 sm:px-4 lg:px-6"
    >
      <header className="home-workflow__header mx-auto max-w-xl text-center">
        <h3 className="home-workflow__title font-semibold tracking-tight text-white">How We Work</h3>
      </header>

      <div
        className="home-workflow__stack mt-3 sm:mt-4"
        role="group"
        aria-label={`Workflow progress: step ${safeStep + 1} of ${WORKFLOW_STEP_COUNT}`}
      >
        <div className="home-workflow-segments" aria-hidden>
          {WORKFLOW_STEPS.map((_, i) => (
            <span
              key={i}
              className={`home-workflow-segments__bar${i <= safeStep ? " is-filled" : ""}${i === safeStep ? " is-current" : ""}`}
            />
          ))}
        </div>

        <p className="home-workflow-step-meta">
          Step {String(safeStep + 1).padStart(2, "0")}{" "}
          <span className="home-workflow-step-meta__of">/ {WORKFLOW_STEP_COUNT}</span>
        </p>

        <AnimatePresence mode="wait">
          <motion.article
            key={safeStep}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="home-workflow-feature"
            role="region"
            aria-live="polite"
          >
            <div className="home-workflow-feature__top">
              <span className="home-workflow-feature__icon">{active.icon}</span>
              <span className="home-workflow-feature__badge">
                Step {String(safeStep + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="home-workflow-feature__title">{active.t}</h4>
            <p className="home-workflow-feature__desc">{active.d}</p>
          </motion.article>
        </AnimatePresence>

        <div className="home-workflow-rail" aria-label="Sourcing workflow steps">
          {WORKFLOW_STEPS.map((step, i) => {
            const isActive = i === safeStep;
            const isPast = i < safeStep;

            return (
              <button
                key={step.t}
                type="button"
                className={`home-workflow-rail__node${isActive ? " is-active" : ""}${isPast ? " is-past" : ""}`}
                onMouseEnter={() => onStepSelect?.(i)}
                onFocus={() => onStepSelect?.(i)}
                onClick={() => onStepSelect?.(i)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${step.t}`}
              >
                <span className="home-workflow-rail__num">{String(i + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
