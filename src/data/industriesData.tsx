import type { ReactNode } from "react";

type IndustryItem = {
  name: string;
  tagline: string;
  icon: ReactNode;
};

const stroke = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const INDUSTRIES: IndustryItem[] = [
  {
    name: "Oil & Gas",
    tagline: "Pressure vessels, skids & piping",
    icon: (
      <svg {...stroke}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "Power & Energy",
    tagline: "Turbines, boilers & grid components",
    icon: (
      <svg {...stroke}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "Pulp And Paper",
    tagline: "Pulp mills, paper machinery & rolls",
    icon: (
      <svg {...stroke}>
        <path d="M6 3h12v18H6z" />
        <path d="M6 8h12" />
        <path d="M6 13h12" />
        <path d="M6 18h12" />
        <path d="M9 3v18" />
      </svg>
    ),
  },
  {
    name: "Chemical Industry",
    tagline: "Reactors, vessels & process equipment",
    icon: (
      <svg {...stroke}>
        <path d="M10 2v6l-4 9a2 2 0 0 0 1.8 3h8.4a2 2 0 0 0 1.8-3l-4-9V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    name: "Textile",
    tagline: "Spinning, weaving & processing machinery",
    icon: (
      <svg {...stroke}>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.5 8.5 10.5 15.5" />
        <path d="M15.5 15.5 17.5 8.5" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
  {
    name: "Effluent Treatment Plant",
    tagline: "Water treatment skids & filtration systems",
    icon: (
      <svg {...stroke}>
        <path d="M12 2c-3 4-6 6-6 10a6 6 0 0 0 12 0c0-4-3-6-6-10z" />
        <path d="M8 22h8" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    name: "Construction",
    tagline: "Structural steel & heavy equipment",
    icon: (
      <svg {...stroke}>
        <path d="m2 20 10-8 4 4 8-10" />
        <path d="M18 6h3v3" />
        <path d="M2 20h20" />
        <path d="M6 20v-4" />
        <path d="M10 20v-6" />
        <path d="M14 20v-2" />
      </svg>
    ),
  },
  {
    name: "Off-Highway",
    tagline: "Drivetrain, hydraulics & chassis",
    icon: (
      <svg {...stroke}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11" />
        <path d="M15 18h2" />
        <path d="M19 18h2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M5 12h4" />
      </svg>
    ),
  },
  {
    name: "Agriculture",
    tagline: "Tractor & harvester components",
    icon: (
      <svg {...stroke}>
        <path d="M12 22V12" />
        <path d="M12 12c-3-4-7-4-7-8a7 7 0 0 1 14 0c0 4-4 4-7 8z" />
        <path d="M5 22h14" />
      </svg>
    ),
  },
  {
    name: "Railways",
    tagline: "Bogie, brake & rail-grade parts",
    icon: (
      <svg {...stroke}>
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="m8 19-2 3" />
        <path d="m18 22-2-3" />
        <path d="m8 15 2 2 2-2 2 2 2-2" />
      </svg>
    ),
  },
  {
    name: "Mining",
    tagline: "Wear parts & heavy fabrications",
    icon: (
      <svg {...stroke}>
        <path d="M14.5 18.5 17 21" />
        <path d="m9 11-5.5 5.5a2.12 2.12 0 0 0 0 3L9 19" />
        <path d="m15 5 4 4" />
        <path d="m2 22 8-8" />
        <path d="m3.47 12.53 5 5" />
        <path d="m13 3 6 6" />
        <path d="m8 8 8 8" />
      </svg>
    ),
  },
  {
    name: "Industrial Machinery",
    tagline: "Custom parts & OEM assemblies",
    icon: (
      <svg {...stroke}>
        <path d="M12 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
        <path d="M12 18v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2" />
        <path d="M18 12h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
        <path d="M6 12H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9V6" />
        <path d="M12 18v-3" />
        <path d="M15 12h3" />
        <path d="M6 12h3" />
      </svg>
    ),
  },
];
