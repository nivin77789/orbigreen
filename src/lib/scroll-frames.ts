/** Total frames in ./hero-bg-image-frames/ (001 – 120). */
export const FRAME_COUNT = 120;

/** Scroll progress (0–1) → 1-based frame number, synced to storytelling beats. */
export function scrollProgressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));

  if (p < 0.15) {
    // Hero / intro: frames 1–18
    return Math.round(1 + (p / 0.15) * 17);
  }
  if (p < 0.45) {
    // Metrics & services: frames 19–54
    return Math.round(19 + ((p - 0.15) / 0.3) * 35);
  }
  if (p < 0.85) {
    // Workflow: frames 55–102
    return Math.round(55 + ((p - 0.45) / 0.4) * 47);
  }
  // Reassembly & closing: frames 103–120
  return Math.round(103 + ((p - 0.85) / 0.15) * 17);
}

export function frameUrl(frameNumber: number): string {
  const n = Math.min(FRAME_COUNT, Math.max(1, frameNumber));
  return `/hero-bg-image-frames/${String(n).padStart(3, "0")}.jpg`;
}
