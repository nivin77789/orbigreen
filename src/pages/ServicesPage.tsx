import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import servicesBanner from "@/assets/services-banner.webp";

const EASE = [0.16, 1, 0.3, 1] as const;


function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="pointer-events-none absolute inset-0 max-h-[min(42vh,17.5rem)] sm:max-h-[min(38vh,18.5rem)]" aria-hidden>
        <img
          src={servicesBanner}
          alt=""
          className="h-full w-full object-cover object-[65%_center] sm:object-[right_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-30% via-white/92 to-white/40 sm:from-35% lg:via-white/72 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-6 pt-[5.25rem] lg:px-10 lg:pb-8 lg:pt-[5.75rem]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <SectionLabel animated tone="primary">
            What We Offer
          </SectionLabel>
          <h1 className="mt-3 text-balance text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-primary">
            Our Services
          </h1>
          <p className="mt-4 max-w-xl text-[16px] lg:text-[17px] leading-relaxed text-primary/75">
            Comprehensive industrial sourcing, engineering, and quality solutions designed to optimize your
            operations end to end.
          </p>
          <div className="global-presence-heading-line mt-4" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
            className="mt-5 flex flex-wrap gap-3"
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
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative">
        <ServicesHero />
        <ServicesShowcase variant="page" showHeader={false} />

        <section className="relative px-6 pb-28 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass-card-light mx-auto max-w-[1280px] rounded-3xl px-6 py-16 text-center lg:px-10"
          >
            <SectionLabel animated tone="primary">
              Get Started
            </SectionLabel>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
              Ready to optimize your sourcing operations!
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
              Tell us about your project requirements — we'll recommend the right combination of sourcing,
              engineering, and quality services for your program.
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
