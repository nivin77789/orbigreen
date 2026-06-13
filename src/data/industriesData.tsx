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
    name: "Automotive",
    tagline: "Chassis, powertrain & stamped parts",
    icon: (
      <svg {...stroke}>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
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
    name: "White Goods",
    tagline: "Stamped housings & appliance parts",
    icon: (
      <svg {...stroke}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M5 10h14" />
        <path d="M9 6h.01" />
        <path d="M9 14h6" />
        <path d="M9 18h4" />
      </svg>
    ),
  },
  {
    name: "Aerospace",
    tagline: "Traceable machining & fabrication",
    icon: (
      <svg {...stroke}>
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
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
    name: "Electronics",
    tagline: "Enclosures, brackets & housings",
    icon: (
      <svg {...stroke}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v2" />
        <path d="M15 2v2" />
        <path d="M9 20v2" />
        <path d="M15 20v2" />
        <path d="M2 9h2" />
        <path d="M2 15h2" />
        <path d="M20 9h2" />
        <path d="M20 15h2" />
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
