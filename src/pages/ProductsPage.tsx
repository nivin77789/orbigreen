import { lazy, Suspense } from "react";
import { Nav } from "@/components/Nav";
import { ProductGalleryFallback } from "@/components/ProductGalleryFallback";

const ProductDepthGallery = lazy(() =>
  import("@/components/ProductDepthGallery").then((module) => ({
    default: module.ProductDepthGallery,
  })),
);

export default function ProductsPage() {
  return (
    <div className="h-svh w-full overflow-hidden bg-section">
      <Nav />
      <Suspense fallback={<ProductGalleryFallback />}>
        <ProductDepthGallery />
      </Suspense>
    </div>
  );
}
