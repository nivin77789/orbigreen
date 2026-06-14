import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import sourcingMarketsBanner from "@/assets/sourcing-markets-banner.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_STATS = [
  { value: "4", label: "Active markets" },
  { value: "500+", label: "Supplier network" },
  { value: "50+", label: "Global clients" },
  { value: "15+", label: "Years experience" },
];

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
    <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-secondary">{children}</span>
  );
}

function SourcingMarketsHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={sourcingMarketsBanner}
          alt=""
          className="h-full w-full object-cover object-[65%_center] sm:object-[right_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-30% via-white/92 to-white/40 sm:from-35% lg:via-white/72 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-10 pt-[5.75rem] lg:px-10 lg:pb-14 lg:pt-[6.25rem]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <SectionLabel>Global Reach</SectionLabel>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Sourcing{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Markets
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] lg:text-[18px] leading-relaxed text-primary/75">
              Access trusted suppliers across key manufacturing regions with on-the-ground sourcing and quality
              support.
            </p>
            <div className="global-presence-heading-line mt-6" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/quotation"
                className="gradient-border-cta rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
              >
                Request Quotation
              </Link>
              <Link
                to="/global-presence"
                className="glass-card-light rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold text-primary hover:glass-card-hover"
              >
                Global Network
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {MARKETS.map((market, i) => (
                <motion.span
                  key={market.country}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="global-hero-stat rounded-full px-3 py-1.5 text-[11px] lg:text-[12px] font-semibold text-primary/80"
                >
                  {market.country}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: EASE }}
            className="grid grid-cols-2 gap-3 lg:max-w-md lg:justify-self-end"
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.55, ease: EASE }}
                whileHover={{ y: -3 }}
                className="global-hero-stat rounded-2xl px-4 py-5 text-center transition-all sm:px-5 sm:py-6"
              >
                <AnimatedStatValue
                  value={stat.value}
                  immediate
                  delay={0.2 + i * 0.08}
                  className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold leading-none text-transparent"
                />
                <div className="mt-2 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-primary/55">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function SourcingMarketsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main>
        <SourcingMarketsHero />

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
                <span className="text-[10px] lg:text-[11px] tabular-nums tracking-widest text-primary/35 transition-colors group-hover:text-secondary">
                  0{i + 1}
                </span>
                <h2 className="mt-2 text-[16px] lg:text-[17px] font-semibold tracking-tight text-primary">{item.t}</h2>
                <p className="mt-2 text-[13px] lg:text-[14px] leading-relaxed text-primary/65">{item.d}</p>
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

            <div className="grid gap-6 lg:grid-cols-2">
              {MARKETS.map((market, i) => (
                <motion.article
                  key={market.country}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="glass-card-light group flex flex-col rounded-3xl p-7 transition-all duration-500 ease-out hover:glass-card-hover lg:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full glass-nav px-3 py-1 text-[11px] lg:text-[12px] font-semibold tracking-widest text-primary">
                      {market.country}
                    </span>
                    <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.25em] text-primary/45">Market</span>
                  </div>

                  <h3 className="mt-5 text-[clamp(1.35rem,2vw,1.75rem)] font-semibold tracking-tight text-primary">
                    {market.country}
                  </h3>
                  <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-primary/65">{market.description}</p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {market.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-3 py-2 text-[12px] lg:text-[13px] text-primary/75 backdrop-blur-sm transition-colors group-hover:border-secondary/25 group-hover:bg-white/80"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        {service}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/quotation"
                    className="gradient-border-cta mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.15em] transition-all hover:shadow-[0_0_28px_-4px_rgba(92,191,42,0.45)]"
                  >
                    Explore {market.country}
                    <span aria-hidden>→</span>
                  </Link>
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
                <div className="text-[11px] lg:text-[12px] uppercase tracking-[0.25em] text-secondary">Active Market</div>
                <div className="mt-2 text-[1.35rem] font-semibold tracking-tight text-primary">{market.country}</div>
                <div className="mt-1 text-[12px] lg:text-[13px] text-primary/55">{market.services.length} capabilities</div>
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
            <p className="mx-auto mt-5 max-w-2xl text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
              Tell us your category, volumes, and target regions — we'll map the best sourcing markets and supplier
              options for your program.
            </p>
            <Link
              to="/quotation"
              className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
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
