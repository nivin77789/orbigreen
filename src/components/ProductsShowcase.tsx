import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/productsData";

const EASE = [0.16, 1, 0.3, 1] as const;
const HOME_PRODUCTS_LIMIT = 4;

type ProductsShowcaseProps = {
  variant?: "page" | "section";
  showHeader?: boolean;
};

function ProductsSectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="products-section-grid absolute inset-0 opacity-[0.35]" />
      <div className="absolute -left-[20%] top-[10%] h-[50vh] w-[50vw] rounded-full bg-secondary/[0.08] blur-[100px]" />
      <div className="absolute -right-[15%] bottom-[5%] h-[45vh] w-[45vw] rounded-full bg-primary/[0.06] blur-[90px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        to={`/products/${product.slug}`}
        className="product-card group h-full w-full text-left"
        style={{ "--product-accent": product.accent } as CSSProperties}
        aria-label={`Know more about ${product.title}`}
      >
        <span className="product-card__accent" aria-hidden />
        <span className="product-card__sheen" aria-hidden />
        <div className="product-card__media">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="product-card__image"
          />
          <div className="product-card__overlay" aria-hidden />
          <span className="product-card__index">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="product-card__body">
          <h3 className="product-card__title">{product.title}</h3>
          <p className="product-card__desc">{product.description}</p>
          <span className="product-card__cta">
            Know More
            <span className="product-card__cta-arrow" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ProductsHeader({
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
        <h2 className="text-balance text-[clamp(2.2rem,4.1vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-primary">
          Industrial components, sourced to spec
        </h2>
        <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-primary/60 lg:text-[17px]">
          Precision-machined, fabricated, and assembled parts — qualified across global supply networks and
          delivered to your engineering standards.
        </p>
      </div>
      {showViewAllLink && (
        <Link
          to="/products"
          className="group glass-card-light inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-primary transition-all hover:glass-card-hover lg:text-[15px]"
        >
          View all products
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

function ProductGrid({
  products,
  columnsClass,
}: {
  products: Product[];
  columnsClass: string;
}) {
  return (
    <div className={`product-grid ${columnsClass}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

export function ProductsShowcase({ variant = "page", showHeader = true }: ProductsShowcaseProps) {
  const isSection = variant === "section";
  const displayedProducts = isSection ? PRODUCTS.slice(0, HOME_PRODUCTS_LIMIT) : PRODUCTS;

  const gridColumns = isSection ? "product-grid--section" : "product-grid--page";

  return (
    <section
      id={isSection ? "products" : undefined}
      className={`content-auto section-spacing relative overflow-hidden bg-white ${
        isSection ? "border-t border-primary/10" : ""
      }`}
    >
      <ProductsSectionBackground />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
        {showHeader && <ProductsHeader showViewAllLink={isSection} scrollTriggered={isSection} />}

        <div className={showHeader ? "mt-10 lg:mt-12" : ""}>
          <ProductGrid products={displayedProducts} columnsClass={gridColumns} />
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
              className="gradient-border-cta quotation-cta inline-flex items-center rounded-full px-6 py-3 text-[14px] font-semibold lg:text-[15px]"
            >
              <span>Request Quotation</span>
              <span className="quotation-cta__arrow" aria-hidden>
                →
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
