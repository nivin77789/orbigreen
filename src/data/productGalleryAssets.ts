const galleryModules = import.meta.glob<string>("../assets/Photos Orbi 2/Product Categories/**/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const SLUG_FOLDER_MAP: Record<string, string> = {
  castings: "Casting",
  forging: "Forging",
  machining: "Machining",
  fabrication: "Fabrication",
  "pressure-vessels": "Pressure Vessels",
  fasteners: "Fasteners",
  "transmission-gears": "Transmission & Gears",
  "stamping-parts": "Stamping Parts",
  assemblies: "Assemblies",
  "proprietary-machines": "Proprietary Machines",
};

function folderFromPath(path: string): string | null {
  const match = path.match(/Product Categories\/([^/]+)\//);
  return match?.[1] ?? null;
}

function buildGalleryIndex(): Map<string, string[]> {
  const byFolder = new Map<string, string[]>();

  for (const [path, url] of Object.entries(galleryModules)) {
    const folder = folderFromPath(path);
    if (!folder) continue;

    const list = byFolder.get(folder) ?? [];
    list.push(url);
    byFolder.set(folder, list);
  }

  for (const [folder, urls] of byFolder) {
    byFolder.set(
      folder,
      [...urls].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    );
  }

  return byFolder;
}

const galleriesByFolder = buildGalleryIndex();

export function getProductGalleryImages(slug: string, fallback: string): string[] {
  const folder = SLUG_FOLDER_MAP[slug];
  if (!folder) return [fallback];

  const images = galleriesByFolder.get(folder);
  if (!images?.length) return [fallback];

  return images;
}

export function getProductCoverImage(slug: string, fallback: string): string {
  return getProductGalleryImages(slug, fallback)[0];
}
