import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { getProductBySlug, PRODUCTS } from "@/data/productsData";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProductGalleryPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  useDocumentTitle(product?.title ?? "Products", product?.description);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const productIndex = PRODUCTS.findIndex((item) => item.slug === product.slug);
  const prevProduct = productIndex > 0 ? PRODUCTS[productIndex - 1] : null;
  const nextProduct = productIndex < PRODUCTS.length - 1 ? PRODUCTS[productIndex + 1] : null;

  return (
    <div className="min-h-screen overflow-hidden bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <section className="relative mx-auto max-w-[1280px] px-6 pb-20 lg:px-10 lg:pb-24">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-[380px] w-[380px] rounded-full bg-secondary/10 blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-12 bottom-24 h-[280px] w-[280px] rounded-full bg-primary/8 blur-[90px]"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary/50 transition-colors hover:text-primary lg:text-[13px]"
            >
              ← All Products
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="relative mt-8 max-w-3xl"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/45 lg:text-[12px]">
              Product {String(productIndex + 1).padStart(2, "0")}
            </p>
            <h1 className="mt-3 text-balance text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.06] tracking-tight text-primary">
              {product.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-primary/70 lg:text-[17px]">
              {product.description}
            </p>
            <div
              className="mt-5 h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }}
              aria-hidden
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
            className="relative mt-10 lg:mt-12"
          >
            <ProductGallery product={product} />
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            className="relative mt-10 flex flex-wrap items-stretch justify-between gap-4 border-t border-primary/10 pt-8 lg:mt-12"
            aria-label="Other products"
          >
            {prevProduct ? (
              <Link
                to={`/products/${prevProduct.slug}`}
                className="product-gallery-view__nav-link product-gallery-view__nav-link--prev"
              >
                <span className="product-gallery-view__nav-link-label">Previous</span>
                <span className="product-gallery-view__nav-link-title">{prevProduct.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextProduct ? (
              <Link
                to={`/products/${nextProduct.slug}`}
                className="product-gallery-view__nav-link product-gallery-view__nav-link--next"
              >
                <span className="product-gallery-view__nav-link-label">Next</span>
                <span className="product-gallery-view__nav-link-title">{nextProduct.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </motion.nav>
        </section>
      </main>

      <Footer />
    </div>
  );
}
