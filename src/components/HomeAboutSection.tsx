import { Link } from "react-router-dom";
import { SectionLabel } from "@/components/SectionLabel";
import { motion } from "framer-motion";
import productsAboutBanner from "@/assets/products-about-banner.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

const CAPABILITY_TAGS = ["Supplier", "Quality", "Engineering", "Procurement", "Delivery"];

function AboutBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={productsAboutBanner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-[0.14] sm:object-[right_center] sm:opacity-20 lg:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white from-55% via-white/95 to-white/55 sm:from-50% lg:from-42% lg:via-white/88 lg:to-white/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
      <div className="home-about-section-grid absolute inset-0" />
      <div className="absolute -left-[8%] top-[20%] h-[38vh] w-[38vw] rounded-full bg-primary/[0.05] blur-[90px]" />
      <div className="absolute -right-[6%] bottom-[12%] h-[34vh] w-[34vw] rounded-full bg-secondary/[0.07] blur-[80px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

export function HomeAboutSection() {
  return (
    <section
      id="about"
      className="content-auto relative overflow-hidden border-t border-primary/10 bg-white py-16 sm:py-20 lg:py-24"
    >
      <AboutBackground />

      <div className="relative z-10 mx-auto max-w-[1140px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <SectionLabel>Who we are</SectionLabel>
            <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.08] tracking-tight text-primary">
              About{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Orbigreen Techsource
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[17px] lg:text-[18px] leading-relaxed text-primary/72 sm:text-[18px] lg:text-[19px]">
              Integrated sourcing for industrial engineering — combining supplier networks, procurement, and quality
              management to improve supply chain efficiency. We support OEMs worldwide with a single-window approach
              from components to delivery.
            </p>
            <div className="global-presence-heading-line mt-6" />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="gradient-border-cta rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
              >
                Know More
              </Link>
              <Link
                to="/contact"
                className="glass-card-light rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold text-primary hover:glass-card-hover"
              >
                Get in Touch
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {CAPABILITY_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.45, ease: EASE }}
                  className="global-hero-stat rounded-full px-3 py-1.5 text-[13px] lg:text-[14px] font-semibold text-primary/80"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.75, ease: EASE }}
            className="relative hidden overflow-hidden rounded-[1.5rem] border border-primary/8 shadow-[0_24px_64px_-24px_rgba(11,95,126,0.22)] lg:block"
          >
            <img
              src={productsAboutBanner}
              alt="Industrial sourcing and manufacturing"
              className="aspect-[5/4] h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
