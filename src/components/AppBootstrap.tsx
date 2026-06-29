import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteLoader } from "@/components/SiteLoader";
import { preloadEssentialFrames } from "@/lib/frame-cache";

const MIN_LOADER_MS = 320;
const FAST_BOOT_KEY = "orbigreen_boot_ready";

type AppBootstrapProps = {
  children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const [ready, setReady] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(FAST_BOOT_KEY) === "1";
  });
  const [progress, setProgress] = useState(ready ? 100 : 0);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;

    const run = async () => {
      const minDelay = new Promise<void>((resolve) => {
        window.setTimeout(resolve, MIN_LOADER_MS);
      });

      const preload = preloadEssentialFrames((loaded, total) => {
        if (!cancelled) {
          setProgress(Math.round((loaded / total) * 100));
        }
      });

      await Promise.all([minDelay, preload]);

      if (cancelled) return;

      sessionStorage.setItem(FAST_BOOT_KEY, "1");
      setProgress(100);
      setReady(true);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [ready]);

  return (
    <>
      <AnimatePresence mode="wait">{!ready && <SiteLoader key="site-loader" progress={progress} />}</AnimatePresence>
      {ready ? children : null}
    </>
  );
}
