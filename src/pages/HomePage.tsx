import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroFrameCanvas } from "@/components/HeroFrameCanvas";
import { HeroVideoSection } from "@/components/HeroVideoSection";
import { ServicesMarquee } from "@/components/ServicesMarquee";
import { useInView } from "@/hooks/useInView";
import { useScrollSectionProgress } from "@/hooks/useScrollSectionProgress";
import { Nav } from "@/components/Nav";
import { HomeWorkflow, workflowStepFromScroll, WORKFLOW_SCROLL_END } from "@/components/HomeWorkflow";
import { HERO_BG } from "@/lib/constants";

const HomeHelpSection = lazy(() =>
  import("@/components/HomeHelpSection").then((module) => ({ default: module.HomeHelpSection })),
);
const IndustriesSection = lazy(() =>
  import("@/components/IndustriesSection").then((module) => ({ default: module.IndustriesSection })),
);
const Footer = lazy(() => import("@/components/Footer").then((module) => ({ default: module.Footer })));

function interpolateOpacity(progress: number) {
  if (progress <= WORKFLOW_SCROLL_END) {
    const t = progress / WORKFLOW_SCROLL_END;
    return 0.08 + t * (0.24 - 0.08);
  }

  const t = (progress - WORKFLOW_SCROLL_END) / (1 - WORKFLOW_SCROLL_END);
  return 0.24 + t * (0.1 - 0.24);
}

function ClosingCTA({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto mx-auto max-w-3xl px-6 text-center"
    >
      <h2 className="text-balance text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
        Ready to Optimize Your Supply Chain!
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
        Share your requirements and our team will recommend the right sourcing, quality, and delivery approach.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/quotation"
          className="gradient-border-cta inline-flex rounded-full px-6 py-3 text-[13px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)] sm:px-7 sm:text-[14px]"
        >
          Request Quotation
        </Link>
        <Link
          to="/contact"
          className="inline-flex rounded-full border border-white/35 bg-white/10 px-6 py-3 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-7 sm:text-[14px]"
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const heroActive = useInView(trackRef, "200px");
  const [phase, setPhase] = useState<"workflow" | "closing">("workflow");
  const [workflowStep, setWorkflowStep] = useState(0);

  const handleScrollProgress = useCallback((progress: number) => {
    progressRef.current = progress;

    if (tintRef.current) {
      tintRef.current.style.opacity = String(interpolateOpacity(progress));
    }

    const next = progress < WORKFLOW_SCROLL_END ? "workflow" : "closing";
    setPhase((current) => (current === next ? current : next));

    if (progress < WORKFLOW_SCROLL_END) {
      const step = workflowStepFromScroll(progress);
      setWorkflowStep((current) => (current === step ? current : step));
    }
  }, []);

  useScrollSectionProgress(trackRef, handleScrollProgress);

  return (
    <div id="top" className="relative bg-section text-body">
      <Nav />

      <HeroVideoSection />
      <ServicesMarquee />

      <section ref={trackRef} className="home-scroll-track relative h-[400vh]" style={{ backgroundColor: HERO_BG }}>
        <div className="home-scroll-stage sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: HERO_BG }}>
          <HeroFrameCanvas progressRef={progressRef} active={heroActive} />

          <div className="hero-surface-overlay pointer-events-none absolute inset-0" aria-hidden />

          <div
            ref={tintRef}
            style={{ opacity: 0.08 }}
            className="hero-scroll-tint pointer-events-none absolute inset-0"
          />

          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 lg:px-12 xl:px-16">
            {phase === "workflow" && (
              <div className="home-workflow-stage flex h-full w-full items-center justify-center overflow-hidden py-6 sm:py-8 lg:py-10">
                <HomeWorkflow activeStep={workflowStep} onStepSelect={setWorkflowStep} />
              </div>
            )}
            {phase === "closing" && (
              <div className="flex h-full w-full items-center justify-center">
                <ClosingCTA visible />
              </div>
            )}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <HomeHelpSection />
        <IndustriesSection />
        <Footer />
      </Suspense>
    </div>
  );
}
