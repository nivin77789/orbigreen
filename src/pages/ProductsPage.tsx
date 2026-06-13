import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductsShowcase } from "@/components/ProductsShowcase";
import { AnimatedStatValue } from "@/components/AnimatedStatValue";
import { PRODUCTS } from "@/data/productsData";
import productsAboutBanner from "@/assets/products-about-banner.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_STATS = [
  { value: "10", label: "Product categories" },
  { value: "4+", label: "Sourcing markets" },
  { value: "500+", label: "Projects delivered" },
  { value: "15+", label: "Years experience" },
];

function ProductsHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={productsAboutBanner}
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
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">Product Catalog</span>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Our{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-primary/75">
              Precision-machined, fabricated, and assembled industrial components — qualified across global supply
              networks and delivered to your engineering standards.
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
                className="gradient-border-cta rounded-full px-6 py-3 text-[13px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
              >
                Request Quotation
              </Link>
              <Link
                to="/services"
                className="glass-card-light rounded-full px-6 py-3 text-[13px] font-semibold text-primary hover:glass-card-hover"
              >
                Our Services
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {PRODUCTS.slice(0, 6).map((product, i) => (
                <motion.span
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="global-hero-stat rounded-full px-3 py-1.5 text-[11px] font-semibold text-primary/80"
                >
                  {product.title.split(" ")[0]}
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
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/55">
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

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="relative">
        <ProductsHero />
        <ProductsShowcase variant="page" showHeader={false} />

        <section className="relative px-6 pb-28 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-light mx-auto max-w-[1280px] rounded-3xl px-6 py-16 text-center lg:px-10"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Get Started</span>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-primary">
              Need a custom sourcing program?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-primary/70">
              Share your drawings, quantities, and delivery targets — we'll qualify suppliers and build a
              procurement plan around your product requirements.
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
