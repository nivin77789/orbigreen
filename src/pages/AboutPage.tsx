import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import aboutBanner from "@/assets/about-banner.png";

const EASE = [0.16, 1, 0.3, 1] as const;

const CAPABILITIES = [
  {
    t: "Supplier Identification & Qualification",
    d: "Finding and evaluating capable manufacturing partners based on technical, quality, and commercial requirements.",
  },
  {
    t: "Quality Assurance",
    d: "Managing inspections, audits, and compliance processes to ensure consistent product quality.",
  },
  {
    t: "Engineering Coordination",
    d: "Supporting technical reviews, supplier communication, and manufacturing alignment from specification to production.",
  },
  {
    t: "Strategic Procurement",
    d: "Driving competitive sourcing, supplier engagement, and cost-effective procurement execution.",
  },
  {
    t: "Delivery Management",
    d: "Coordinating production schedules, logistics, and deliveries to ensure reliable project execution.",
  },
];

const VALUES = [
  {
    t: "Accountability",
    d: "We take ownership from supplier selection through final delivery. Clear communication and reliable execution underpin every project.",
  },
  {
    t: "Quality First",
    d: "Quality is built into every stage of the sourcing process. We prioritize compliance, consistency, and long-term supplier performance.",
  },
  {
    t: "Transparency",
    d: "We provide clear visibility into sourcing activities, supplier progress, and delivery commitments. Our clients make decisions with confidence, not assumptions.",
  },
  {
    t: "Partnership",
    d: "We work as an extension of our clients' teams, aligning with their objectives and challenges. Success is measured by the value we create together.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: EASE },
  }),
};

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
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] lg:text-[14px] font-bold tabular-nums transition-colors duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "bg-primary/[0.06] text-primary/35 group-hover:text-secondary"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[14px] lg:text-[15px] font-semibold leading-snug tracking-tight ${
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
            <SectionLabel className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Core value
            </SectionLabel>
            <h3 className="mt-4 text-[clamp(1.35rem,2.5vw,1.85rem)] font-semibold leading-snug tracking-tight text-primary">
              {VALUES[activeIndex].t}
            </h3>
            <p className="mt-4 text-[14px] lg:text-[15px] leading-relaxed text-primary/68 sm:text-[15px] lg:text-[16px]">
              {VALUES[activeIndex].d}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-7 sm:top-10" aria-hidden>
        <img
          src={aboutBanner}
          alt=""
          className="h-full w-full object-cover object-[right_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-[42%] via-white/75 via-[58%] to-transparent sm:from-[38%] sm:via-white/55 lg:from-[34%] lg:via-white/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-10 pt-[5.75rem] lg:px-10 lg:pb-14 lg:pt-[6.25rem]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <h1 className="mt-4 whitespace-nowrap text-[clamp(1.45rem,3.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
            About{" "}
            <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              Orbigreen Techsource
            </span>
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed text-primary/75 lg:text-[18px]">
            <p>
              OrbiGreen is a global partner for <strong>integrated industrial sourcing</strong>, delivering engineered
              components, turnkey project solutions, and specialised service offerings through a single, seamless
              interface. Our model unifies supplier development, strategic procurement, and rigorous quality management
              into one resilient ecosystem designed to elevate performance and create enduring value.
            </p>
            <p>
              We support <strong>OEMs, industrial customers, and end-users</strong> across international markets with
              sourcing solutions that combine engineering depth, supply chain intelligence, and uncompromising quality
              governance. From component qualification and vendor onboarding to project execution and final delivery,
              OrbiGreen ensures consistency, compliance, and reliability at every stage of the value chain.
            </p>
            <p>
              Our <strong>single-window delivery framework</strong> enhances process efficiency, accelerates production
              readiness, and strengthens global supply chain resilience. By integrating technical precision with
              worldwide procurement reach, we help customers achieve predictable outcomes, optimise total cost of
              ownership, and scale confidently across borders.
            </p>
          </div>
          <div className="global-presence-heading-line mt-6" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="gradient-border-cta rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Get in Touch
            </Link>
            <Link
              to="/services"
              className="glass-card-light rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold text-primary hover:glass-card-hover"
            >
              Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative">
        <AboutHero />

        <section className="relative border-t border-primary/10 section-spacing">
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
                <SectionLabel animated>Our Story</SectionLabel>
                <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-primary">
                  End-to-End Industrial Sourcing Excellence
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
                    We help industrial companies source globally with confidence by managing the complete sourcing
                    journey — from technical requirements and supplier qualification to quality assurance and delivery.
                  </p>
                  <p className="text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
                    Through a trusted global network of manufacturing partners, we provide reliable sourcing solutions
                    with the visibility, accountability, and execution required to build resilient and cost-effective
                    supply chains.
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
              <SectionLabel animated>A Global Sourcing Partner</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold leading-snug tracking-tight text-primary">
                People, technology, and supplier ecosystems — managed end to end.
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
                  We act as an extension of your team, providing the visibility, control, and predictability needed to
                  manage sourcing and supply chain operations effectively.
                </p>
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
                  By integrating sourcing, quality assurance, and logistics through a single partner, we reduce
                  complexity, mitigate supplier risk, and enable your teams to focus on strategic priorities.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="section-spacing">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-8 max-w-2xl"
            >
              <SectionLabel animated>What We Deliver</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                Core capabilities across the sourcing lifecycle
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
                  <h3 className="mt-3 text-[16px] lg:text-[17px] font-semibold tracking-tight text-primary">{item.t}</h3>
                  <p className="mt-2 text-[13px] lg:text-[14px] leading-relaxed text-primary/65">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-8 max-w-2xl"
            >
              <SectionLabel animated>Our Values</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                The principles that guide every sourcing decision and client engagement.
              </h2>
            </motion.div>

            <ValuesExplorer />
          </div>
        </section>

        <section className="relative border-t border-primary/10 bg-white section-spacing">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EASE }}
              className="about-sourcing-banner relative overflow-hidden rounded-[1.75rem]"
            >
              <div className="about-sourcing-banner__grid pointer-events-none absolute inset-0" aria-hidden />
              <div className="about-sourcing-banner__glow about-sourcing-banner__glow--left pointer-events-none absolute" aria-hidden />
              <div className="about-sourcing-banner__glow about-sourcing-banner__glow--right pointer-events-none absolute" aria-hidden />
              <div className="about-sourcing-banner__line pointer-events-none absolute inset-x-0 top-0" aria-hidden />

              <div className="relative z-10 grid gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:p-11 xl:p-12">
                <div>
                  <p className="about-sourcing-banner__eyebrow text-[11px] font-bold uppercase tracking-[0.28em] text-white/55 sm:text-[12px]">
                    Partner with confidence
                  </p>
                  <h2 className="section-heading mt-3 text-balance text-white">
                    Reliable sourcing{" "}
                    <span className="bg-gradient-to-r from-secondary via-[#7fd44a] to-white bg-clip-text text-transparent">
                      starts here
                    </span>
                  </h2>
                  <div className="about-sourcing-banner__accent mt-5" aria-hidden />
                </div>

                <div>
                  <p className="text-[15px] leading-relaxed text-white/78 sm:text-[16px] lg:text-[17px] lg:leading-[1.65]">
                    A single partner for supplier qualification, quality assurance, procurement, and delivery —
                    managed with transparency and accountability.
                  </p>
                  <ul className="about-sourcing-pillars mt-6 flex flex-wrap gap-2 sm:mt-7">
                    {["Supplier qualification", "Quality assurance", "Procurement", "Delivery"].map((item) => (
                      <li key={item}>
                        <span className="about-sourcing-pillar inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white/92 sm:px-3.5 sm:py-2 sm:text-[12px]">
                          <span className="about-sourcing-pillar__dot h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
              className="about-sourcing-quote relative mx-auto mt-8 max-w-2xl rounded-[1.5rem] p-7 text-center sm:mt-10 sm:p-8"
            >
              <div className="about-sourcing-quote__connector pointer-events-none absolute left-1/2 top-0 hidden h-8 w-px -translate-x-1/2 -translate-y-full sm:block" aria-hidden />
              <h3 className="text-[clamp(1.25rem,2.5vw,1.65rem)] font-semibold tracking-tight text-primary">
                Need a Tailored Sourcing Solution!
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-primary/65 lg:text-[16px]">
                Share your specifications, quantities, and delivery requirements, and we&apos;ll identify qualified
                suppliers and develop a sourcing plan aligned with your project goals.
              </p>
              <Link
                to="/quotation"
                className="gradient-border-cta mt-8 inline-flex rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)] lg:text-[15px]"
              >
                Request Quotation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
