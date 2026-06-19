/** Total frames in src/latest bg frames/ */
export const FRAME_COUNT = 240;

/** Scroll progress (0–1) → 1-based frame number, synced to storytelling beats. */
export function scrollProgressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));

  if (p < 0.15) {
    return Math.round(1 + (p / 0.15) * 35);
  }
  if (p < 0.45) {
    return Math.round(37 + ((p - 0.15) / 0.3) * 71);
  }
  if (p < 0.85) {
    return Math.round(109 + ((p - 0.45) / 0.4) * 95);
  }
  return Math.round(205 + ((p - 0.85) / 0.15) * 35);
}

export function frameUrl(frameNumber: number): string {
  const n = Math.min(FRAME_COUNT, Math.max(1, frameNumber));
  const padded = String(n).padStart(3, "0");
  return `/hero-bg-frames/ezgif-frame-${padded}.webp`;
}
