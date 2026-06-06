import { lazy, Suspense } from "react";
import { Nav } from "@/components/Nav";

const ProductDepthGallery = lazy(() =>
  import("@/components/ProductDepthGallery").then((module) => ({
    default: module.ProductDepthGallery,
  }))
);

export default function ProductsPage() {
  return (
    <div className="h-svh w-full overflow-hidden">
      <Nav />
      <Suspense
        fallback={
          <div className="product-depth-gallery flex h-svh w-full items-center justify-center bg-[#f5f8f7] text-[12px] uppercase tracking-[0.2em] text-primary/50">
            Loading…
          </div>
        }
      >
        <ProductDepthGallery />
      </Suspense>
    </div>
  );
}
