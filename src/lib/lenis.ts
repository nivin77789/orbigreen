import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

const NAV_OFFSET = -76;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function resizeLenis() {
  lenisInstance?.resize();
}

export function scrollToTop(immediate = false) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToTarget(target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) {
  const element =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)
      : target;
  if (!element) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element, {
      offset: options?.offset ?? NAV_OFFSET,
      immediate: options?.immediate ?? false,
    });
    return;
  }

  element.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth", block: "start" });
}
