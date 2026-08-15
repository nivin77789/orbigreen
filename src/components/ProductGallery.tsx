import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/data/productsData";

const EASE = [0.16, 1, 0.3, 1] as const;

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = product.gallery.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, i - 1));
      if (event.key === "ArrowRight") {
        setActiveIndex((i) => Math.min(total - 1, i + 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  return (
    <div className="product-gallery-view">
      <div className="product-gallery-view__layout">
        <div className="product-gallery-view__main">
          <div className="product-gallery-view__stage">
            <span className="product-gallery-view__counter" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="product-gallery-view__counter-sep">/</span>
              {String(total).padStart(2, "0")}
            </span>

            <AnimatePresence mode="wait">
              <motion.img
                key={`${product.id}-${activeIndex}`}
                src={product.gallery[activeIndex]}
                alt={`${product.title} — image ${activeIndex + 1}`}
                className="product-gallery-view__hero"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </AnimatePresence>

            <div className="product-gallery-view__controls">
              <button
                type="button"
                className="product-gallery-view__nav"
                aria-label="Previous image"
                disabled={activeIndex === 0}
                onClick={goPrev}
              >
                ‹
              </button>
              <button
                type="button"
                className="product-gallery-view__nav"
                aria-label="Next image"
                disabled={activeIndex === total - 1}
                onClick={goNext}
              >
                ›
              </button>
            </div>
          </div>

          <div className="product-gallery-view__grid" role="list" aria-label="All gallery images">
            {product.gallery.map((image, i) => (
              <button
                key={`${product.id}-grid-${i}`}
                type="button"
                role="listitem"
                aria-label={`View image ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className={`product-gallery-view__grid-item${i === activeIndex ? " is-active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <img src={image} alt="" loading="lazy" decoding="async" />
                <span className="product-gallery-view__grid-index">{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="product-gallery-view__aside">
          <div className="product-gallery-view__aside-inner">
            <p className="product-gallery-view__aside-label">Gallery</p>
            <p className="product-gallery-view__aside-count">
              {total} sample {total === 1 ? "image" : "images"}
            </p>

            <div className="product-gallery-view__thumbs" role="tablist" aria-label="Gallery thumbnails">
              {product.gallery.map((image, i) => (
                <button
                  key={`${product.id}-thumb-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`View image ${i + 1}`}
                  className={`product-gallery-view__thumb${i === activeIndex ? " is-active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <img src={image} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>

            <div className="product-gallery-view__progress" aria-hidden>
              {product.gallery.map((_, i) => (
                <span
                  key={`${product.id}-dot-${i}`}
                  className={`product-gallery-view__dot${i === activeIndex ? " is-active" : ""}`}
                />
              ))}
            </div>

            <Link
              to="/quotation"
              className="gradient-border-cta quotation-cta product-gallery-view__cta rounded-full px-6 py-3 text-[14px] font-semibold lg:text-[15px]"
            >
              <span>Request Quotation</span>
              <span className="quotation-cta__arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
