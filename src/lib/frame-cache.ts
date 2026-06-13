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
  preloadFramesAround(1, 6);
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

export async function preloadAllFrames(
  onProgress?: (loaded: number, total: number) => void,
  concurrency = 10,
): Promise<void> {
  const total = FRAME_COUNT;
  let loaded = 0;
  let nextIndex = 0;

  const report = () => onProgress?.(loaded, total);

  const worker = async () => {
    while (nextIndex < total) {
      const index = nextIndex;
      nextIndex += 1;
      await loadFrame(index + 1);
      loaded += 1;
      report();
    }
  };

  const workers = Math.min(concurrency, total);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  report();
}
