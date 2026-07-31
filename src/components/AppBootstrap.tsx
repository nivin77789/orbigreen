import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteLoader } from "@/components/SiteLoader";
import { areAllScrollFramesLoaded, preloadAllScrollFrames } from "@/lib/frame-cache";
import { FRAME_COUNT } from "@/lib/scroll-frames";
import { isMobileLikeDevice } from "@/lib/safeStorage";

const MIN_LOADER_MS = 650;
const MAX_LOADER_MS = 50000;

function getPreloadConcurrency() {
  if (typeof navigator === "undefined") return 4;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return 2;
  if (isMobileLikeDevice()) return 3;
  return 6;
}

type AppBootstrapProps = {
  children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Preparing scroll experience");

  useEffect(() => {
    if (!showLoader) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [showLoader]);

  useEffect(() => {
    if (!showLoader) return;

    let cancelled = false;
    let minDelayTimeout = 0;
    const startedAt = Date.now();
    const concurrency = getPreloadConcurrency();

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      setProgress(100);
      setStatus("Ready");
      setShowLoader(false);
    };

    const maxTimeout = window.setTimeout(finish, MAX_LOADER_MS);

    const run = async () => {
      try {
        if (areAllScrollFramesLoaded()) {
          setProgress(100);
          setStatus(`Scroll frames ready (${FRAME_COUNT}/${FRAME_COUNT})`);
        } else {
          await preloadAllScrollFrames((loaded, total) => {
            if (cancelled) return;
            const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;
            setProgress(Math.max(4, pct));
            setStatus(`Loading scroll frames (${loaded}/${total})`);
          }, concurrency);
        }
      } catch {
        if (!cancelled) {
          setStatus("Finishing setup…");
        }
      }

      if (cancelled) return;

      const elapsed = Date.now() - startedAt;
      minDelayTimeout = window.setTimeout(finish, Math.max(0, MIN_LOADER_MS - elapsed));
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimeout);
      if (minDelayTimeout) window.clearTimeout(minDelayTimeout);
    };
  }, [showLoader]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <SiteLoader key="site-loader" progress={progress} status={status} totalFrames={FRAME_COUNT} />
        )}
      </AnimatePresence>
      <div aria-hidden={showLoader} className={showLoader ? "pointer-events-none" : undefined}>
        {children}
      </div>
    </>
  );
}
