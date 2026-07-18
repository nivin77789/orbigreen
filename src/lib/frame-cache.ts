import { FRAME_COUNT, frameUrl } from "@/lib/scroll-frames";

const frameCache = new Map<number, HTMLImageElement>();
const loadingFrames = new Set<number>();

export function getFrameImage(frameNumber: number): HTMLImageElement | undefined {
  const n = Math.min(FRAME_COUNT, Math.max(1, frameNumber));

  if (!frameCache.has(n)) {
    if (!loadingFrames.has(n)) {
      loadingFrames.add(n);
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(n);
      img.onload = () => loadingFrames.delete(n);
      img.onerror = () => loadingFrames.delete(n);
      frameCache.set(n, img);
    }
    return frameCache.get(n);
  }

  return frameCache.get(n);
}

export function preloadFramesAround(frameNumber: number, radius = 4) {
  const center = Math.min(FRAME_COUNT, Math.max(1, frameNumber));

  for (let offset = -radius; offset <= radius; offset += 1) {
    const target = center + offset;
    if (target >= 1 && target <= FRAME_COUNT) {
      getFrameImage(target);
    }
  }
}

export function preloadInitialFrames() {
  preloadFramesAround(1, 4);
  preloadFramesAround(37, 2);
}

function loadFrame(frameNumber: number): Promise<void> {
  const n = Math.min(FRAME_COUNT, Math.max(1, frameNumber));
  const cached = frameCache.get(n);

  if (cached?.complete && cached.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      loadingFrames.delete(n);
      resolve();
    };

    if (cached) {
      if (cached.complete) {
        finish();
        return;
      }
      cached.addEventListener("load", finish, { once: true });
      cached.addEventListener("error", finish, { once: true });
      return;
    }

    loadingFrames.add(n);
    const img = new Image();
    img.decoding = "async";
    img.onload = finish;
    img.onerror = finish;
    img.src = frameUrl(n);
    frameCache.set(n, img);
  });
}

/** Minimal frames needed before first paint — story beats + immediate neighbors. */
export function getEssentialFrameNumbers(): number[] {
  const anchors = [1, 37, 109, 205, FRAME_COUNT];
  const frames = new Set<number>();

  for (const anchor of anchors) {
    for (let offset = -2; offset <= 2; offset += 1) {
      const target = anchor + offset;
      if (target >= 1 && target <= FRAME_COUNT) {
        frames.add(target);
      }
    }
  }

  return [...frames].sort((a, b) => a - b);
}

export async function preloadEssentialFrames(
  onProgress?: (loaded: number, total: number) => void,
  concurrency = 6,
): Promise<void> {
  const targets = getEssentialFrameNumbers();
  const total = targets.length;
  let loaded = 0;
  let nextIndex = 0;

  const report = () => onProgress?.(loaded, total);

  const worker = async () => {
    while (nextIndex < total) {
      const index = nextIndex;
      nextIndex += 1;
      await loadFrame(targets[index]);
      loaded += 1;
      report();
    }
  };

  const workers = Math.min(concurrency, total);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  report();
}

/** Warm remaining frames when the browser is idle (homepage scroll section only). */
export function preloadRemainingFramesOnIdle(concurrency = 2) {
  if (typeof window === "undefined") return () => {};

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return () => {};

  let cancelled = false;
  const essential = new Set(getEssentialFrameNumbers());
  const idleTargets = Array.from({ length: FRAME_COUNT }, (_, index) => index + 1).filter(
    (frameNumber) => !essential.has(frameNumber),
  );

  const run = async () => {
    let nextIndex = 0;

    const worker = async () => {
      while (!cancelled && nextIndex < idleTargets.length) {
        const index = nextIndex;
        nextIndex += 1;
        await loadFrame(idleTargets[index]);
      }
    };

    await Promise.all(Array.from({ length: Math.min(concurrency, 4) }, () => worker()));
  };

  const scheduleIdle = (callback: () => void, timeout = 8000) => {
    if (typeof window.requestIdleCallback === "function") {
      return window.requestIdleCallback(callback, { timeout });
    }

    return window.setTimeout(callback, 1);
  };

  const cancelIdle = (id: number) => {
    if (typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(id);
      return;
    }

    window.clearTimeout(id);
  };

  const idleId = scheduleIdle(() => {
    void run();
  });

  return () => {
    cancelled = true;
    cancelIdle(idleId);
  };
}
