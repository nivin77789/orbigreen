import "@/depth-gallery/styles/depth-gallery.css";

import bgImage from "../hero bg image frames/ezgif-frame-240.png";

type ProductGalleryFallbackProps = {
  embedded?: boolean;
};

export function ProductGalleryFallback({ embedded = false }: ProductGalleryFallbackProps) {
  return (
    <div
      className={`product-depth-gallery flex items-center justify-center overflow-hidden${embedded ? " product-depth-gallery--embedded" : ""}`}
    >
      <img
        src={bgImage}
        alt=""
        className="product-depth-gallery__bg-image absolute inset-[-8%] h-[116%] w-[116%] object-cover brightness-95"
      />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md" />
      <span className="relative text-[12px] uppercase tracking-[0.2em] text-primary/60">Loading…</span>
    </div>
  );
}
