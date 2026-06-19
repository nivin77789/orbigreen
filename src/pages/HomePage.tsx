import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HeroFrameCanvas } from "@/components/HeroFrameCanvas";
import { HeroVideoSection } from "@/components/HeroVideoSection";
import { useInView } from "@/hooks/useInView";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeHelpSection } from "@/components/HomeHelpSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ProductsShowcase } from "@/components/ProductsShowcase";
import { HomeWorkflow } from "@/components/HomeWorkflow";

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
  const [phase, setPhase] = useState<"workflow" | "closing">("workflow");

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const next = v < 0.72 ? "workflow" : "closing";
    setPhase((p) => (p === next ? p : next));
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [0.08, 0.24, 0.1],
  );

  return (
    <div id="top" className="relative bg-section text-body">
      <Nav />

      <HeroVideoSection />

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
