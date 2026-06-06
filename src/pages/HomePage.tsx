import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HeroFrameCanvas } from "@/components/HeroFrameCanvas";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { HomeMetricsStrip } from "@/components/HomeMetricsStrip";
import { ProductGalleryFallback } from "@/components/ProductGalleryFallback";

const ProductDepthGallery = lazy(() =>
  import("@/components/ProductDepthGallery").then((module) => ({
    default: module.ProductDepthGallery,
  })),
);

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-body/45">Scroll</span>
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
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-10"
    >
      <div className="lg:col-span-5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">By the Numbers</span>
        <h3 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-body">
          Engineered scale.
          <br />
          Measured impact.
        </h3>
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
          {metrics.map((m) => (
            <div key={m.l}>
              <div className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-[2.5rem] font-semibold tracking-tight text-transparent">
                {m.n}
              </div>
              <div className="mt-1 text-[12px] uppercase tracking-[0.18em] text-body/55">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="services" className="lg:col-span-7 lg:pl-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Our Services</span>
        <h3 className="mt-4 text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium leading-snug tracking-tight text-body">
          Comprehensive industrial sourcing and engineering solutions tailored to scale operations and mitigate
          risks.
        </h3>
        <div className="mt-8 grid gap-3">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="glass-card group rounded-2xl p-5 transition-all duration-500 ease-out hover:glass-card-hover"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h4 className="text-[15px] font-semibold tracking-tight text-body">{s.t}</h4>
                <span className="text-[10px] tabular-nums tracking-widest text-body/40 transition-colors group-hover:text-accent/80">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-body/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Workflow({ visible }: { visible: boolean }) {
  const steps = [
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

  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto ml-auto w-full max-w-[640px] px-6 lg:px-10"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">How We Work</span>
      <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-body">
        A clear, engineered
        <br />
        sourcing workflow.
      </h3>
      <ol className="mt-10 space-y-3">
        {steps.map((s, i) => (
          <li
            key={s.t}
            className="glass-card group grid grid-cols-[auto_1fr] gap-5 rounded-2xl p-5 transition-all duration-500 ease-out hover:glass-card-hover"
          >
            <span className="text-[28px] font-semibold tabular-nums tracking-tight text-body transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="text-[15px] font-semibold tracking-tight text-body">{s.t}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-body/70">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

function HeroCopy({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto mx-auto max-w-3xl px-6 text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary/70 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
        Orbigreen Techsource
      </span>
      <h1 className="mt-6 text-balance text-[clamp(2.5rem,6.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-body">
        Industrial Sourcing{" "}
        <span className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
          Excellence.
        </span>
      </h1>
      <p className="mt-5 text-[clamp(1.1rem,1.5vw,1.35rem)] font-light tracking-tight text-body/75">
        Smart. Sustainable. Sourcing.
      </p>
      <p className="mx-auto mt-5 max-w-xl text-pretty text-[14px] leading-relaxed text-body/65">
        Your single-window sourcing solution for industrial engineering machinery, parts, and services — delivering
        sustainable supply solutions worldwide.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#services"
          className="gradient-border-cta rounded-full px-6 py-3 text-[13px] font-medium transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
        >
          Our Services
        </a>
        <a
          href="#contact"
          className="gradient-border-cta-outline rounded-full px-6 py-3 text-[13px] font-medium transition-all hover:bg-white/15 hover:shadow-sm"
        >
          Get in Touch
        </a>
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
      <h2 className="text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] text-body">
        Ready to Optimize
        <br />
        <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          Your Supply Chain?
        </span>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-body/70">
        Let's discuss how Orbigreen Techsource can streamline your sourcing and secure your procurement process.
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [phase, setPhase] = useState<"hero" | "metrics" | "workflow" | "closing">("hero");

  useEffect(() => {
    document.documentElement.classList.add("home-snap-scroll");
    return () => document.documentElement.classList.remove("home-snap-scroll");
  }, []);

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

      <section ref={trackRef} className="relative h-[400vh] snap-start">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroFrameCanvas progressRef={progressRef} />

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
              <div className="flex h-full w-full items-center">
                <Workflow visible />
              </div>
            )}
            {phase === "closing" && <ClosingCTA visible />}
          </div>
        </div>
      </section>

      <HomeMetricsStrip />
      <section
        id="products"
        className="relative h-svh min-h-svh w-full snap-start snap-always overflow-hidden bg-section"
      >
        <Suspense fallback={<ProductGalleryFallback embedded />}>
          <ProductDepthGallery embedded />
        </Suspense>
      </section>
      <ContactSection />
      <Footer />
    </div>
  );
}
