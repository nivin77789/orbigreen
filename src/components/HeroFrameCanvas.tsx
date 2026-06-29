import { useEffect, useRef } from "react";
import { getFrameImage, preloadFramesAround, preloadInitialFrames, preloadRemainingFramesOnIdle } from "@/lib/frame-cache";
import { HERO_BG, HERO_BG_RGB } from "@/lib/constants";
import { scrollProgressToFrame } from "@/lib/scroll-frames";
import { usePageVisible } from "@/hooks/usePageVisible";

/**
 * Sticky full-screen canvas playing optimized WebP frames from
 * public/hero-bg-frames/, scrubbed by scroll progress.
 */
export function HeroFrameCanvas({
  progressRef,
  active = true,
}: {
  progressRef: React.MutableRefObject<number>;
  active?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const lastProgressRef = useRef(-1);
  const pageVisible = usePageVisible();
  const shouldDraw = active && pageVisible;

  useEffect(() => {
    if (!active) return;
    preloadInitialFrames();
    return preloadRemainingFramesOnIdle(2);
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldDraw) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true })!;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let running = true;

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.25);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrameRef.current = -1;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const drawCover = (img: HTMLImageElement) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(w / iw, h / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = window.innerWidth < 768 ? "low" : "medium";
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    };

    const draw = () => {
      if (!running) return;

      const p = Math.min(1, Math.max(0, progressRef.current));
      const frameNumber = scrollProgressToFrame(p);
      const frameIndex = frameNumber - 1;
      const closingGlow = p > 0.85;
      const progressChanged = Math.abs(p - lastProgressRef.current) > 0.0008;
      lastProgressRef.current = p;

      if (progressChanged) {
        preloadFramesAround(frameNumber, 2);
      }

      if (!closingGlow && frameIndex === lastFrameRef.current && !progressChanged) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const img = getFrameImage(frameNumber);
      if (img?.complete && img.naturalWidth > 0) {
        ctx.fillStyle = HERO_BG;
        ctx.fillRect(0, 0, w, h);
        drawCover(img);

        if (closingGlow) {
          const t = (p - 0.85) / 0.15;
          const cx = w / 2;
          const cy = h / 2;
          const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
          bloom.addColorStop(0, `rgba(92, 191, 42, ${0.2 * t})`);
          bloom.addColorStop(0.45, `rgba(${HERO_BG_RGB}, ${0.1 * t})`);
          bloom.addColorStop(1, `rgba(${HERO_BG_RGB}, 0)`);
          ctx.fillStyle = bloom;
          ctx.fillRect(0, 0, w, h);
        }

        lastFrameRef.current = frameIndex;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progressRef, shouldDraw]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-frame-canvas absolute inset-0 h-full w-full"
      style={{ background: HERO_BG }}
    />
  );
}
