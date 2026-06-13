import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");

const JOBS = [
  {
    dir: "src/assets",
    maxWidth: 1280,
    quality: 82,
    format: "webp",
  },
  {
    dir: "src/products image",
    maxWidth: 720,
    quality: 78,
    format: "webp",
  },
  {
    dir: "src/services image",
    maxWidth: 720,
    quality: 78,
    format: "webp",
  },
  {
    file: "src/logo.png",
    maxWidth: 480,
    format: "png",
    compressionLevel: 9,
  },
  {
    file: "public/favicon.png",
    maxWidth: 128,
    format: "png",
    compressionLevel: 9,
  },
];

async function optimizeFile(filePath, options) {
  const input = path.join(ROOT, filePath);
  const ext = path.extname(filePath);
  const base = filePath.slice(0, -ext.length);
  const outputPath =
    options.format === "webp" ? path.join(ROOT, `${base}.webp`) : path.join(ROOT, filePath);

  const before = (await fs.stat(input)).size;
  const image = sharp(input);
  const meta = await image.metadata();
  const resizeWidth = meta.width && meta.width > options.maxWidth ? options.maxWidth : undefined;

  let pipeline = sharp(input).rotate();
  if (resizeWidth) {
    pipeline = pipeline.resize({ width: resizeWidth, withoutEnlargement: true });
  }

  if (options.format === "webp") {
    await pipeline.webp({ quality: options.quality, effort: 6 }).toFile(outputPath);
    if (outputPath !== input && ext.toLowerCase() !== ".webp") {
      await fs.unlink(input);
    }
  } else {
    const tempPath = `${outputPath}.tmp`;
    await pipeline
      .png({ compressionLevel: options.compressionLevel ?? 9, palette: false })
      .toFile(tempPath);
    await fs.rename(tempPath, outputPath);
  }

  const after = (await fs.stat(outputPath)).size;

  return {
    file: path.relative(ROOT, outputPath),
    before,
    after,
    saved: before - after,
  };
}

async function run() {
  const results = [];

  for (const job of JOBS) {
    if (job.file) {
      results.push(await optimizeFile(job.file, job));
      continue;
    }

    const dirPath = path.join(ROOT, job.dir);
    const entries = await fs.readdir(dirPath);
    for (const entry of entries) {
      if (!/\.(png|jpe?g|webp)$/i.test(entry)) continue;
      if (entry.endsWith(".webp") && job.format === "webp") continue;
      results.push(await optimizeFile(path.join(job.dir, entry), job));
    }
  }

  const totalBefore = results.reduce((sum, r) => sum + r.before, 0);
  const totalAfter = results.reduce((sum, r) => sum + r.after, 0);

  console.log("Optimized images (hero frames excluded):\n");
  for (const r of results.sort((a, b) => b.saved - a.saved)) {
    const pct = r.before ? Math.round((1 - r.after / r.before) * 100) : 0;
    console.log(
      `${r.file}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB (${pct}% smaller)`,
    );
  }
  console.log(
    `\nTotal: ${(totalBefore / 1024).toFixed(0)}KB → ${(totalAfter / 1024).toFixed(0)}KB (${Math.round((1 - totalAfter / totalBefore) * 100)}% reduction)`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
