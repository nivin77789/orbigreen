import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HeroFrameCanvas } from "@/components/HeroFrameCanvas";
import { useInView } from "@/hooks/useInView";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeAboutSection } from "@/components/HomeAboutSection";
import { HomeMetricsStrip } from "@/components/HomeMetricsStrip";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ProductsShowcase } from "@/components/ProductsShowcase";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[12px] uppercase tracking-[0.3em] text-body/45">Scroll</span>
      <div className="h-10 w-px bg-gradient-to-b from-secondary to-transparent" />
    </div>
  );
}

function MetricsServices({ visible }: { visible: boolean }) {
  const metrics = [
    { n: "500+", l: "Projects Delivered" },
    { n: "50+", l: "Global Clients" },
    { n: "15+", l: "Years Experience" },
    { n: "100%", l: "Quality Commitment" },
  ];
  const services = [
    {
      t: "Training, Consultancy & Advisory",
      d: "Strategic consulting for procurement optimization and sourcing transformation.",
    },
    {
      t: "Global Sourcing",
      d: "International supplier identification, qualification, and cost-effective procurement.",
    },
    {
      t: "Engineering Services",
      d: "Design engineering, technical evaluation, and manufacturing support.",
    },
    {
      t: "Quality & Inspection",
      d: "Factory inspections, production monitoring, and compliance audits.",
    },
    {
      t: "Site & Installation",
      d: "On-site supervision, equipment installation, and commissioning.",
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto mx-auto w-full max-w-[min(100%,52rem)] px-4 sm:max-w-[56rem] sm:px-5 lg:max-w-[64rem]"
    >
      <div className="hero-scroll-panel rounded-[1.35rem] p-4 sm:rounded-2xl sm:p-5 lg:p-5">
        <div className="hero-scroll-panel__content grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:gap-0">
          <div className="hero-scroll-metrics flex flex-col items-center justify-center text-center md:min-h-[13rem] md:pr-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-primary/55 sm:text-[12px]">
              By the Numbers
            </span>
            <div className="mt-4 grid w-full max-w-[16rem] grid-cols-2 place-items-center gap-x-5 gap-y-5 sm:max-w-[18rem] sm:gap-x-6 sm:gap-y-6">
              {metrics.map((m, i) => (
                <div key={m.l} className="flex w-full flex-col items-center text-center">
                  <AnimatedStatValue
                    value={m.n}
                    immediate
                    delay={i * 0.1}
                    className="text-[clamp(1.5rem,3.5vw,2.15rem)] font-semibold leading-none tracking-tight text-primary"
                  />
                  <div className="mt-1 max-w-[7rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-primary/52 sm:text-[12px]">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="services" className="hero-scroll-panel__divider md:pl-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-secondary sm:text-[12px]">
              Our Services
            </span>
            <div className="mt-3 flex flex-col gap-2">
              {services.map((s, i) => (
                <div key={s.t} className="hero-scroll-service group rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="hero-scroll-service__index mt-0.5 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[14px] font-semibold leading-snug tracking-tight text-primary sm:text-[15px]">
                        {s.t}
                      </h4>
                      <p className="mt-0.5 line-clamp-2 text-[13px] leading-relaxed text-primary/62 sm:line-clamp-none sm:text-[14px]">
                        {s.d}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const WORKFLOW_EASE = [0.16, 1, 0.3, 1] as const;

const WORKFLOW_STEPS = [
  {
    t: "Requirement Understanding",
    d: "Review technical drawings, specifications, and full project scope.",
  },
  {
    t: "Supplier Identification",
    d: "Select qualified manufacturers based on capability, capacity, and certifications.",
  },
  {
    t: "Costing & Quotation",
    d: "Coordinate RFQs and commercial evaluation to arrive at optimal landed cost.",
  },
  {
    t: "Production Planning",
    d: "Freeze manufacturing schedules and quality plans aligned to milestones.",
  },
  {
    t: "Quality Assurance",
    d: "Conduct in-process and final inspections, documenting quality at every stage.",
  },
  {
    t: "Delivery Management",
    d: "Coordinate logistics and documentation to ensure on-time, in-full shipments.",
  },
];

function Workflow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: WORKFLOW_EASE }}
      className="pointer-events-auto mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-10"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: WORKFLOW_EASE }}
          className="text-center lg:text-left"
        >
          <span className="text-[12px] font-bold uppercase tracking-[0.32em] text-secondary">How We Work</span>
          <h3 className="mt-4 text-balance text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.06] tracking-tight text-primary">
            A clear, engineered{" "}
            <span className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
              sourcing workflow.
            </span>
          </h3>
          <div className="workflow-heading-line mx-auto mt-6 lg:mx-0" aria-hidden />
          <div className="mt-6 hidden items-center justify-center gap-2 lg:flex lg:justify-start">
            {WORKFLOW_STEPS.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full bg-gradient-to-r from-secondary/70 to-accent/50"
                style={{ width: `${12 + i * 4}px`, opacity: 0.35 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        <ol className="grid grid-cols-2 gap-3 sm:gap-3.5">
          {WORKFLOW_STEPS.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: WORKFLOW_EASE }}
              whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.35, ease: WORKFLOW_EASE } }}
              className="workflow-step-card group relative flex flex-col overflow-hidden rounded-[1.35rem] p-4 sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="workflow-step-card__sheen" aria-hidden />
              <div className="workflow-step-card__glow" aria-hidden />
              <div className="workflow-step-card__edge" aria-hidden />
              <div className="relative z-10 flex items-start justify-between gap-2">
                <span className="workflow-step-card__index flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] text-[13px] font-bold tabular-nums tracking-tight sm:h-10 sm:w-10 sm:text-[14px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="workflow-step-card__connector hidden h-px flex-1 self-center sm:block" aria-hidden />
              </div>
              <div className="relative z-10 mt-3.5 flex flex-1 flex-col sm:mt-4">
                <h4 className="text-[14px] font-semibold leading-snug tracking-tight text-primary sm:text-[16px]">
                  {s.t}
                </h4>
                <p className="mt-2 text-[12px] leading-relaxed text-primary/72 sm:text-[14px]">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

function HeroCopy({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="hero-copy-block pointer-events-auto mx-auto max-w-3xl rounded-2xl px-5 py-7 text-center sm:px-8 sm:py-8"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.25em] text-primary/80 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(92,191,42,0.45)]" />
        Orbigreen Techsource
      </span>
      <h1 className="mt-6 text-balance text-[clamp(2.5rem,6.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-primary">
        Industrial Sourcing{" "}
        <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          Excellence.
        </span>
      </h1>
      <p className="mt-5 text-[clamp(1.15rem,1.7vw,1.45rem)] font-medium tracking-tight text-primary/90">
        Smart. Sustainable. Sourcing.
      </p>
      <p className="mx-auto mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/78 sm:text-[17px]">
        Your single-window sourcing solution for industrial engineering machinery, parts, and services — delivering
        sustainable supply solutions worldwide.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
        <Link
          to="/services"
          className="hero-copy-btn gradient-border-cta rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          Our Services
        </Link>
        <Link
          to="/contact"
          className="hero-copy-btn hero-copy-btn--outline gradient-border-cta-outline rounded-full px-6 py-3 text-[14px] font-semibold transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          Get in Touch
        </Link>
      </div>
    </motion.div>
  );
}

function ClosingCTA({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto mx-auto max-w-3xl px-6 text-center"
    >
      <h2 className="text-balance text-[clamp(2.5rem,5.8vw,4.85rem)] font-semibold leading-none tracking-[-0.03em] text-body">
        Ready to Optimize
        <br />
        <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          Your Supply Chain?
        </span>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-body/70">
        Let's discuss how Orbigreen Techsource can streamline your sourcing and secure your procurement process.
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const heroActive = useInView(trackRef, "120px");
  const [phase, setPhase] = useState<"hero" | "metrics" | "workflow" | "closing">("hero");

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const next = v < 0.15 ? "hero" : v < 0.45 ? "metrics" : v < 0.85 ? "workflow" : "closing";
    setPhase((p) => (p === next ? p : next));
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.85, 1],
    [0, 0.25, 0.35, 0.35, 0.15],
  );

  return (
    <div id="top" className="relative bg-section text-body">
      <Nav />

      <section ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroFrameCanvas progressRef={progressRef} active={heroActive} />

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-section/50 via-section/20 to-section/55"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_55%,#F5F8F7_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            {phase === "hero" && (
              <>
                <HeroCopy visible />
                <ScrollHint />
              </>
            )}
            {phase === "metrics" && <MetricsServices visible />}
            {phase === "workflow" && (
              <div className="flex h-full w-full items-center justify-center overflow-y-auto py-20 sm:py-16">
                <Workflow />
              </div>
            )}
            {phase === "closing" && <ClosingCTA visible />}
          </div>
        </div>
      </section>

      <HomeAboutSection />
      <HomeMetricsStrip />
      <ProductsShowcase variant="section" />
      <IndustriesSection />
      <Footer />
    </div>
  );
}
