import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import heroBg from "../hero bg image frames/ezgif-frame-040.png";
import imgChina from "../hero bg image frames/ezgif-frame-060.png";
import imgVietnam from "../hero bg image frames/ezgif-frame-090.png";
import imgIndia from "../hero bg image frames/ezgif-frame-120.png";
import imgTurkey from "../hero bg image frames/ezgif-frame-150.png";

const HIGHLIGHTS = [
  {
    t: "Your in-market team",
    d: "Local sourcing and quality support without setting up your own foreign entity.",
  },
  {
    t: "Compliance & QA",
    d: "Audits, inspections, and documentation built into every sourcing program.",
  },
  {
    t: "Multi-market access",
    d: "Diversify supply risk by expanding into multiple sourcing regions.",
  },
  {
    t: "On-the-ground visibility",
    d: "Know who is making your parts, at what cost, and under which conditions.",
  },
];

const MARKETS = [
  {
    country: "China",
    description:
      "Deep manufacturing ecosystem with broad category coverage, tooling strength, and mature supplier networks.",
    image: imgChina,
    services: [
      "Supplier search & qualification",
      "Cost benchmarking",
      "Production monitoring",
      "QA inspections",
    ],
  },
  {
    country: "Vietnam",
    description:
      "Fast-growing manufacturing base with competitive lead times and strong capabilities in assemblies and fabrication.",
    image: imgVietnam,
    services: [
      "Supplier development",
      "Factory audits",
      "In-line & final inspection",
      "Logistics coordination",
    ],
  },
  {
    country: "India",
    description:
      "Strong engineering depth, machining and fabrication capabilities, and scalable industrial supply chains.",
    image: imgIndia,
    services: [
      "Engineering review (DFM)",
      "Machining & fabrication",
      "Quality documentation",
      "Delivery tracking",
    ],
  },
  {
    country: "Turkey",
    description:
      "Strategic near-shore option for Europe with flexible production and expanding industrial capacity.",
    image: imgTurkey,
    services: [
      "Regional diversification",
      "Shorter transit times",
      "Compliance support",
      "Supplier negotiations",
    ],
  },
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

export default function SourcingMarketsPage() {
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
              <SectionLabel>Global Reach</SectionLabel>
              <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                Sourcing Markets
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/70">
                Access trusted suppliers across key manufacturing regions with on-the-ground sourcing and quality
                support.
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
                  to="/products"
                  className="glass-card-light rounded-full px-6 py-3 text-[13px] font-semibold text-primary transition-all hover:glass-card-hover"
                >
                  View Products
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
                  alt="Global sourcing markets"
                  className="h-[280px] w-full object-cover object-center lg:h-[340px]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="relative border-t border-primary/10 bg-white py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="mx-auto grid max-w-[1280px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.t}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="glass-card-light group rounded-2xl p-6 transition-all duration-500 ease-out hover:glass-card-hover"
              >
                <span className="text-[10px] tabular-nums tracking-widest text-primary/35 transition-colors group-hover:text-secondary">
                  0{i + 1}
                </span>
                <h2 className="mt-2 text-[16px] font-semibold tracking-tight text-primary">{item.t}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-primary/65">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Market coverage */}
        <section className="py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 max-w-3xl"
            >
              <SectionLabel>Coverage</SectionLabel>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.5rem)] font-semibold leading-snug tracking-tight text-primary">
                Build a resilient multi-market supply base
              </h2>
            </motion.div>

            <div className="space-y-10">
              {MARKETS.map((market, i) => (
                <motion.article
                  key={market.country}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className={`glass-card-light group grid overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:glass-card-hover lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[220px] overflow-hidden lg:min-h-[280px]">
                    <motion.img
                      src={market.image}
                      alt={`${market.country} sourcing market`}
                      className="h-full w-full object-cover object-center"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/35 via-primary/10 to-transparent lg:bg-gradient-to-t lg:from-primary/45 lg:via-transparent lg:to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <span className="rounded-full glass-nav px-3 py-1 text-[11px] font-semibold tracking-widest text-primary">
                        {market.country}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-body/80">Market</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-7 lg:p-9">
                    <h3 className="text-[clamp(1.35rem,2vw,1.75rem)] font-semibold tracking-tight text-primary">
                      {market.country}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-primary/65">{market.description}</p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {market.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-3 py-2 text-[12px] text-primary/75 backdrop-blur-sm transition-colors group-hover:border-secondary/25 group-hover:bg-white/80"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/#contact"
                      className="gradient-border-cta mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all hover:shadow-[0_0_28px_-4px_rgba(92,191,42,0.45)]"
                    >
                      Explore {market.country}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Map-style stats */}
        <section className="border-t border-primary/10 bg-white py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-6 md:grid-cols-4 lg:px-10"
          >
            {MARKETS.map((market, i) => (
              <motion.div
                key={market.country}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card-light rounded-2xl p-5 text-center transition-all duration-500 hover:glass-card-hover"
              >
                <div className="text-[11px] uppercase tracking-[0.25em] text-secondary">Active Market</div>
                <div className="mt-2 text-[1.35rem] font-semibold tracking-tight text-primary">{market.country}</div>
                <div className="mt-1 text-[12px] text-primary/55">{market.services.length} capabilities</div>
              </motion.div>
            ))}
          </motion.div>
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
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
              Expand into the right markets for your product
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-primary/70">
              Tell us your category, volumes, and target regions — we'll map the best sourcing markets and supplier
              options for your program.
            </p>
            <Link
              to="/#contact"
              className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Discuss your requirement
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
