import { useEffect, useRef } from "react";
import { Engine } from "@/depth-gallery/Experience/Engine";
import "@/depth-gallery/styles/depth-gallery.css";

export function ProductDepthGallery() {
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
      className="product-depth-gallery"
      aria-label="Our products"
    >
      <canvas ref={canvasRef} className="webgl" />
      <p className="product-depth-gallery__hint">Scroll to explore</p>
    </section>
  );
}
