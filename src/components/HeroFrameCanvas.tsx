import { useEffect, useRef } from "react";
import { getFrameImage, preloadFramesAround, preloadInitialFrames } from "@/lib/frame-cache";
import { scrollProgressToFrame } from "@/lib/scroll-frames";
import { usePageVisible } from "@/hooks/usePageVisible";

/**
 * Sticky full-screen canvas playing the hero frame sequence from
 * src/new background image frames/, scrubbed by scroll progress.
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
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let active = true;

    preloadInitialFrames();

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.5);
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
      if (!active) return;

      if (!shouldDraw) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const p = Math.min(1, Math.max(0, progressRef.current));
      const frameNumber = scrollProgressToFrame(p);
      const frameIndex = frameNumber - 1;
      const closingGlow = p > 0.85;
      const progressChanged = Math.abs(p - lastProgressRef.current) > 0.0005;
      lastProgressRef.current = p;

      if (progressChanged) {
        preloadFramesAround(frameNumber, 4);
      }

      if (!closingGlow && frameIndex === lastFrameRef.current && !progressChanged) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const img = getFrameImage(frameNumber);
      if (img?.complete && img.naturalWidth > 0) {
        ctx.fillStyle = "#F5F8F7";
        ctx.fillRect(0, 0, w, h);
        drawCover(img);

        if (closingGlow) {
          const t = (p - 0.85) / 0.15;
          const cx = w / 2;
          const cy = h / 2;
          const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
          bloom.addColorStop(0, `rgba(92, 191, 42, ${0.2 * t})`);
          bloom.addColorStop(0.45, `rgba(11, 95, 126, ${0.1 * t})`);
          bloom.addColorStop(1, "rgba(245, 248, 247, 0)");
          ctx.fillStyle = bloom;
          ctx.fillRect(0, 0, w, h);
        }

        lastFrameRef.current = frameIndex;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progressRef, shouldDraw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "#F5F8F7" }}
    />
  );
}
