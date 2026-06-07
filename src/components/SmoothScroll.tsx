import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { scrollToTarget, setLenis } from "@/lib/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
    });

    setLenis(lenis);
    document.documentElement.classList.add("lenis-enabled");

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      event.preventDefault();
      scrollToTarget(hash, { offset: -72 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onAnchorClick);

    let frameId = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(onFrame);
    };
    frameId = requestAnimationFrame(onFrame);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frameId);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis-enabled");
    };
  }, []);

  return null;
}
