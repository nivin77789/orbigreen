import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getServiceBySlug, SERVICES } from "@/data/servicesData";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const currentIndex = SERVICES.findIndex((item) => item.slug === service.slug);
  const otherServices = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <div className="min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <section className="relative mx-auto max-w-[1280px] px-6 pb-16 lg:px-10">
          <div className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[90px]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary/50 transition-colors hover:text-primary"
            >
              ← All Services
            </Link>
          </motion.div>

          <div className="relative mt-8 grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">
                Service {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <h1 className="mt-4 text-balance text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-primary">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-primary/70">
                {service.shortDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/quotation"
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
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light relative overflow-hidden rounded-3xl p-2"
            >
              <div className="overflow-hidden rounded-[1.25rem]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-[280px] w-full object-cover object-center lg:h-[360px]"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top, ${service.accent}33, transparent 55%)`,
                }}
              />
            </motion.div>
          </div>
        </section>

        <section className="border-t border-primary/10 bg-white py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-3xl"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Overview</span>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-snug tracking-tight text-primary">
                {service.sectionTitle}
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-primary/70">{service.overview}</p>
            </motion.div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={1}
                className="glass-card-light rounded-3xl p-8"
              >
                <h3 className="text-[18px] font-semibold tracking-tight text-primary">{service.focusLabel}</h3>
                <ul className="mt-6 space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-primary/75"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: service.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={2}
                className="glass-card-light rounded-3xl p-8"
              >
                <h3 className="text-[18px] font-semibold tracking-tight text-primary">{service.partnerTitle}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-primary/70">{service.partnerDescription}</p>
                <blockquote className="mt-8 border-l-2 border-secondary pl-5 text-[15px] italic leading-relaxed text-primary/80">
                  "{service.quote}"
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">More Services</span>
              <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-primary">
                Explore our other capabilities
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <Link
                    to={`/services/${item.slug}`}
                    className="glass-card-light group block rounded-2xl p-5 transition-all duration-500 hover:glass-card-hover"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/40 transition-colors group-hover:text-secondary">
                      {item.title.split(" ")[0]}
                    </span>
                    <h3 className="mt-2 text-[15px] font-semibold leading-snug text-primary">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-primary/60">
                      {item.shortDescription}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-light mx-auto max-w-[1280px] rounded-3xl px-6 py-16 text-center lg:px-10"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Get Started</span>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-primary">
              Ready to discuss {service.title.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-primary/70">
              Tell us about your program requirements and our team will recommend the right approach for your
              sourcing and delivery goals.
            </p>
            <Link
              to="/quotation"
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
