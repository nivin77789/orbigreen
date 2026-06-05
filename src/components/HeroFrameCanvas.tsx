import { useEffect, useRef } from "react";
import {
  FRAME_COUNT,
  frameUrl,
  scrollProgressToFrame,
} from "@/lib/scroll-frames";

/**
 * Sticky full-screen canvas playing the 120-frame hero sequence from
 * ./hero-bg-image-frames/, scrubbed by scroll progress.
 */
export function HeroFrameCanvas({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameUrl(i + 1);
      return img;
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrameRef.current = -1;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawCover = (img: HTMLImageElement) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(w / iw, h / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    };

    const draw = () => {
      const p = Math.min(1, Math.max(0, progressRef.current));
      const frameNumber = scrollProgressToFrame(p);
      const frameIndex = frameNumber - 1;
      const closingGlow = p > 0.85;

      if (!closingGlow && frameIndex === lastFrameRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const img = images[frameIndex];
      if (img?.complete && img.naturalWidth > 0) {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);
        drawCover(img);

        if (closingGlow) {
          const t = (p - 0.85) / 0.15;
          const cx = w / 2;
          const cy = h / 2;
          const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
          bloom.addColorStop(0, `rgba(0, 143, 76, ${0.18 * t})`);
          bloom.addColorStop(0.45, `rgba(5, 8, 6, ${0.08 * t})`);
          bloom.addColorStop(1, "rgba(5, 5, 5, 0)");
          ctx.fillStyle = bloom;
          ctx.fillRect(0, 0, w, h);
        }

        lastFrameRef.current = frameIndex;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "#050505" }}
    />
  );
}
