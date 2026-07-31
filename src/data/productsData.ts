import imgCastings from "../products image/castings.webp";
import imgMachining from "../products image/machining.webp";
import imgFabrication from "../products image/fabrication.webp";
import imgPressureVessels from "../products image/pressure-vessels-tanks.webp";
import imgStamping from "../products image/stamping-parts-assemblies.webp";
import imgProprietary from "../products image/proprietary-machines-parts.webp";
import imgFasteners from "../products image/fasteners.webp";
import imgTransmission from "../products image/transmission-gears.webp";
import { getProductCoverImage, getProductGalleryImages } from "@/data/productGalleryAssets";

export type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  accent: string;
};

const FALLBACK_IMAGES: Record<string, string> = {
  castings: imgCastings,
  forging: imgFabrication,
  machining: imgMachining,
  fabrication: imgFabrication,
  "pressure-vessels": imgPressureVessels,
  "stamping-parts": imgStamping,
  "proprietary-machines": imgProprietary,
  fasteners: imgFasteners,
  "transmission-gears": imgTransmission,
  assemblies: imgFabrication,
};

const THUMBNAIL_OVERRIDES: Record<string, string> = {
  castings: imgCastings,
};

function productImages(slug: string): { image: string; gallery: string[] } {
  const fallback = FALLBACK_IMAGES[slug] ?? imgFabrication;
  const gallery = getProductGalleryImages(slug, fallback);
  return {
    image: THUMBNAIL_OVERRIDES[slug] ?? getProductCoverImage(slug, fallback),
    gallery,
  };
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "castings",
    title: "Castings",
    category: "Metalwork",
    description: "High-quality castings for diverse industrial applications.",
    ...productImages("castings"),
    accent: "#5CBF2A",
  },
  {
    id: 2,
    slug: "forging",
    title: "Forging",
    category: "Metal Forming",
    description:
      "Closed-die, open-die, and precision forgings for industrial, automotive, and heavy-engineering applications.",
    ...productImages("forging"),
    accent: "#0B5F7E",
  },
  {
    id: 3,
    slug: "machining",
    title: "Machining",
    category: "Precision",
    description: "CNC and precision machining for tight-tolerance components.",
    ...productImages("machining"),
    accent: "#0B5F7E",
  },
  {
    id: 4,
    slug: "fabrication",
    title: "Fabrication",
    category: "Structural",
    description: "Custom metal fabrication for structural and industrial use.",
    ...productImages("fabrication"),
    accent: "#8DD128",
  },
  {
    id: 5,
    slug: "pressure-vessels",
    title: "Pressure Vessels",
    category: "Tanks",
    description:
      "Engineered pressure vessels and industrial storage tanks compliant with international standards.",
    ...productImages("pressure-vessels"),
    accent: "#0B5F7E",
  },
  {
    id: 6,
    slug: "stamping-parts",
    title: "Stamping Parts",
    category: "Assemblies",
    description: "Stamped metal parts and assemblies for high-volume production.",
    ...productImages("stamping-parts"),
    accent: "#5CBF2A",
  },
  {
    id: 7,
    slug: "proprietary-machines",
    title: "Proprietary Machines",
    category: "Custom",
    description: "Custom machinery and specialized components for unique manufacturing needs.",
    ...productImages("proprietary-machines"),
    accent: "#8DD128",
  },
  {
    id: 8,
    slug: "fasteners",
    title: "Fasteners",
    category: "Fixings",
    description: "Industrial fasteners and fixing solutions for assembly and construction.",
    ...productImages("fasteners"),
    accent: "#0B5F7E",
  },
  {
    id: 9,
    slug: "transmission-gears",
    title: "Transmission & Gears",
    category: "Powertrain",
    description: "Transmission systems, gears, and power transmission components.",
    ...productImages("transmission-gears"),
    accent: "#5CBF2A",
  },
  {
    id: 10,
    slug: "assemblies",
    title: "Assemblies",
    category: "Integrated",
    description:
      "Sub-assemblies and fully integrated mechanical assemblies — sourced, inspected, and delivered ready for installation.",
    ...productImages("assemblies"),
    accent: "#8DD128",
  },
];
