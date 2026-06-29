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

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() =>
    typeof window === "undefined"
      ? true
      : !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const lenisOptions = useMemo(() => {
    const isCoarsePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

    return {
      lerp: isCoarsePointer ? 0.12 : 0.095,
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
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setEnabled(!media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
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
