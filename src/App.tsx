import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HeroFrameCanvas } from "@/components/HeroFrameCanvas";

const NAV = ["Home", "Services", "Products", "Sourcing Markets", "Resources", "About"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-white/95">
          Orbigreen <span className="font-normal text-white/55">Techsource</span>
        </a>
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[13px] font-medium text-white/65 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <a
            href="#contact"
            className="gradient-border-cta rounded-full px-5 py-2 text-[13px] font-medium text-white transition-all hover:shadow-[0_0_30px_-5px_rgba(0,255,135,0.5)]"
          >
            Get Quote
          </a>
        </div>
      </div>
    </header>
  );
}

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
      <div className="h-10 w-px bg-gradient-to-b from-[color:var(--lime-electric)] to-transparent" />
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
      t: "Consultancy & Advisory",
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
        <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--lime-electric)]">
          By the Numbers
        </span>
        <h3 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-white/95">
          Engineered scale.
          <br />
          Measured impact.
        </h3>
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
          {metrics.map((m) => (
            <div key={m.l}>
              <div className="bg-gradient-to-br from-white to-[color:var(--lime-electric)] bg-clip-text text-[2.5rem] font-semibold tracking-tight text-transparent">
                {m.n}
              </div>
              <div className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/50">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="services" className="lg:col-span-7 lg:pl-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--lime-electric)]">
          Our Services
        </span>
        <h3 className="mt-4 text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium leading-snug tracking-tight text-white/90">
          Comprehensive industrial sourcing and engineering solutions tailored to scale operations and mitigate
          risks.
        </h3>
        <div className="mt-8 grid gap-3">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-[color:var(--lime-electric)]/40 hover:bg-white/[0.03]"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h4 className="text-[15px] font-semibold tracking-tight text-white/95">{s.t}</h4>
                <span className="text-[10px] tabular-nums tracking-widest text-white/30">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{s.d}</p>
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
      <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--lime-electric)]">
        How We Work
      </span>
      <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-white/95">
        A clear, engineered
        <br />
        sourcing workflow.
      </h3>
      <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/55">
        From the first drawing to final delivery, Orbigreen Techsource follows a structured process that keeps
        cost, quality, and timelines under control.
      </p>
      <ol className="mt-10 space-y-5">
        {steps.map((s, i) => (
          <li key={s.t} className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/[0.06] pt-5">
            <span className="text-[28px] font-semibold tabular-nums tracking-tight text-[color:var(--lime-electric)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="text-[15px] font-semibold tracking-tight text-white/95">{s.t}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-white/55">{s.d}</p>
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
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--lime-electric)] shadow-[0_0_10px_var(--lime-electric)]" />
        Orbigreen Techsource
      </span>
      <h1 className="mt-6 text-balance text-[clamp(2.5rem,6.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white/90">
        Industrial Sourcing{" "}
        <span className="bg-gradient-to-br from-white via-white to-[color:var(--lime-electric)] bg-clip-text text-transparent">
          Excellence.
        </span>
      </h1>
      <p className="mt-5 text-[clamp(1.1rem,1.5vw,1.35rem)] font-light tracking-tight text-white/70">
        Smart. Sustainable. Sourcing.
      </p>
      <p className="mx-auto mt-5 max-w-xl text-pretty text-[14px] leading-relaxed text-white/55">
        Your single-window sourcing solution for industrial engineering machinery, parts, and services — delivering
        sustainable supply solutions worldwide.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#services"
          className="gradient-border-cta rounded-full px-6 py-3 text-[13px] font-medium text-white transition-all hover:shadow-[0_0_40px_-5px_rgba(0,255,135,0.5)]"
        >
          Our Services
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/15 px-6 py-3 text-[13px] font-medium text-white/85 transition-all hover:border-white/35 hover:bg-white/[0.04]"
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
      <h2 className="text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] text-white/95">
        Ready to Optimize
        <br />
        <span className="bg-gradient-to-br from-white to-[color:var(--lime-electric)] bg-clip-text text-transparent">
          Your Supply Chain?
        </span>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">
        Let's discuss how Orbigreen Techsource can streamline your sourcing and secure your procurement process.
      </p>
    </motion.div>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative border-t border-white/[0.06] bg-[#050505] py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--lime-electric)]/40 to-transparent" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--lime-electric)]">
            Contact Us Today
          </span>
          <h3 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-tight text-white/95">
            Let's build your
            <br />
            supply advantage.
          </h3>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">Phone</dt>
              <dd className="mt-1 text-[16px] font-medium text-white/90">+91 98883 38615</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">Email</dt>
              <dd className="mt-1 text-[16px] font-medium text-white/90">info@orbigreen.com</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">Office</dt>
              <dd className="mt-1 max-w-xs text-[14px] leading-relaxed text-white/70">
                SCO 26, First Floor, Saraswati Vihar,
                <br />
                Dhakoli, Zirakpur, Punjab – 160104, India
              </dd>
            </div>
          </dl>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 2800);
          }}
          className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-8 backdrop-blur-sm"
        >
          <label className="text-[10px] uppercase tracking-[0.25em] text-white/40">Quick contact</label>
          <input
            required
            placeholder="Full name"
            className="border-b border-white/10 bg-transparent py-3 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[color:var(--lime-electric)]"
          />
          <input
            required
            type="email"
            placeholder="Work email"
            className="border-b border-white/10 bg-transparent py-3 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[color:var(--lime-electric)]"
          />
          <textarea
            required
            rows={4}
            placeholder="Tell us about your sourcing requirement"
            className="resize-none border-b border-white/10 bg-transparent py-3 text-[15px] text-white placeholder-white/35 outline-none transition-colors focus:border-[color:var(--lime-electric)]"
          />
          <button
            type="submit"
            className="gradient-border-cta group mt-4 inline-flex items-center justify-center gap-2 self-start rounded-full px-7 py-3 text-[13px] font-medium text-white transition-all hover:shadow-[0_0_40px_-5px_rgba(0,255,135,0.5)]"
          >
            <span>{sent ? "Sent" : "Send"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-transform duration-500 ${sent ? "translate-x-3 opacity-0" : "group-hover:translate-x-1"}`}
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050505] py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-6 text-[12px] md:grid-cols-4 lg:px-10">
        <div>
          <div className="text-[14px] font-semibold tracking-tight text-white/90">
            Orbigreen <span className="font-normal text-white/50">Techsource</span>
          </div>
          <p className="mt-3 max-w-xs leading-relaxed text-white/45">Smart. Sustainable. Sourcing.</p>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-white/40">Quick Links</h5>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>
              <a href="#top" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#resources" className="hover:text-white">
                Resources
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-white/40">Services</h5>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>Global Sourcing</li>
            <li>Engineering</li>
            <li>Quality & Inspection</li>
            <li>Site & Installation</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-white/40">Reach</h5>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>+91 98883 38615</li>
            <li>info@orbigreen.com</li>
            <li>Zirakpur, Punjab</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-white/[0.05] px-6 pt-6 text-[11px] text-white/35 lg:px-10">
        © 2026 Orbigreen Techsource. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
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
    [0, 0.35, 0.45, 0.45, 0.2],
  );

  return (
    <div id="top" className="relative bg-[#050505] text-white">
      <Nav />

      <section ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroFrameCanvas progressRef={progressRef} />

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/10 to-[#050505]/60"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_50%,#050505_100%)]" />

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

      <ContactSection />
      <Footer />
    </div>
  );
}
