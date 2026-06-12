import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/productsData";

const EASE = [0.16, 1, 0.3, 1] as const;

type ProductsShowcaseProps = {
  variant?: "page" | "section";
};

function ProductsSectionBackground({ accent }: { accent: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="products-section-grid absolute inset-0 opacity-[0.35]" />
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[50vh] w-[50vw] rounded-full blur-[100px]"
        animate={{ backgroundColor: `${accent}22` }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <motion.div
        className="absolute -right-[15%] bottom-[5%] h-[45vh] w-[45vw] rounded-full blur-[90px]"
        animate={{ backgroundColor: `${accent}18` }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

function ProductSpotlight({
  product,
  index,
  showCatalogLink,
}: {
  product: Product;
  index: number;
  showCatalogLink: boolean;
}) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
    >
      <div className="relative order-2 lg:order-1">
        <motion.div
          className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-3xl"
          style={{ backgroundColor: product.accent }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.28, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <motion.div
          className="products-spotlight-frame relative overflow-hidden rounded-[1.75rem] p-1.5 sm:rounded-[2rem]"
          initial={{ clipPath: "inset(8% 12% 8% 12% round 1.75rem)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 1.75rem)" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <motion.img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="aspect-[5/4] w-full rounded-[1.35rem] object-cover sm:aspect-[4/3] sm:rounded-[1.5rem]"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <motion.div
            className="absolute inset-0 rounded-[1.35rem] sm:rounded-[1.5rem]"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${product.accent}33 100%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.span
            className="absolute left-5 top-5 rounded-full glass-nav px-3 py-1 text-[11px] font-bold tabular-nums tracking-[0.2em] text-primary"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </motion.div>
      </div>

      <div className="order-1 px-1 lg:order-2 lg:px-2">
        <motion.span
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-secondary"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: product.accent }}
          />
          {product.category}
        </motion.span>
        <motion.h3
          className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.55, ease: EASE }}
        >
          {product.title}
        </motion.h3>
        <motion.p
          className="mt-5 max-w-md text-[15px] leading-relaxed text-primary/68"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
        >
          {product.description}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
        >
          <Link
            to="/quotation"
            className="gradient-border-cta inline-flex rounded-full px-6 py-3 text-[13px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
          >
            Request sourcing
          </Link>
          {showCatalogLink && (
            <Link
              to="/products"
              className="gradient-border-cta-outline inline-flex rounded-full px-6 py-3 text-[13px] font-semibold transition-all hover:bg-white/15"
            >
              Explore catalog
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProductRail({
  activeIndex,
  onSelect,
  progress,
  ringLayoutId,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  progress: number;
  ringLayoutId: string;
}) {
  return (
    <div className="relative mt-10 lg:mt-12">
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary/45">
          Browse categories
        </span>
        <span className="text-[11px] font-bold tabular-nums tracking-widest text-primary/50">
          {String(activeIndex + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-section to-transparent lg:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-section to-transparent lg:w-12" />

        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 scrollbar-none sm:gap-3.5">
          {PRODUCTS.map((product, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.button
                key={product.id}
                type="button"
                onClick={() => onSelect(index)}
                whileHover={{ y: isActive ? 0 : -4 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-[min(42vw,168px)] shrink-0 overflow-hidden rounded-2xl text-left transition-shadow duration-500 sm:w-[min(28vw,190px)] lg:w-[min(14vw,210px)] ${
                  isActive
                    ? "shadow-[0_16px_48px_-12px_rgba(11,95,126,0.22)]"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-2xl border transition-colors duration-500 ${
                    isActive ? "border-secondary/50" : "border-primary/10 group-hover:border-primary/25"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isActive ? "scale-105" : "scale-100 group-hover:scale-105"
                    }`}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? `linear-gradient(to top, ${product.accent}88 0%, transparent 62%)`
                        : "linear-gradient(to top, rgba(11,95,126,0.55) 0%, transparent 55%)",
                    }}
                  />
                  {isActive && (
                    <motion.div
                      layoutId={ringLayoutId}
                      className="absolute inset-0 rounded-2xl ring-2 ring-secondary/60 ring-offset-2 ring-offset-section"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                      {product.category}
                    </span>
                    <p className="mt-0.5 text-[13px] font-semibold leading-tight text-white">{product.title}</p>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 overflow-hidden rounded-full bg-primary/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-secondary to-accent"
                      style={{ scaleX: progress }}
                    />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductsCarouselHeader({
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
        <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">Our Products</span>
        <h2 className="mt-3 text-balance text-[clamp(1.85rem,3.5vw,2.85rem)] font-semibold leading-[1.08] tracking-tight text-primary">
          Industrial components,{" "}
          <span className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
            sourced to spec
          </span>
        </h2>
        <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-primary/60">
          Precision-machined, fabricated, and assembled parts — qualified across global supply networks and
          delivered to your engineering standards.
        </p>
      </div>
      {showViewAllLink && (
        <Link
          to="/products"
          className="group glass-card-light inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold text-primary transition-all hover:glass-card-hover"
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

function ProductsCarousel({ variant }: { variant: "page" | "section" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeProduct = PRODUCTS[activeIndex];
  const isSection = variant === "section";

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % PRODUCTS.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;

    const duration = 5200;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(1, elapsed / duration);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        goNext();
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [activeIndex, paused, goNext]);

  return (
    <section
      id={isSection ? "products" : undefined}
      className={`content-auto relative overflow-hidden bg-white py-20 lg:py-28 ${
        isSection ? "border-t border-primary/10" : ""
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <ProductsSectionBackground accent={activeProduct.accent} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
        <ProductsCarouselHeader showViewAllLink={isSection} scrollTriggered={isSection} />

        <div className="mt-12 min-h-[420px] sm:min-h-[460px] lg:mt-14 lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <ProductSpotlight
              key={activeProduct.id}
              product={activeProduct}
              index={activeIndex}
              showCatalogLink={isSection}
            />
          </AnimatePresence>
        </div>

        <ProductRail
          activeIndex={activeIndex}
          onSelect={goTo}
          progress={progress}
          ringLayoutId={isSection ? "home-product-active-ring" : "page-product-active-ring"}
        />
      </div>
    </section>
  );
}

export function ProductsShowcase({ variant = "page" }: ProductsShowcaseProps) {
  return <ProductsCarousel variant={variant} />;
}
