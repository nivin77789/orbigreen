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
