import imgConsultancy from "../services image/consultancy-advisory.webp";
import imgSourcing from "../services image/global-sourcing.webp";
import imgEngineering from "../services image/engineering-services.webp";
import imgQuality from "../services image/quality-inspection.webp";
import imgSite from "../services image/site-installation.webp";
import imgLogistics from "../services image/transport-logistics.webp";

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
    title: "Business Coaching, Consultancy & Advisory",
    shortDescription:
      "Strategic guidance to strengthen sourcing, procurement, and supply chain performance.",
    image: imgConsultancy,
    accent: "#5CBF2A",
    sectionTitle: "Practical Expertise for Better Business Decisions",
    overview:
      "We help businesses improve sourcing, procurement, and supply chain performance through practical coaching and strategic advisory. Whether you're establishing procurement processes, evaluating suppliers, optimizing costs, or scaling operations, we provide objective guidance backed by industry experience.",
    focusLabel: "Key Focus Areas",
    items: [
      "Business & procurement coaching",
      "Supply chain strategy",
      "Supplier evaluation & qualification",
      "Strategic sourcing",
      "Cost optimization",
      "Process improvement",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "We combine commercial insight with practical execution to help businesses make informed sourcing decisions, reduce operational risk, and build resilient supply chains. Our approach is collaborative, transparent, and focused on delivering measurable business outcomes. Our experts combine hands-on industry experience with proven methodologies to develop internal capabilities, improve supplier performance, reduce total cost of ownership, and enhance supply chain resilience.",
    quote: "Developing procurement capabilities. Delivering supply chain excellence.",
  },
  {
    slug: "global-sourcing",
    title: "Global Sourcing",
    shortDescription: "Strategic Supplier Access. Global Manufacturing Reach.",
    image: imgSourcing,
    accent: "#0B5F7E",
    sectionTitle: "Strategic Supplier Access. Global Manufacturing Reach.",
    overview:
      "We connect organizations with qualified manufacturers and specialized suppliers across global sourcing markets, ensuring optimal cost, quality, capacity, and delivery performance.",
    focusLabel: "Capabilities",
    items: [
      "Supplier Discovery & Qualification",
      "Global Vendor Development",
      "RFQ & Commercial Management",
      "Multi-Source Procurement Strategies",
      "Cost Benchmarking & Negotiation",
      "Supply Risk Mitigation",
      "Alternate Source Development",
      "Market Intelligence",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "Our sourcing specialists combine technical expertise, supplier intelligence, and rigorous qualification processes to secure dependable supply chains and sustainable procurement advantages.",
    quote: "Enabling resilient supply networks through strategic global sourcing.",
  },
  {
    slug: "engineering-services",
    title: "Engineering Services",
    shortDescription: "Engineering Excellence. Manufacturing Ready.",
    image: imgEngineering,
    accent: "#8DD128",
    sectionTitle: "Engineering Excellence. Manufacturing Ready.",
    overview:
      "Comprehensive engineering support to accelerate product development, optimize manufacturability, and enable seamless transition from design to production.",
    focusLabel: "Core Capabilities",
    items: [
      "Design & Detail Engineering",
      "Design for Manufacturing (DFM)",
      "Reverse Engineering",
      "Technical Feasibility Studies",
      "Manufacturing Process Development",
      "CAD Modelling & Drawing Support",
      "Value Engineering",
      "Engineering Documentation",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "We bridge engineering and manufacturing by delivering practical, production-focused solutions that reduce development cycles, improve product performance, and enhance manufacturing efficiency.",
    quote: "Engineering solutions built for production, performance, and scale.",
  },
  {
    slug: "quality-inspection",
    title: "Quality & Inspection Services",
    shortDescription:
      "Mitigate quality risks and ensure manufacturing compliance through comprehensive inspection, audit, and supplier quality assurance programs.",
    image: imgQuality,
    accent: "#0B5F7E",
    sectionTitle: "Independent Quality Assurance",
    overview:
      "Mitigate quality risks and ensure manufacturing compliance through comprehensive inspection, audit, and supplier quality assurance programs.",
    focusLabel: "Expertise",
    items: [
      "Factory Qualification Audits",
      "Supplier Quality Assurance",
      "Production Surveillance",
      "Pre-Shipment Verification",
      "Technical Compliance Assessment",
      "Dimensional & Process Validation",
      "Quality Documentation Review",
      "Root Cause & Corrective Action Support",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "We provide independent quality oversight to improve supplier performance, minimize defects, and ensure conformance to technical, regulatory, and contractual requirements.",
    quote: "Independent quality assurance for reliable manufacturing outcomes.",
  },
  {
    slug: "site-installation",
    title: "Site & Installation Services",
    shortDescription:
      "Technical site support for installation, supervision, commissioning, and project execution.",
    image: imgSite,
    accent: "#5CBF2A",
    sectionTitle: "Technical Expertise from Installation to Commissioning",
    overview:
      "We provide experienced technical personnel to support on-site execution across industrial and infrastructure projects. From installation planning and supervision to commissioning and final handover, we ensure work is executed in accordance with engineering specifications, project schedules, and safety requirements.",
    focusLabel: "Core Services",
    items: [
      "Site supervision & project coordination",
      "Mechanical & equipment installation",
      "Erection supervision",
      "Commissioning & start-up support",
      "Contractor coordination",
      "Technical inspection & compliance",
      "Progress monitoring & reporting",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "Our teams work alongside clients, EPC contractors, and equipment manufacturers to coordinate site activities, resolve technical challenges, and maintain execution quality throughout the project lifecycle. We focus on safe execution, schedule adherence, and engineering compliance to ensure successful project delivery.",
    quote: "Engineering-led site execution, delivered with precision, safety, and accountability.",
  },
  {
    slug: "transport-logistics",
    title: "Logistics",
    shortDescription:
      "End-to-end logistics coordination for efficient, compliant, and reliable global deliveries.",
    image: imgLogistics,
    accent: "#8DD128",
    sectionTitle: "Reliable Logistics. Predictable Delivery.",
    overview:
      "Efficient logistics is critical to supply chain performance. We coordinate freight movement, export documentation, customs processes, and delivery scheduling to ensure materials and equipment reach their destination safely, on time, and in full compliance with international trade requirements.",
    focusLabel: "Core Services",
    items: [
      "International freight coordination",
      "Air, sea & road transportation",
      "Export & customs documentation",
      "Customs clearance support",
      "Warehouse & inventory coordination",
      "Shipment tracking & delivery management",
    ],
    partnerTitle: "Why Partner With Us?",
    partnerDescription:
      "Working with a global network of logistics providers, we manage transportation, documentation, and delivery milestones to reduce transit risks and improve supply chain visibility. Our structured logistics approach ensures reliable execution from supplier dispatch to final destination.",
    quote: "Delivering supply chains with precision, compliance, and complete logistical control.",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
