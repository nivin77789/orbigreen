export function safeSessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSessionSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Private mode / storage quota — ignore and continue.
  }
}

export function isMobileLikeDevice() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function onMediaQueryChange(query: MediaQueryList, listener: () => void) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}
