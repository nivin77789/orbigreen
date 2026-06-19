import type { ReactNode } from "react";

export type GlobalHub = {
  id: string;
  label: string;
  region: string;
  description: string;
  icon: ReactNode;
};

const stroke = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: "north-america",
    label: "North America",
    region: "Active Hub",
    description:
      "OEM programs, industrial buyers, and delivery coordination across the United States and Canada.",
    icon: (
      <svg {...stroke}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "south-america",
    label: "South America",
    region: "Active Hub",
    description:
      "Supplier development, fabrication, and logistics support across key manufacturing markets in Latin America.",
    icon: (
      <svg {...stroke}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "emea",
    label: "EMEA",
    region: "Active Hub",
    description:
      "Europe, Middle East, and Africa coverage — near-shore sourcing, compliance, and freight corridors.",
    icon: (
      <svg {...stroke}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "asia-pacific",
    label: "Asia Pacific",
    region: "Active Hub",
    description:
      "Deep manufacturing ecosystems with supplier networks, QA, and program management across the region.",
    icon: (
      <svg {...stroke}>
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 2v10l7 7" />
        <path d="M2 12h4" />
        <path d="M12 18v4" />
      </svg>
    ),
  },
];

export const NETWORK_CORRIDORS = [
  {
    t: "Asia Pacific",
    d: "Manufacturing depth, supplier diversity, and quality programs across the region.",
    tags: ["Castings", "Machining", "Assemblies"],
  },
  {
    t: "EMEA",
    d: "Near-shore access, compliance, and logistics gateways across Europe, Middle East, and Africa.",
    tags: ["Near-shore", "Compliance", "Freight"],
  },
  {
    t: "North America",
    d: "OEM partnerships and industrial buyer programs with end-to-end sourcing visibility.",
    tags: ["OEM Programs", "QA", "Delivery"],
  },
  {
    t: "South America",
    d: "Fabrication, assemblies, and regional supplier programs with coordinated export logistics.",
    tags: ["Fabrication", "Sourcing", "Logistics"],
  },
];
