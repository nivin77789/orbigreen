import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

const CAPABILITIES = [
  {
    t: "Supplier Sourcing",
    d: "Global network of vetted industrial suppliers and strategic partnerships across multiple regions.",
  },
  {
    t: "Quality Management",
    d: "Rigorous quality control, inspections, and compliance at every stage of the supply chain.",
  },
  {
    t: "Engineering Coordination",
    d: "Technical expertise across manufacturing domains from design to production.",
  },
  {
    t: "Procurement",
    d: "Streamlined procurement processes and strategic sourcing for cost efficiency.",
  },
  {
    t: "Delivery Management",
    d: "On-time logistics, shipping coordination, and end-to-end supply chain management.",
  },
];

const VALUES = [
  {
    t: "Results-Driven",
    d: "We focus on measurable outcomes — cost savings, lead time reduction, and quality improvement for every engagement.",
  },
  {
    t: "Global Mindset",
    d: "We think and operate across borders, connecting you with the right suppliers and solutions wherever they are.",
  },
  {
    t: "Integrity & Transparency",
    d: "We build long-term relationships on trust, clear communication, and ethical practices in every transaction.",
  },
  {
    t: "Agility",
    d: "We adapt quickly to changing requirements, market conditions, and your evolving business needs.",
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Understand & Plan",
    d: "We start by understanding your requirements, volumes, quality standards, and timelines. From there we define scope, identify risks, and agree on a clear plan.",
  },
  {
    n: "02",
    t: "Source & Qualify",
    d: "We tap our global network to source and qualify suppliers, run technical and commercial evaluations, and recommend the best fit for your project.",
  },
  {
    n: "03",
    t: "Execute & Assure Quality",
    d: "We coordinate production, manage quality inspections and audits, and keep you updated at every stage so you stay in control without the operational burden.",
  },
  {
    n: "04",
    t: "Deliver & Support",
    d: "We manage logistics and delivery to your door, and support installation and commissioning when needed. Our relationship continues with ongoing supply and continuous improvement.",
  },
];

const STATS = [
  { label: "Core capabilities", value: "5" },
  { label: "Service offerings", value: "6" },
  { label: "Product categories", value: "10" },
  { label: "Sourcing markets", value: "4+" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: EASE },
  }),
};

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.15em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
      className="inline-block text-[10px] uppercase tracking-[0.3em] text-secondary"
    >
      {children}
    </motion.span>
  );
}

function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="metrics-section-grid absolute inset-0 opacity-60" />
      <div className="absolute -left-[10%] top-[8%] h-[40vh] w-[40vw] rounded-full bg-primary/[0.06] blur-[90px]" />
      <div className="absolute -right-[8%] bottom-[12%] h-[36vh] w-[36vw] rounded-full bg-secondary/[0.08] blur-[80px]" />
    </div>
  );
}

function StatsBand() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="metrics-band relative w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={i}
            className="group relative px-4 py-6 text-center sm:px-5 sm:py-7 lg:px-6 lg:py-8"
          >
            {i > 0 && (
              <span
                className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/15 to-transparent lg:block"
                aria-hidden
              />
            )}
            <motion.div
              className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-none tracking-tight text-transparent"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              {stat.value}
            </motion.div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/65">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="metrics-band-shine absolute inset-x-0 top-0 h-px"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function ValuesExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      <div className="flex flex-col gap-2.5">
        {VALUES.map((value, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={value.t}
              type="button"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              onClick={() => setActiveIndex(i)}
              whileHover={{ x: isActive ? 0 : 4 }}
              className={`highlight-pill group relative flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-500 sm:px-5 ${
                isActive
                  ? "highlight-pill--active shadow-[0_12px_40px_-14px_rgba(11,95,126,0.2)]"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold tabular-nums transition-colors duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "bg-primary/[0.06] text-primary/35 group-hover:text-secondary"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[14px] font-semibold leading-snug tracking-tight ${
                  isActive ? "text-primary" : "text-primary/75"
                }`}
              >
                {value.t}
              </span>
              {isActive && (
                <motion.div
                  layoutId="about-value-bar"
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-secondary to-accent sm:left-5 sm:right-5"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        variants={fadeUp}
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="highlight-panel relative min-h-[220px] overflow-hidden rounded-[1.5rem] p-6 sm:p-7 lg:p-8"
      >
        <div className="highlight-panel-grid absolute inset-0 opacity-50" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative z-10"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Core value
            </span>
            <h3 className="mt-4 text-[clamp(1.35rem,2.5vw,1.85rem)] font-semibold leading-snug tracking-tight text-primary">
              {VALUES[activeIndex].t}
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-primary/68 sm:text-[15px]">
              {VALUES[activeIndex].d}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-4 left-[1.65rem] top-4 hidden w-px bg-gradient-to-b from-secondary/50 via-primary/15 to-transparent lg:block" />

      <div className="space-y-5">
        {PROCESS.map((step, i) => (
          <motion.article
            key={step.n}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="glass-card-light group relative grid gap-5 rounded-3xl p-6 transition-all duration-500 ease-out hover:glass-card-hover sm:p-7 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-8 lg:p-8"
          >
            <div className="relative z-10 flex items-center gap-4 lg:flex-col lg:items-center lg:gap-3">
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-[15px] font-bold tabular-nums text-white shadow-[0_8px_24px_-8px_rgba(11,95,126,0.45)]"
                whileHover={{ scale: 1.06, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                {step.n}
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary lg:text-center">
                Step {step.n}
              </span>
            </div>

            <div>
              <h3 className="text-[clamp(1.2rem,2vw,1.55rem)] font-semibold tracking-tight text-primary">
                {step.t}
              </h3>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-primary/65 sm:text-[15px]">
                {step.d}
              </p>
              <motion.div
                className="mt-5 h-0.5 max-w-[120px] origin-left rounded-full bg-gradient-to-r from-secondary to-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative pt-28">
        {/* Hero */}
        <section className="relative mx-auto max-w-[1280px] px-6 pb-16 lg:px-10 lg:pb-20">
          <PageBackground />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative max-w-3xl"
          >
            <SectionLabel>Who we are</SectionLabel>
            <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              About{" "}
              <span className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
                Orbigreen Techsource
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
              className="mt-4 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-secondary to-accent"
            />
            <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/70">
              Integrated sourcing for industrial engineering — combining supplier networks, procurement, and quality
              management to improve supply chain efficiency. We support OEMs worldwide with a single-window approach
              from components to delivery.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="gradient-border-cta rounded-full px-6 py-3 text-[13px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
              >
                Get in Touch
              </Link>
              <Link
                to="/services"
                className="glass-card-light rounded-full px-6 py-3 text-[13px] font-semibold text-primary transition-all hover:glass-card-hover"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Story + Partner */}
        <section className="relative border-t border-primary/10 py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="mx-auto grid max-w-[1280px] gap-6 px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
            <motion.article
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="highlight-panel relative overflow-hidden rounded-[1.5rem] p-7 lg:p-9"
            >
              <div className="highlight-panel-grid absolute inset-0 opacity-40" aria-hidden />
              <div className="relative z-10">
                <SectionLabel>Our Story</SectionLabel>
                <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-primary">
                  Why we exist
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="text-[15px] leading-relaxed text-primary/70">
                    We were built on a simple idea: industrial companies need one partner for the full complexity of
                    global sourcing — from drawing intake and supplier identification to quality assurance and on-time
                    delivery — without managing multiple vendors alone.
                  </p>
                  <p className="text-[15px] leading-relaxed text-primary/70">
                    We operate as a global sourcing partner, not a manufacturer. Our network manages your supply chain
                    with visibility and predictability.
                  </p>
                </div>
              </div>
            </motion.article>

            <motion.article
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="glass-card-light relative overflow-hidden rounded-[1.5rem] p-7 transition-all duration-500 hover:glass-card-hover lg:p-9"
            >
              <SectionLabel>A Global Sourcing Partner</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold leading-snug tracking-tight text-primary">
                People, technology, and supplier ecosystems — managed end to end.
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-[15px] leading-relaxed text-primary/70">
                  Our approach enables better visibility, scalability, and operational predictability across procurement
                  and supply chain operations. We work as an extension of your team.
                </p>
                <p className="text-[15px] leading-relaxed text-primary/70">
                  By centralizing sourcing, quality, and logistics through a single partner, you reduce complexity,
                  mitigate supplier risk, and free internal teams to focus on core product development.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-10 max-w-2xl"
            >
              <SectionLabel>What we deliver</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                Core capabilities across your supply chain
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((item, i) => (
                <motion.div
                  key={item.t}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="glass-card-light group rounded-2xl p-6 transition-all duration-500 ease-out hover:glass-card-hover"
                >
                  <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold tabular-nums leading-none text-primary/25 transition-colors duration-500 group-hover:text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-primary">{item.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-primary/65">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-primary/10 py-14 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <StatsBand />
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-10 max-w-2xl"
            >
              <SectionLabel>Our Values</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                The principles that guide how we work every day
              </h2>
            </motion.div>

            <ValuesExplorer />
          </div>
        </section>

        {/* Process */}
        <section className="relative border-t border-primary/10 bg-white py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-10 max-w-2xl"
            >
              <SectionLabel>How We Work With You</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                A collaborative, transparent process from first contact to final delivery
              </h2>
            </motion.div>

            <ProcessTimeline />
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-primary/10 py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(92,191,42,0.06),transparent)]" />
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto max-w-[1280px] px-6 text-center lg:px-10"
          >
            <SectionLabel>Partner With Us</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
              Discover how our integrated sourcing approach can transform your supply chain
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-primary/65">
              Better visibility, lower risk, and a single partner you can rely on — from first quote to final delivery.
            </p>
            <Link
              to="/contact"
              className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
