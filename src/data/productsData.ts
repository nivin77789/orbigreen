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
  title: string;
  category: string;
  description: string;
  image: string;
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Castings",
    category: "Metalwork",
    description: "High-quality castings for diverse industrial applications.",
    image: imgCastings,
    accent: "#5CBF2A",
  },
  {
    id: 2,
    title: "Machining",
    category: "Precision",
    description: "CNC and precision machining for tight-tolerance components.",
    image: imgMachining,
    accent: "#0B5F7E",
  },
  {
    id: 3,
    title: "Fabrication",
    category: "Structural",
    description: "Custom metal fabrication for structural and industrial use.",
    image: imgFabrication,
    accent: "#8DD128",
  },
  {
    id: 4,
    title: "Pressure Vessels",
    category: "Tanks",
    description:
      "Engineered pressure vessels and industrial storage tanks compliant with international standards.",
    image: imgPressureVessels,
    accent: "#0B5F7E",
  },
  {
    id: 5,
    title: "Stamping Parts",
    category: "Assemblies",
    description: "Stamped metal parts and assemblies for high-volume production.",
    image: imgStamping,
    accent: "#5CBF2A",
  },
  {
    id: 6,
    title: "Proprietary Machines",
    category: "Custom",
    description: "Custom machinery and specialized components for unique manufacturing needs.",
    image: imgProprietary,
    accent: "#8DD128",
  },
  {
    id: 7,
    title: "Fasteners",
    category: "Fixings",
    description: "Industrial fasteners and fixing solutions for assembly and construction.",
    image: imgFasteners,
    accent: "#0B5F7E",
  },
  {
    id: 8,
    title: "Transmission & Gears",
    category: "Powertrain",
    description: "Transmission systems, gears, and power transmission components.",
    image: imgTransmission,
    accent: "#5CBF2A",
  },
  {
    id: 9,
    title: "Forging",
    category: "Metal Forming",
    description:
      "Closed-die, open-die, and precision forgings for industrial, automotive, and heavy-engineering applications.",
    image: imgCastings,
    accent: "#0B5F7E",
  },
  {
    id: 10,
    title: "Assemblies",
    category: "Integrated",
    description:
      "Sub-assemblies and fully integrated mechanical assemblies — sourced, inspected, and delivered ready for installation.",
    image: imgFabrication,
    accent: "#8DD128",
  },
];
