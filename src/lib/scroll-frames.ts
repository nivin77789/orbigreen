const frameModules = import.meta.glob<string>(
  "../hero bg image frames/ezgif-frame-*.png",
  { eager: true, import: "default" },
);

const sortedFrameUrls = Object.entries(frameModules)
  .sort(([pathA], [pathB]) => {
    const num = (p: string) => Number(p.match(/ezgif-frame-(\d+)\.png/)?.[1] ?? 0);
    return num(pathA) - num(pathB);
  })
  .map(([, url]) => url);

/** Total frames in src/hero bg image frames/ */
export const FRAME_COUNT = sortedFrameUrls.length;

/** Scroll progress (0–1) → 1-based frame number, synced to storytelling beats. */
export function scrollProgressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));

  if (p < 0.15) {
    // Hero / intro: frames 1–36
    return Math.round(1 + (p / 0.15) * 35);
  }
  if (p < 0.45) {
    // Metrics & services: frames 37–108
    return Math.round(37 + ((p - 0.15) / 0.3) * 71);
  }
  if (p < 0.85) {
    // Workflow: frames 109–204
    return Math.round(109 + ((p - 0.45) / 0.4) * 95);
  }
  // Reassembly & closing: frames 205–240
  return Math.round(205 + ((p - 0.85) / 0.15) * 35);
}

export function frameUrl(frameNumber: number): string {
  const n = Math.min(FRAME_COUNT, Math.max(1, frameNumber));
  return sortedFrameUrls[n - 1];
}
