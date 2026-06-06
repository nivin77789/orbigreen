import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import heroBg from "../hero bg image frames/ezgif-frame-006.png";
import imgStory from "../hero bg image frames/ezgif-frame-030.png";
import imgPartner from "../hero bg image frames/ezgif-frame-054.png";
import imgProcess1 from "../hero bg image frames/ezgif-frame-072.png";
import imgProcess2 from "../hero bg image frames/ezgif-frame-102.png";
import imgProcess3 from "../hero bg image frames/ezgif-frame-132.png";
import imgProcess4 from "../hero bg image frames/ezgif-frame-168.png";

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
    n: "1",
    t: "Understand & Plan",
    d: "We start by understanding your requirements, volumes, quality standards, and timelines. From there we define scope, identify risks, and agree on a clear plan.",
    image: imgProcess1,
  },
  {
    n: "2",
    t: "Source & Qualify",
    d: "We tap our global network to source and qualify suppliers, run technical and commercial evaluations, and recommend the best fit for your project.",
    image: imgProcess2,
  },
  {
    n: "3",
    t: "Execute & Assure Quality",
    d: "We coordinate production, manage quality inspections and audits, and keep you updated at every stage so you stay in control without the operational burden.",
    image: imgProcess3,
  },
  {
    n: "4",
    t: "Deliver & Support",
    d: "We manage logistics and delivery to your door, and support installation and commissioning when needed. Our relationship continues with ongoing supply and continuous improvement.",
    image: imgProcess4,
  },
];

const STATS = [
  { label: "Core capabilities", value: "5" },
  { label: "Sourcing markets", value: "4+" },
  { label: "Engagement model", value: "Single-window" },
  { label: "Client focus", value: "Global OEMs" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">{children}</span>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="pt-28">
        {/* Hero */}
        <section className="relative mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
          <div className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[90px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Who we are</SectionLabel>
              <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                About Orbigreen Techsource
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/70">
                Integrated sourcing for industrial engineering — combining supplier networks, procurement, and quality
                management to improve supply chain efficiency. We support OEMs worldwide with a single-window approach
                from components to delivery.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/#contact"
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

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light relative overflow-hidden rounded-3xl p-2"
            >
              <div className="overflow-hidden rounded-[1.25rem]">
                <img
                  src={heroBg}
                  alt="Orbigreen Techsource industrial sourcing"
                  className="h-[280px] w-full object-cover object-center lg:h-[340px]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="relative border-t border-primary/10 bg-white py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="glass-card-light group grid overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:glass-card-hover lg:grid-cols-2"
            >
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <SectionLabel>Our Story</SectionLabel>
                <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                  Why we exist
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="text-[15px] leading-relaxed text-primary/70">
                    We were built on a simple idea: industrial companies need one partner for the full complexity of
                    global sourcing — from drawing intake and supplier identification to quality assurance and on-time
                    delivery — without managing multiple vendors alone.
                  </p>
                  <p className="text-[15px] leading-relaxed text-primary/70">
                    We operate as a global sourcing partner, not a manufacturer. Our network of people, technology, and
                    supplier ecosystems manages your supply chain with visibility and predictability.
                  </p>
                </div>
              </div>

              <div className="relative min-h-[260px] overflow-hidden lg:min-h-[360px]">
                <motion.img
                  src={imgStory}
                  alt="Our story"
                  className="h-full w-full object-cover object-center"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/35 via-primary/10 to-transparent" />
              </div>
            </motion.article>
          </div>
        </section>

        {/* Global Sourcing Partner */}
        <section className="py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="glass-card-light group grid overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:glass-card-hover lg:grid-cols-2 lg:[&>*:first-child]:order-2"
            >
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <SectionLabel>A Global Sourcing Partner</SectionLabel>
                <h2 className="mt-3 text-[clamp(1.35rem,2.5vw,2.1rem)] font-semibold leading-snug tracking-tight text-primary">
                  We combine people, technology, and supplier ecosystems to manage your entire supply chain — from
                  strategy and sourcing to quality and delivery.
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="text-[15px] leading-relaxed text-primary/70">
                    Our approach enables businesses to gain better visibility, scalability, and operational predictability
                    across their procurement and supply chain operations. We work as an extension of your team, aligning
                    our processes with your goals and timelines.
                  </p>
                  <p className="text-[15px] leading-relaxed text-primary/70">
                    By centralizing sourcing, quality management, and logistics through a single partner, you reduce
                    complexity, mitigate supplier risk, and free your internal teams to focus on core product and business
                    development.
                  </p>
                </div>
              </div>

              <div className="relative min-h-[260px] overflow-hidden lg:min-h-[360px]">
                <motion.img
                  src={imgPartner}
                  alt="Global sourcing partner"
                  className="h-full w-full object-cover object-center"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/35 via-primary/10 to-transparent" />
              </div>
            </motion.article>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((item, i) => (
                <motion.div
                  key={item.t}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="glass-card-light group rounded-2xl p-6 transition-all duration-500 ease-out hover:glass-card-hover lg:last:col-span-1"
                >
                  <span className="text-[10px] tabular-nums tracking-widest text-primary/35 transition-colors group-hover:text-secondary">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-primary">{item.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-primary/65">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-primary/10 bg-white py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-6 md:grid-cols-4 lg:px-10"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card-light rounded-2xl p-5 text-center transition-all duration-500 hover:glass-card-hover"
              >
                <div className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-primary">{stat.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-primary/55">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 max-w-3xl"
            >
              <SectionLabel>Our Values</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                The principles that guide how we work with clients and suppliers every day.
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.t}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="glass-card-light group rounded-2xl p-6 transition-all duration-500 ease-out hover:glass-card-hover"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-[12px] font-semibold text-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold tracking-tight text-primary">{v.t}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-primary/65">{v.d}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="border-t border-primary/10 bg-white py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 max-w-2xl"
            >
              <SectionLabel>How We Work With You</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
                A collaborative, transparent process from first contact to final delivery.
              </h2>
            </motion.div>

            <div className="space-y-8">
              {PROCESS.map((step, i) => (
                <motion.article
                  key={step.n}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className={`glass-card-light group grid overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:glass-card-hover lg:grid-cols-[1fr_1.1fr] ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[200px] overflow-hidden lg:min-h-[240px]">
                    <motion.img
                      src={step.image}
                      alt={step.t}
                      className="h-full w-full object-cover object-center"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/15 to-transparent" />
                    <span className="absolute left-5 top-5 text-[48px] font-semibold tabular-nums leading-none tracking-tight text-body/90">
                      {step.n}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-7 lg:p-9">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-secondary">Step {step.n}</span>
                    <h3 className="mt-2 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-tight text-primary">
                      {step.t}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-primary/65">{step.d}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-primary/10 py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(92,191,42,0.06),transparent)]" />
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-[1280px] px-6 text-center lg:px-10"
          >
            <SectionLabel>Partner With Us</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
              Discover how our integrated sourcing approach can transform your supply chain — with better visibility,
              lower risk, and a single partner you can rely on.
            </h2>
            <Link
              to="/#contact"
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
