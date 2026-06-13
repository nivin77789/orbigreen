/** Total frames in src/new bg/ */
export const FRAME_COUNT = 300;

/** Scroll progress (0–1) → 1-based frame number, synced to storytelling beats. */
export function scrollProgressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));

  if (p < 0.15) {
    return Math.round(1 + (p / 0.15) * 44);
  }
  if (p < 0.45) {
    return Math.round(46 + ((p - 0.15) / 0.3) * 89);
  }
  if (p < 0.85) {
    return Math.round(136 + ((p - 0.45) / 0.4) * 119);
  }
  return Math.round(256 + ((p - 0.85) / 0.15) * 44);
}

export function frameUrl(frameNumber: number): string {
  const n = Math.min(FRAME_COUNT, Math.max(1, frameNumber));
  const padded = String(n).padStart(3, "0");
  return new URL(`../new bg/ezgif-frame-${padded}.png`, import.meta.url).href;
}
