import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

const NAV_OFFSET = -76;

function LenisRegistry() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      setLenis(null);
      return;
    }

    setLenis(lenis);
    return () => setLenis(null);
  }, [lenis]);

  return null;
}

function shouldEnableLenis() {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  // Native touch scrolling is more reliable on phones/tablets for forms and sticky sections.
  if (window.matchMedia("(pointer: coarse)").matches) {
    return false;
  }

  return true;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(shouldEnableLenis);

  const lenisOptions = useMemo(
    () => ({
      lerp: 0.095,
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.98,
      touchMultiplier: 1,
      autoRaf: true,
      autoResize: true,
      stopInertiaOnNavigate: true,
      anchors: { offset: NAV_OFFSET },
    }),
    [],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setEnabled(shouldEnableLenis());
    };

    update();
    reducedMotion.addEventListener("change", update);
    coarsePointer.addEventListener("change", update);

    return () => {
      reducedMotion.removeEventListener("change", update);
      coarsePointer.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return children;

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisRegistry />
      {children}
    </ReactLenis>
  );
}

/** @deprecated Use SmoothScrollProvider */
export function SmoothScroll() {
  return null;
}
