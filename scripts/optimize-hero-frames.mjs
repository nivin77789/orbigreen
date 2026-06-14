import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "src/new background image frames");
const OUTPUT_DIR = path.join(ROOT, "public/hero-bg-frames");

const MAX_WIDTH = 1024;
const QUALITY = 74;
const TARGET_TOTAL_MB = 4.6;

async function optimizeFrame(input, output) {
  return sharp(input)
    .rotate()
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.7, m1: 0.5, m2: 0.35, x1: 2, y2: 10, y3: 20 })
    .webp({
      quality: QUALITY,
      effort: 6,
      smartSubsample: false,
      alphaQuality: 100,
    })
    .toFile(output);
}

async function run() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const entries = (await fs.readdir(SOURCE_DIR))
    .filter((name) => /^ezgif-frame-\d+\.png$/i.test(name))
    .sort();

  let totalBefore = 0;
  let totalAfter = 0;

  for (const entry of entries) {
    const input = path.join(SOURCE_DIR, entry);
    const output = path.join(OUTPUT_DIR, entry.replace(/\.png$/i, ".webp"));
    const before = (await fs.stat(input)).size;
    totalBefore += before;

    await optimizeFrame(input, output);

    const after = (await fs.stat(output)).size;
    totalAfter += after;
  }

  const pct = totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;
  const totalMb = totalAfter / 1024 / 1024;
  console.log(
    `Optimized ${entries.length} hero frames → public/hero-bg-frames/*.webp\n` +
      `${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${totalMb.toFixed(1)}MB (${pct}% smaller, target ≤${TARGET_TOTAL_MB}MB)`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
