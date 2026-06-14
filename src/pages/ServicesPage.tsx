import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tilt3DCard } from "@/components/Tilt3DCard";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import { SERVICES } from "@/data/servicesData";
import servicesBanner from "@/assets/services-banner.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_STATS = [
  { value: "6", label: "Core services" },
  { value: "4+", label: "Sourcing markets" },
  { value: "500+", label: "Projects delivered" },
  { value: "15+", label: "Years experience" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32, rotateX: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const cardReveal = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    y: 48,
    rotateX: 22,
    rotateY: i % 2 === 0 ? -10 : 10,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-secondary"
    >
      {children}
    </motion.span>
  );
}

function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={servicesBanner}
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
            <SectionLabel>What We Offer</SectionLabel>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Our{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] lg:text-[18px] leading-relaxed text-primary/75">
              Comprehensive industrial sourcing, engineering, and quality solutions designed to optimize your
              operations end to end.
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
                to="/sourcing-markets"
                className="glass-card-light rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold text-primary hover:glass-card-hover"
              >
                Explore Markets
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {SERVICES.map((s, i) => (
                <motion.span
                  key={s.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="global-hero-stat rounded-full px-3 py-1.5 text-[11px] lg:text-[12px] font-semibold text-primary/80"
                >
                  {s.title.replace(/,.*/, "").replace(/\s*&.*$/, "").trim()}
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

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative [perspective:1600px]">
        <ServicesHero />

        {/* Service cards */}
        <section className="relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-14 max-w-[1280px] px-6 lg:px-10"
          >
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
              End-to-end support across your supply chain
            </h2>
          </motion.div>

          <div className="mx-auto max-w-[1280px] space-y-12 px-6 lg:px-10">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardReveal}
                className="[perspective:1600px]"
              >
                <Tilt3DCard depth={8} className="h-full">
                  <article
                    className={`glass-card-light group relative grid h-[640px] overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:glass-card-hover sm:h-[600px] lg:h-[400px] lg:grid-cols-2 [transform:translateZ(0)] [transform-style:preserve-3d] ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(600px circle at 30% 50%, ${service.accent}18, transparent 60%)`,
                      }}
                    />

                    <div className="relative h-[260px] shrink-0 overflow-hidden sm:h-[280px] lg:h-full [transform:translateZ(12px)]">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        whileHover={{ scale: 1.06, rotateZ: 0.5 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/35 via-primary/10 to-transparent lg:bg-gradient-to-t lg:from-primary/45 lg:via-transparent lg:to-transparent" />
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="absolute left-5 top-5 rounded-full glass-nav px-3 py-1 text-[11px] lg:text-[12px] font-semibold tabular-nums tracking-widest text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </div>

                    <div className="relative flex h-full min-h-0 flex-col p-7 lg:p-8 [transform:translateZ(20px)]">
                      <h2 className="line-clamp-2 min-h-[3.5rem] text-[1.35rem] font-semibold leading-snug tracking-tight text-primary lg:min-h-[3.25rem] lg:text-[1.5rem]">
                        {service.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-[14px] lg:text-[15px] leading-relaxed text-primary/65 lg:min-h-[4.25rem]">
                        {service.shortDescription}
                      </p>
                      <ul className="mt-5 flex min-h-[7.5rem] flex-wrap content-start gap-2 lg:min-h-[6.5rem]">
                        {service.items.map((item, j) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 8, rotateX: 20 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 + j * 0.05, duration: 0.4 }}
                            className="rounded-full border border-primary/10 bg-white/70 px-3.5 py-2 text-[12px] lg:text-[13px] font-medium text-primary/80 backdrop-blur-sm transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-white/90 group-hover:shadow-[0_4px_16px_rgba(92,191,42,0.1)]"
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <Link
                        to={`/services/${service.slug}`}
                        className="gradient-border-cta mt-auto inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.15em] transition-all hover:shadow-[0_0_28px_-4px_rgba(92,191,42,0.45)]"
                      >
                        Learn More
                        <motion.span
                          aria-hidden
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </div>
                  </article>
                </Tilt3DCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats strip */}
        <section className="relative py-16">
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
              <Tilt3DCard key={stat.l} depth={6}>
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass-card-light rounded-2xl p-6 text-center transition-all duration-500 hover:glass-card-hover [transform:translateZ(16px)]"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                    className="bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-[2rem] font-semibold tracking-tight text-transparent"
                  >
                    {stat.n}
                  </motion.div>
                  <div className="mt-1 text-[11px] lg:text-[12px] uppercase tracking-[0.2em] text-primary/55">{stat.l}</div>
                </motion.div>
              </Tilt3DCard>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="relative py-28">
          <Tilt3DCard depth={5}>
            <motion.div
              initial={{ opacity: 0, y: 32, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light relative mx-auto max-w-[1280px] rounded-3xl px-6 py-16 text-center [transform:translateZ(24px)] lg:px-10"
            >
              <SectionLabel>Get Started</SectionLabel>
              <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
                Ready to optimize your sourcing operations?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
                Tell us about your project requirements — we'll recommend the right combination of sourcing,
                engineering, and quality services for your program.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/quotation"
                  className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
                >
                  Discuss your requirement
                </Link>
              </motion.div>
            </motion.div>
          </Tilt3DCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
