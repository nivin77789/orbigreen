import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HeroFrameCanvas } from "@/components/HeroFrameCanvas";
import { useInView } from "@/hooks/useInView";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeHelpSection } from "@/components/HomeHelpSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ProductsShowcase } from "@/components/ProductsShowcase";
import { HomeWorkflow } from "@/components/HomeWorkflow";

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[12px] lg:text-[13px] uppercase tracking-[0.3em] text-body/45">Scroll</span>
      <div className="h-10 w-px bg-gradient-to-b from-secondary to-transparent" />
    </div>
  );
}


function HeroCopy({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="hero-copy-plain pointer-events-auto mx-auto flex w-full max-w-sm flex-col items-center px-5 py-6 text-center sm:max-w-md sm:px-7 sm:py-8 lg:max-w-lg"
    >
      <span className="inline-flex items-center gap-2 text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#073f52]">
        <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(92,191,42,0.45)]" />
        Orbigreen Techsource
      </span>
      <h1 className="mt-5 text-balance text-[clamp(1.875rem,4.8vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:mt-6">
        Driving Sustainable{" "}
        <span>Industrial Solutions</span>
      </h1>
      <p className="mt-4 max-w-md text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium leading-snug tracking-tight text-white">
        Engineering-led sourcing for OEMs worldwide.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
        <Link
          to="/products"
          className="hero-copy-btn gradient-border-cta rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-medium transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          Our Products
        </Link>
        <Link
          to="/services"
          className="hero-copy-btn hero-copy-btn--outline gradient-border-cta-outline rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          Our Services
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
      <p className="mx-auto mt-5 max-w-xl text-[17px] lg:text-[18px] leading-relaxed text-body/70">
        Let's discuss how Orbigreen Techsource can streamline your sourcing and secure your procurement process.
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const heroActive = useInView(trackRef, "120px");
  const [phase, setPhase] = useState<"hero" | "workflow" | "closing">("hero");

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const next = v < 0.22 ? "hero" : v < 0.78 ? "workflow" : "closing";
    setPhase((p) => (p === next ? p : next));
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 0.16, 0.24, 0.1],
  );

  return (
    <div id="top" className="relative bg-section text-body">
      <Nav />

      <section ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroFrameCanvas progressRef={progressRef} active={heroActive} />

          <div className="pointer-events-none absolute inset-0 bg-white/10" aria-hidden />

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-section/35 via-section/12 to-section/40"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_62%,#F5F8F7_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 lg:px-12 xl:px-16">
            {phase === "hero" && (
              <>
                <HeroCopy visible />
                <ScrollHint />
              </>
            )}
            {phase === "workflow" && (
              <div className="flex h-full w-full items-center justify-center overflow-y-auto py-20 sm:py-16">
                <HomeWorkflow />
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

      <HomeHelpSection />
      <ProductsShowcase variant="section" />
      <IndustriesSection />
      <Footer />
    </div>
  );
}
