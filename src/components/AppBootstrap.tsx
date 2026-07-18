import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteLoader } from "@/components/SiteLoader";
import { preloadEssentialFrames } from "@/lib/frame-cache";
import { isMobileLikeDevice, safeSessionGet, safeSessionSet } from "@/lib/safeStorage";

const FAST_BOOT_KEY = "orbigreen_boot_ready";
const MIN_LOADER_MS = 280;
const MAX_LOADER_MS = 2500;
const MOBILE_MAX_LOADER_MS = 900;

type AppBootstrapProps = {
  children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;
    return safeSessionGet(FAST_BOOT_KEY) !== "1";
  });
  const [progress, setProgress] = useState(showLoader ? 8 : 100);

  useEffect(() => {
    if (!showLoader) {
      void preloadEssentialFrames(undefined, isMobileLikeDevice() ? 2 : 6);
      return;
    }

    let cancelled = false;
    let minDelayTimeout = 0;
    const startedAt = Date.now();
    const maxWait = isMobileLikeDevice() ? MOBILE_MAX_LOADER_MS : MAX_LOADER_MS;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      safeSessionSet(FAST_BOOT_KEY, "1");
      setProgress(100);
      setShowLoader(false);
    };

    const maxTimeout = window.setTimeout(finish, maxWait);

    void preloadEssentialFrames(
      (loaded, total) => {
        if (cancelled || total <= 0) return;
        setProgress(Math.max(8, Math.round((loaded / total) * 100)));
      },
      isMobileLikeDevice() ? 2 : 6,
    ).finally(() => {
      if (cancelled) return;
      const elapsed = Date.now() - startedAt;
      minDelayTimeout = window.setTimeout(finish, Math.max(0, MIN_LOADER_MS - elapsed));
    });

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimeout);
      if (minDelayTimeout) window.clearTimeout(minDelayTimeout);
    };
  }, [showLoader]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && <SiteLoader key="site-loader" progress={progress} />}
      </AnimatePresence>
      {children}
    </>
  );
}
