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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        to={`/services/${service.slug}`}
        className={`product-grid-card group block h-full overflow-hidden rounded-2xl border border-primary/10 bg-white/90 transition-shadow duration-300 hover:border-secondary/30 hover:shadow-[0_16px_40px_-16px_rgba(11,95,126,0.2)] ${
          isHorizontal ? "flex items-stretch gap-0" : "flex flex-col"
        }`}
        aria-label={`Learn more about ${service.title}`}
      >
        <div
          className={`relative shrink-0 overflow-hidden ${
            isHorizontal ? "w-[34%] min-w-[7.5rem] max-w-[9.5rem] sm:w-[32%] sm:max-w-[10.5rem]" : "aspect-[5/4] w-full"
          }`}
        >
          <img
            src={service.image}
            alt=""
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
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold tabular-nums tracking-wider text-primary shadow-sm lg:text-[12px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className={`flex min-w-0 flex-1 flex-col ${isHorizontal ? "justify-center px-3.5 py-3 sm:px-4 sm:py-3.5" : "p-4 sm:p-5"}`}>
          <h3 className="text-[1rem] font-semibold leading-tight text-primary lg:text-[1.0625rem]">{service.title}</h3>
          <p className="body-copy mt-1.5 line-clamp-2 text-primary/65">{service.shortDescription}</p>
          <span className={`mt-3 inline-flex w-fit items-center gap-1.5 text-[0.8125rem] font-semibold text-primary transition-colors group-hover:text-secondary lg:text-[0.875rem] ${isHorizontal ? "mt-2" : "mt-3"}`}>
            Learn more
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
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
    <motion.div {...motionProps} className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <SectionLabel>Services</SectionLabel>
        <h2 className="section-heading mt-2 text-balance text-primary">
          End-to-end support across your supply chain
        </h2>
        <p className="lead-copy mt-3 max-w-lg text-primary/60">
          Sourcing, engineering, quality, logistics, and on-site support — delivered through one accountable
          partner with global reach.
        </p>
      </div>
      {showViewAllLink && (
        <Link
          to="/services"
          className="group glass-card-light inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.875rem] font-semibold text-primary transition-all hover:glass-card-hover"
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
      <div className="mb-4 px-0.5">
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
      className={`content-auto section-spacing relative overflow-hidden bg-white ${
        isSection ? "border-t border-primary/10" : ""
      }`}
    >
      <ServicesSectionBackground />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
        {showHeader && <ServicesHeader showViewAllLink={isSection} scrollTriggered={isSection} />}

        <div className={showHeader ? "mt-8 lg:mt-9" : ""}>
          <ServiceGrid services={services} isSection={isSection} />
        </div>

        {!isSection && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-9"
          >
            <Link
              to="/quotation"
              className="gradient-border-cta rounded-full px-6 py-3 text-[0.875rem] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Request quotation
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
