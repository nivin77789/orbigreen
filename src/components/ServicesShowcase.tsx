import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { SERVICES, type ServiceDetail } from "@/data/servicesData";

const EASE = [0.16, 1, 0.3, 1] as const;

type ServicesShowcaseProps = {
  variant?: "page" | "section";
  showHeader?: boolean;
  services?: ServiceDetail[];
};

function ServicesSectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="products-section-grid absolute inset-0 opacity-[0.35]" />
      <div className="absolute -left-[20%] top-[10%] h-[50vh] w-[50vw] rounded-full bg-secondary/[0.08] blur-[100px]" />
      <div className="absolute -right-[15%] bottom-[5%] h-[45vh] w-[45vw] rounded-full bg-primary/[0.06] blur-[90px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

export function ServiceCard({
  service,
  index,
  layout,
}: {
  service: ServiceDetail;
  index: number;
  layout: "horizontal" | "vertical";
}) {
  const isHorizontal = layout === "horizontal";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
      whileHover={{ y: -4 }}
      className={`product-grid-card group overflow-hidden rounded-2xl border border-primary/10 bg-white/90 transition-shadow duration-300 hover:border-secondary/30 hover:shadow-[0_16px_40px_-16px_rgba(11,95,126,0.2)] ${
        isHorizontal ? "flex items-stretch gap-0" : "flex flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          isHorizontal ? "w-[34%] min-w-[7.5rem] max-w-[9.5rem] sm:w-[32%] sm:max-w-[10.5rem]" : "aspect-[5/4] w-full"
        }`}
      >
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isHorizontal ? "min-h-full" : ""
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, transparent 35%, ${service.accent}28 100%)`,
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] lg:text-[12px] font-bold tabular-nums tracking-wider text-primary shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${isHorizontal ? "justify-center px-3.5 py-3 sm:px-4 sm:py-3.5" : "p-4 sm:p-5"}`}>
        <h3
          className={`font-semibold leading-tight text-primary ${
            isHorizontal ? "text-[16px] lg:text-[17px] sm:text-[17px] lg:text-[18px]" : "text-[18px] lg:text-[19px] sm:text-[19px] lg:text-[20px]"
          }`}
        >
          {service.title}
        </h3>
        <p
          className={`mt-1.5 line-clamp-2 leading-relaxed text-primary/65 ${
            isHorizontal ? "text-[12px] lg:text-[13px] sm:text-[13px] lg:text-[14px]" : "text-[13px] lg:text-[14px] sm:text-[14px] lg:text-[15px]"
          }`}
        >
          {service.shortDescription}
        </p>
        <Link
          to={`/services/${service.slug}`}
          className={`mt-3 inline-flex w-fit items-center gap-1.5 text-[12px] lg:text-[13px] font-semibold text-primary transition-colors group-hover:text-secondary sm:text-[13px] lg:text-[14px] ${
            isHorizontal ? "mt-2" : "mt-4"
          }`}
        >
          Learn more
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

function ServicesHeader({
  showViewAllLink,
  scrollTriggered,
}: {
  showViewAllLink: boolean;
  scrollTriggered: boolean;
}) {
  const motionProps = scrollTriggered
    ? {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.75, ease: EASE },
      }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, ease: EASE },
      };

  return (
    <motion.div {...motionProps} className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <SectionLabel>Our Services</SectionLabel>
        <h2 className="mt-3 text-balance text-[clamp(2.2rem,4.1vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-primary">
          End-to-end support across your supply chain
        </h2>
        <p className="mt-4 max-w-lg text-[16px] lg:text-[17px] leading-relaxed text-primary/60">
          Sourcing, engineering, quality, logistics, and on-site support — delivered through one accountable
          partner with global reach.
        </p>
      </div>
      {showViewAllLink && (
        <Link
          to="/services"
          className="group glass-card-light inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] lg:text-[15px] font-semibold text-primary transition-all hover:glass-card-hover"
        >
          View all services
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </Link>
      )}
    </motion.div>
  );
}

export function ServiceGrid({
  services,
  isSection,
}: {
  services: ServiceDetail[];
  isSection: boolean;
}) {
  return (
    <>
      <div className="mb-5 px-0.5">
        <SectionLabel tone="muted">{isSection ? "Featured services" : "Services we offer"}</SectionLabel>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} layout="horizontal" />
        ))}
      </div>

      <div
        className={`hidden gap-4 md:grid ${
          isSection ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} layout="vertical" />
        ))}
      </div>
    </>
  );
}

export function ServicesShowcase({
  variant = "page",
  showHeader = true,
  services = SERVICES,
}: ServicesShowcaseProps) {
  const isSection = variant === "section";

  return (
    <section
      id={isSection ? "services" : undefined}
      className={`content-auto relative overflow-hidden bg-white py-20 lg:py-28 ${
        isSection ? "border-t border-primary/10" : ""
      }`}
    >
      <ServicesSectionBackground />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
        {showHeader && <ServicesHeader showViewAllLink={isSection} scrollTriggered={isSection} />}

        <div className={showHeader ? "mt-10 lg:mt-12" : ""}>
          <ServiceGrid services={services} isSection={isSection} />
        </div>

        {!isSection && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="mt-10 flex flex-wrap justify-center gap-3 lg:mt-12"
          >
            <Link
              to="/quotation"
              className="gradient-border-cta rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Request quotation
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
