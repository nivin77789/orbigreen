import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "src/new background image frames");
const OUTPUT_DIR = path.join(ROOT, "public/hero-bg-frames");

const MAX_WIDTH = 1024;
const QUALITY = 72;

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

    await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(output);

    const after = (await fs.stat(output)).size;
    totalAfter += after;
  }

  const pct = totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;
  console.log(
    `Optimized ${entries.length} hero frames → public/hero-bg-frames/*.webp\n` +
      `${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${pct}% smaller)`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
