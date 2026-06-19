import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { SERVICES, type ServiceDetail } from "@/data/servicesData";

function MarqueeSeparator({ accent }: { accent: string }) {
  return (
    <span className="services-marquee__separator" aria-hidden>
      <span
        className="services-marquee__separator-dot"
        style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}66` }}
      />
    </span>
  );
}

function MarqueeItem({ service }: { service: ServiceDetail }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="services-marquee__item"
      style={{ "--service-accent": service.accent } as CSSProperties}
    >
      <span className="services-marquee__item-accent" aria-hidden />
      <span className="services-marquee__item-title">{service.title}</span>
    </Link>
  );
}

export function ServicesMarquee() {
  const loop = [...SERVICES, ...SERVICES];

  return (
    <section className="services-marquee" aria-label="Our services">
      <div className="services-marquee__blend" aria-hidden />

      <div className="services-marquee__viewport">
        <div className="services-marquee__track">
          {loop.map((service, index) => (
            <span key={`${service.slug}-${index}`} className="services-marquee__group">
              <MarqueeItem service={service} />
              <MarqueeSeparator accent={service.accent} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
