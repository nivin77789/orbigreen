import { useEffect, useState, type RefObject } from "react";

export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "120px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
