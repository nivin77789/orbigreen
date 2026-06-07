import imgConsultancy from "../services image/consultancy-advisory.png";
import imgSourcing from "../services image/global-sourcing.png";
import imgEngineering from "../services image/engineering-services.png";
import imgQuality from "../services image/quality-inspection.png";
import imgSite from "../services image/site-installation.png";

export type ServiceDetail = {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  accent: string;
  sectionTitle: string;
  overview: string;
  focusLabel: string;
  items: string[];
  partnerTitle: string;
  partnerDescription: string;
  quote: string;
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "consultancy-advisory",
    title: "Training, Consultancy & Advisory",
    shortDescription:
      "Professional consulting services to help businesses optimize procurement and sourcing.",
    image: imgConsultancy,
    accent: "#5CBF2A",
    sectionTitle: "Transforming Your Supply Chain Strategy",
    overview:
      "Navigating the complexities of global procurement requires unparalleled expertise and insight. Our consultancy and advisory services are meticulously tailored to empower your business with strategic guidance, reducing costs while maximizing efficiency and reliability.",
    focusLabel: "Key Focus Areas",
    items: [
      "Supply chain strategy",
      "Procurement advisory",
      "Cost optimization",
      "Supplier evaluation",
      "Sourcing transformation",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "Our team brings decades of combined experience across multi-national industries, deploying data-backed methodologies to uncover hidden value in your supply chain and procurement structures.",
    quote:
      "Driving competitive advantage through optimized strategic sourcing, enabling businesses to scale profitably.",
  },
  {
    slug: "global-sourcing",
    title: "Global Sourcing",
    shortDescription:
      "International sourcing solutions to connect you with the best suppliers worldwide.",
    image: imgSourcing,
    accent: "#0B5F7E",
    sectionTitle: "Connecting You Globally",
    overview:
      "Overcome geographical boundaries with our premier global sourcing capabilities. We identify, qualify, and manage top-tier vendors worldwide, guaranteeing you secure access to high-quality materials and cost-effective resourcing that meets your exacting standards.",
    focusLabel: "Capabilities Include",
    items: [
      "Supplier identification",
      "Vendor qualification",
      "Procurement management",
      "Cost-effective sourcing",
    ],
    partnerTitle: "Our Extensive Network",
    partnerDescription:
      "With an expansive network spanning multiple continents and diverse manufacturing hubs, we mitigate supplier risks while opening doors to unparalleled production capacities and emerging markets.",
    quote:
      "Bridging global markets to deliver tailored sourcing solutions with unfailing reliability.",
  },
  {
    slug: "engineering-services",
    title: "Engineering Services",
    shortDescription:
      "Engineering support for manufacturing projects from concept to production.",
    image: imgEngineering,
    accent: "#8DD128",
    sectionTitle: "From Concept to Reality",
    overview:
      "Bring your ideas to life and scale your manufacturing with our end-to-end engineering support. We assist your technical teams in finalizing designs, evaluating feasibility, and implementing effective manufacturing methodologies to ensure your product hits the market successfully.",
    focusLabel: "Core Competencies",
    items: [
      "Design engineering",
      "Technical evaluation",
      "Product development",
      "Manufacturing engineering",
    ],
    partnerTitle: "Technical Excellence",
    partnerDescription:
      "Our team of industry-leading engineers applies rigorous evaluation frameworks to bridge the gap between initial ideation and final-scale production, resolving pain points preemptively.",
    quote:
      "Precision-driven engineering accelerating development pipelines and securing product lifecycles.",
  },
  {
    slug: "quality-inspection",
    title: "Quality & Inspection Services",
    shortDescription:
      "Quality assurance throughout the supply chain ensuring compliance and excellence.",
    image: imgQuality,
    accent: "#0B5F7E",
    sectionTitle: "Uncompromising Compliance",
    overview:
      "Protecting your brand reputation requires absolute certainty. Our comprehensive quality assurance services guarantee that every unit produced meets rigorous international standards and precise client specification, stopping errors before they disrupt your chain.",
    focusLabel: "Inspection Details",
    items: [
      "Factory inspection",
      "Production monitoring",
      "Quality audits",
      "Compliance checks",
    ],
    partnerTitle: "Auditing at Source",
    partnerDescription:
      "Our boots-on-the-ground approach ensures thorough factory audits and localized production monitoring, granting full visibility and shielding our clients from non-compliance.",
    quote:
      "Fortifying your products with an unwavering commitment to quality assurance at every production stage.",
  },
  {
    slug: "site-installation",
    title: "Site & Installation Services",
    shortDescription:
      "Support during project implementation for smooth, on-time delivery.",
    image: imgSite,
    accent: "#5CBF2A",
    sectionTitle: "Seamless Implementations",
    overview:
      "Completing a project successfully depends heavily on proper installation and commissioning. Our dedicated site services teams supervise operations directly on-site, ensuring complex equipment is seamlessly integrated and optimally functional from day one.",
    focusLabel: "Operational Support",
    items: [
      "On-site supervision",
      "Equipment installation",
      "Commissioning",
      "Operational support",
    ],
    partnerTitle: "Expert Mobilization",
    partnerDescription:
      "Our personnel bring localized logistical solutions directly to your facilities, reducing setup times and minimizing unnecessary operational downtime.",
    quote:
      "Delivering reliable, hands-on construction and technical installation that guarantees operational continuity.",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
