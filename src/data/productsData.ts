import imgCastings from "../products image/castings.webp";
import imgMachining from "../products image/machining.webp";
import imgFabrication from "../products image/fabrication.webp";
import imgPressureVessels from "../products image/pressure-vessels-tanks.webp";
import imgStamping from "../products image/stamping-parts-assemblies.webp";
import imgProprietary from "../products image/proprietary-machines-parts.webp";
import imgFasteners from "../products image/fasteners.webp";
import imgTransmission from "../products image/transmission-gears.webp";

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

const GALLERY_POOL = [
  imgCastings,
  imgMachining,
  imgFabrication,
  imgPressureVessels,
  imgStamping,
  imgProprietary,
  imgFasteners,
  imgTransmission,
];

function buildGallery(main: string, offset: number): string[] {
  const pool = GALLERY_POOL.filter((img) => img !== main);
  const picks = [main];

  for (let i = 0; picks.length < 4; i += 1) {
    picks.push(pool[(offset + i) % pool.length]);
  }

  return picks;
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
    image: imgCastings,
    gallery: buildGallery(imgCastings, 0),
    accent: "#5CBF2A",
  },
  {
    id: 2,
    slug: "forging",
    title: "Forging",
    category: "Metal Forming",
    description:
      "Closed-die, open-die, and precision forgings for industrial, automotive, and heavy-engineering applications.",
    image: imgCastings,
    gallery: buildGallery(imgCastings, 1),
    accent: "#0B5F7E",
  },
  {
    id: 3,
    slug: "machining",
    title: "Machining",
    category: "Precision",
    description: "CNC and precision machining for tight-tolerance components.",
    image: imgMachining,
    gallery: buildGallery(imgMachining, 2),
    accent: "#0B5F7E",
  },
  {
    id: 4,
    slug: "fabrication",
    title: "Fabrication",
    category: "Structural",
    description: "Custom metal fabrication for structural and industrial use.",
    image: imgFabrication,
    gallery: buildGallery(imgFabrication, 3),
    accent: "#8DD128",
  },
  {
    id: 5,
    slug: "pressure-vessels",
    title: "Pressure Vessels",
    category: "Tanks",
    description:
      "Engineered pressure vessels and industrial storage tanks compliant with international standards.",
    image: imgPressureVessels,
    gallery: buildGallery(imgPressureVessels, 4),
    accent: "#0B5F7E",
  },
  {
    id: 6,
    slug: "stamping-parts",
    title: "Stamping Parts",
    category: "Assemblies",
    description: "Stamped metal parts and assemblies for high-volume production.",
    image: imgStamping,
    gallery: buildGallery(imgStamping, 5),
    accent: "#5CBF2A",
  },
  {
    id: 7,
    slug: "proprietary-machines",
    title: "Proprietary Machines",
    category: "Custom",
    description: "Custom machinery and specialized components for unique manufacturing needs.",
    image: imgProprietary,
    gallery: buildGallery(imgProprietary, 6),
    accent: "#8DD128",
  },
  {
    id: 8,
    slug: "fasteners",
    title: "Fasteners",
    category: "Fixings",
    description: "Industrial fasteners and fixing solutions for assembly and construction.",
    image: imgFasteners,
    gallery: buildGallery(imgFasteners, 7),
    accent: "#0B5F7E",
  },
  {
    id: 9,
    slug: "transmission-gears",
    title: "Transmission & Gears",
    category: "Powertrain",
    description: "Transmission systems, gears, and power transmission components.",
    image: imgTransmission,
    gallery: buildGallery(imgTransmission, 0),
    accent: "#5CBF2A",
  },
  {
    id: 10,
    slug: "assemblies",
    title: "Assemblies",
    category: "Integrated",
    description:
      "Sub-assemblies and fully integrated mechanical assemblies — sourced, inspected, and delivered ready for installation.",
    image: imgFabrication,
    gallery: buildGallery(imgFabrication, 2),
    accent: "#8DD128",
  },
];
