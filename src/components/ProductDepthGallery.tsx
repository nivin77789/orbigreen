import { useEffect, useRef } from "react";
import { Engine } from "@/depth-gallery/Experience/Engine";
import "@/depth-gallery/styles/depth-gallery.css";

import bgImage from "../hero bg image frames/ezgif-frame-240.png";

type ProductDepthGalleryProps = {
  embedded?: boolean;
};

export function ProductDepthGallery({ embedded = false }: ProductDepthGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const engine = new Engine(canvas, container);
    engineRef.current = engine;
    engine.scroll?.setActive(true);

    engine.init().catch((error: unknown) => {
      console.error("Product depth gallery failed to initialize", error);
    });

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`product-depth-gallery${embedded ? " product-depth-gallery--embedded" : ""}`}
      aria-label="Our products"
    >
      <div className="product-depth-gallery__bg" aria-hidden>
        <img src={bgImage} alt="" className="product-depth-gallery__bg-image" />
        <div className="product-depth-gallery__glass-glow" />
      </div>
      <canvas ref={canvasRef} className="webgl" />
      <p className="product-depth-gallery__hint">Scroll to explore</p>
    </section>
  );
}
