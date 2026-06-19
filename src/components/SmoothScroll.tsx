import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

const NAV_OFFSET = -76;

const LENIS_OPTIONS = {
  lerp: 0.075,
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.075,
  wheelMultiplier: 0.92,
  touchMultiplier: 1.12,
  autoRaf: true,
  autoResize: true,
  stopInertiaOnNavigate: true,
  anchors: { offset: NAV_OFFSET },
};

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

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() =>
    typeof window === "undefined"
      ? true
      : !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setEnabled(!media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (!enabled) return children;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisRegistry />
      {children}
    </ReactLenis>
  );
}

/** @deprecated Use SmoothScrollProvider */
export function SmoothScroll() {
  return null;
}
