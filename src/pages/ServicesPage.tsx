import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tilt3DCard } from "@/components/Tilt3DCard";
import { SERVICES } from "@/data/servicesData";

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
      className="inline-block text-[10px] uppercase tracking-[0.3em] text-secondary"
    >
      {children}
    </motion.span>
  );
}

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative pt-28 [perspective:1600px]">
        {/* Hero */}
        <section className="relative mx-auto max-w-[1280px] px-6 pb-24 lg:px-10">
          <div className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[90px]" />

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <SectionLabel>What We Offer</SectionLabel>
            <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Our{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-secondary to-accent"
            />
            <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-primary/70">
              Comprehensive industrial sourcing, engineering, and quality solutions designed to optimize your
              operations end to end.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {SERVICES.slice(0, 3).map((s, i) => (
                <motion.span
                  key={s.slug}
                  initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="glass-card-light rounded-full px-3 py-1.5 text-[11px] font-semibold text-primary/80"
                >
                  {s.title.split(" ")[0]}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

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
                        className="absolute left-5 top-5 rounded-full glass-nav px-3 py-1 text-[11px] font-semibold tabular-nums tracking-widest text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </div>

                    <div className="relative flex h-full min-h-0 flex-col p-7 lg:p-8 [transform:translateZ(20px)]">
                      <h2 className="line-clamp-2 min-h-[3.5rem] text-[1.35rem] font-semibold leading-snug tracking-tight text-primary lg:min-h-[3.25rem] lg:text-[1.5rem]">
                        {service.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-[14px] leading-relaxed text-primary/65 lg:min-h-[4.25rem]">
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
                            className="rounded-full border border-primary/10 bg-white/70 px-3.5 py-2 text-[12px] font-medium text-primary/80 backdrop-blur-sm transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-white/90 group-hover:shadow-[0_4px_16px_rgba(92,191,42,0.1)]"
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <Link
                        to={`/services/${service.slug}`}
                        className="gradient-border-cta mt-auto inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all hover:shadow-[0_0_28px_-4px_rgba(92,191,42,0.45)]"
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
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-primary/55">{stat.l}</div>
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
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-primary/70">
                Tell us about your project requirements — we'll recommend the right combination of sourcing,
                engineering, and quality services for your program.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/#contact"
                  className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
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
