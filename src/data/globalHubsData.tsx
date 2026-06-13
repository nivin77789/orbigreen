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
    id: "india",
    label: "India HQ",
    region: "Headquarters",
    description: "Central command for sourcing programs, engineering coordination, and client delivery.",
    icon: (
      <svg {...stroke}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12h12" />
        <path d="M6 16h12" />
        <path d="M6 8h12" />
      </svg>
    ),
  },
  {
    id: "china",
    label: "China",
    region: "Sourcing Hub",
    description: "Deep manufacturing ecosystem with broad category coverage and mature supplier networks.",
    icon: (
      <svg {...stroke}>
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
  {
    id: "vietnam",
    label: "Vietnam",
    region: "Manufacturing",
    description: "Fast-growing base for assemblies, fabrication, and competitive lead times.",
    icon: (
      <svg {...stroke}>
        <path d="M12 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
        <path d="M12 18v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2" />
        <path d="M18 12h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
        <path d="M6 12H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "turkey",
    label: "Turkey",
    region: "Near-shore",
    description: "Strategic near-shore option for Europe with flexible production capacity.",
    icon: (
      <svg {...stroke}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "europe",
    label: "Europe",
    region: "Client Network",
    description: "OEM partnerships and industrial buyer relationships across European markets.",
    icon: (
      <svg {...stroke}>
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5c1.7 1.7 2.5 4 2.5 6.5V21" />
        <path d="M11 17H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10" />
      </svg>
    ),
  },
  {
    id: "north-america",
    label: "North America",
    region: "Client Network",
    description: "Long-term OEM programs with transparent sourcing and quality assurance.",
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
    id: "middle-east",
    label: "Middle East",
    region: "Logistics",
    description: "Freight corridors and documentation support linking Asia to global delivery points.",
    icon: (
      <svg {...stroke}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11" />
        <path d="M15 18h2" />
        <path d="M19 18h2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    id: "japan",
    label: "Japan",
    region: "Partners",
    description: "Precision manufacturing partnerships and high-spec industrial supplier access.",
    icon: (
      <svg {...stroke}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export const NETWORK_CORRIDORS = [
  {
    t: "Asia-Pacific Corridor",
    d: "China · Vietnam · India · Japan — manufacturing depth and supplier diversity.",
    tags: ["Castings", "Machining", "Assemblies"],
  },
  {
    t: "Europe & MENA Corridor",
    d: "Turkey · Europe · Middle East — near-shore access and logistics gateways.",
    tags: ["Near-shore", "Compliance", "Freight"],
  },
  {
    t: "Americas Corridor",
    d: "North America client network with programs managed from India HQ.",
    tags: ["OEM Programs", "QA", "Delivery"],
  },
];
