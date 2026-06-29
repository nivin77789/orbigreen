import { useEffect, type RefObject } from "react";
import { getLenis } from "@/lib/lenis";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function getScrollSectionProgress(element: HTMLElement) {
  const scrollable = element.offsetHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return clamp(-element.getBoundingClientRect().top / scrollable, 0, 1);
}

export function useScrollSectionProgress(
  trackRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let lastProgress = -1;

    const update = () => {
      raf = 0;
      const progress = getScrollSectionProgress(track);
      if (Math.abs(progress - lastProgress) < 0.0004) return;
      lastProgress = progress;
      onProgress(progress);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", schedule);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenis?.off("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [trackRef, onProgress]);
}
