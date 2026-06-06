import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import imgConsultancy from "../hero bg image frames/ezgif-frame-018.png";
import imgSourcing from "../hero bg image frames/ezgif-frame-048.png";
import imgEngineering from "../hero bg image frames/ezgif-frame-078.png";
import imgQuality from "../hero bg image frames/ezgif-frame-108.png";
import imgSite from "../hero bg image frames/ezgif-frame-138.png";
import heroBg from "../hero bg image frames/ezgif-frame-012.png";

const SERVICES = [
  {
    t: "Consultancy & Advisory",
    d: "Professional consulting services to help businesses optimize procurement and sourcing.",
    image: imgConsultancy,
    items: [
      "Supply chain strategy",
      "Procurement advisory",
      "Cost optimization",
      "Supplier evaluation",
      "Sourcing transformation",
    ],
  },
  {
    t: "Global Sourcing",
    d: "International sourcing solutions to connect you with the best suppliers worldwide.",
    image: imgSourcing,
    items: [
      "Supplier identification",
      "Vendor qualification",
      "Procurement management",
      "Cost-effective sourcing",
    ],
  },
  {
    t: "Engineering Services",
    d: "Engineering support for manufacturing projects from concept to production.",
    image: imgEngineering,
    items: [
      "Design engineering",
      "Technical evaluation",
      "Product development",
      "Manufacturing engineering",
    ],
  },
  {
    t: "Quality & Inspection Services",
    d: "Quality assurance throughout the supply chain ensuring compliance and excellence.",
    image: imgQuality,
    items: [
      "Factory inspection",
      "Production monitoring",
      "Quality audits",
      "Compliance checks",
    ],
  },
  {
    t: "Site & Installation Services",
    d: "Support during project implementation for smooth, on-time delivery.",
    image: imgSite,
    items: [
      "On-site supervision",
      "Equipment installation",
      "Commissioning",
      "Operational support",
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

export default function ServicesPage() {
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
              <SectionLabel>What We Offer</SectionLabel>
              <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                Our Services
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/70">
                Comprehensive industrial sourcing, engineering, and quality solutions designed to optimize your
                operations.
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
                  to="/sourcing-markets"
                  className="glass-card-light rounded-full px-6 py-3 text-[13px] font-semibold text-primary transition-all hover:glass-card-hover"
                >
                  Explore Markets
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
                  alt="Industrial sourcing visualization"
                  className="h-[280px] w-full object-cover object-center lg:h-[340px]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Service cards */}
        <section className="relative border-t border-primary/10 bg-white py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="mx-auto max-w-[1280px] space-y-10 px-6 lg:px-10">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.t}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className={`glass-card-light group grid overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:glass-card-hover lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[220px] overflow-hidden lg:min-h-[300px]">
                  <motion.img
                    src={service.image}
                    alt={service.t}
                    className="h-full w-full object-cover object-center"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent lg:bg-gradient-to-t lg:from-primary/40 lg:via-transparent lg:to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full glass-nav px-3 py-1 text-[11px] font-semibold tabular-nums tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col justify-between p-7 lg:p-9">
                  <div>
                    <h2 className="text-[clamp(1.35rem,2vw,1.65rem)] font-semibold tracking-tight text-primary">
                      {service.t}
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-primary/65">{service.d}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-primary/10 bg-white/60 px-3 py-1.5 text-[12px] text-primary/75 backdrop-blur-sm transition-colors group-hover:border-secondary/25 group-hover:bg-white/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/#contact"
                    className="gradient-border-cta mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all hover:shadow-[0_0_28px_-4px_rgba(92,191,42,0.45)]"
                  >
                    Learn More
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-t border-primary/10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-6 md:grid-cols-4 lg:px-10"
          >
            {[
              { n: "500+", l: "Projects" },
              { n: "50+", l: "Global Clients" },
              { n: "15+", l: "Years" },
              { n: "100%", l: "Quality Focus" },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card-light rounded-2xl p-6 text-center transition-all duration-500 hover:glass-card-hover"
              >
                <div className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-[2rem] font-semibold tracking-tight text-transparent">
                  {stat.n}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-primary/55">{stat.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-primary/10 bg-white py-28">
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
              Ready to optimize your sourcing operations?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-primary/70">
              Tell us about your project requirements — we'll recommend the right combination of sourcing,
              engineering, and quality services for your program.
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
