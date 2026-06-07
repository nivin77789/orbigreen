import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteLoader } from "@/components/SiteLoader";
import { preloadAllFrames } from "@/lib/frame-cache";

const MIN_LOADER_MS = 1400;

type AppBootstrapProps = {
  children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const minDelay = new Promise<void>((resolve) => {
        window.setTimeout(resolve, MIN_LOADER_MS);
      });

      const preload = preloadAllFrames((loaded, total) => {
        if (!cancelled) {
          setProgress(Math.round((loaded / total) * 100));
        }
      });

      await Promise.all([minDelay, preload]);

      if (cancelled) return;

      setProgress(100);
      setReady(true);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{!ready && <SiteLoader key="site-loader" progress={progress} />}</AnimatePresence>
      {ready ? children : null}
    </>
  );
}
