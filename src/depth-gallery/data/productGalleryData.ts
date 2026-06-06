import imgCastings from "../../products image/castings.png";
import imgMachining from "../../products image/machining.png";
import imgFabrication from "../../products image/fabrication.png";
import imgPressureVessels from "../../products image/pressure-vessels-tanks.png";
import imgStamping from "../../products image/stamping-parts-assemblies.png";
import imgProprietary from "../../products image/proprietary-machines-parts.png";
import imgFasteners from "../../products image/fasteners.png";
import imgTransmission from "../../products image/transmission-gears.png";

/** Orbigreen brand palette */
const BRAND = {
  primary: "#0B5F7E",
  secondary: "#5CBF2A",
  accent: "#8DD128",
  text: "#F8FAF9",
  section: "#F5F8F7",
  tealTint: "#E8F4F8",
  greenTint: "#F0FAEB",
  mintTint: "#E5F5DC",
} as const;

type Mood = {
  backgroundColor: string;
  blob1Color: string;
  blob2Color: string;
};

const MOODS: Mood[] = [
  { backgroundColor: BRAND.section, blob1Color: BRAND.secondary, blob2Color: BRAND.primary },
  { backgroundColor: BRAND.tealTint, blob1Color: BRAND.primary, blob2Color: BRAND.accent },
  { backgroundColor: BRAND.greenTint, blob1Color: BRAND.secondary, blob2Color: BRAND.primary },
  { backgroundColor: BRAND.mintTint, blob1Color: BRAND.accent, blob2Color: BRAND.primary },
];

const PRODUCTS = [
  {
    textureSrc: imgCastings,
    position: { x: -0.9, y: 0 },
    label: {
      word: "Castings",
      category: "Metalwork",
      description: "High-quality castings for diverse industrial applications.",
    },
  },
  {
    textureSrc: imgMachining,
    position: { x: 0.8, y: 0 },
    label: {
      word: "Machining",
      category: "Precision",
      description: "CNC and precision machining for tight-tolerance components.",
    },
  },
  {
    textureSrc: imgFabrication,
    position: { x: -0.7, y: 0 },
    label: {
      word: "Fabrication",
      category: "Structural",
      description: "Custom metal fabrication for structural and industrial use.",
    },
  },
  {
    textureSrc: imgPressureVessels,
    position: { x: 1, y: 0 },
    label: {
      word: "Pressure Vessels",
      category: "Tanks",
      description:
        "Engineered pressure vessels and industrial storage tanks compliant with international standards.",
    },
  },
  {
    textureSrc: imgStamping,
    position: { x: -0.7, y: 0 },
    label: {
      word: "Stamping Parts",
      category: "Assemblies",
      description: "Stamped metal parts and assemblies for high-volume production.",
    },
  },
  {
    textureSrc: imgProprietary,
    position: { x: 0.85, y: 0 },
    label: {
      word: "Proprietary Machines",
      category: "Custom",
      description: "Custom machinery and specialized components for unique manufacturing needs.",
    },
  },
  {
    textureSrc: imgFasteners,
    position: { x: -0.8, y: 0 },
    label: {
      word: "Fasteners",
      category: "Fixings",
      description: "Industrial fasteners and fixing solutions for assembly and construction.",
    },
  },
  {
    textureSrc: imgTransmission,
    position: { x: 0.9, y: 0 },
    label: {
      word: "Transmission & Gears",
      category: "Powertrain",
      description: "Transmission systems, gears, and power transmission components.",
    },
  },
];

export const productGalleryPlaneData = PRODUCTS.map((product, index) => {
  const mood = MOODS[index % MOODS.length];

  return {
    fallbackColor: BRAND.primary,
    accentColor: index % 2 === 0 ? BRAND.secondary : BRAND.accent,
    textureSrc: product.textureSrc,
    position: product.position,
    backgroundColor: mood.backgroundColor,
    blob1Color: mood.blob1Color,
    blob2Color: mood.blob2Color,
    label: {
      ...product.label,
      color: BRAND.primary,
      highlight: index % 3 === 0 ? BRAND.secondary : index % 3 === 1 ? BRAND.accent : BRAND.primary,
    },
  };
});
