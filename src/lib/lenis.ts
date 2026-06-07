import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, options?: { offset?: number }) {
  const element =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)
      : target;
  if (!element) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element, {
      offset: options?.offset ?? -72,
      duration: 1.15,
    });
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
