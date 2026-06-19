import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

const NAV_OFFSET = -76;

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
      autoRaf: true,
      autoResize: true,
      stopInertiaOnNavigate: true,
      anchors: { offset: NAV_OFFSET },
    });

    setLenis(lenis);
    document.documentElement.classList.add("lenis-enabled");

    const onResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis-enabled");
    };
  }, []);

  return null;
}
