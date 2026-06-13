export type FaqItem = {
  question: string;
  cta: string;
  href: string;
};

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Are your procurement costs higher than they should be?",
    cta: "Global Sourcing",
    href: "/services/global-sourcing",
  },
  {
    question: "Need expert support for equipment erection and commissioning?",
    cta: "Site & Installation",
    href: "/services/site-installation",
  },
  {
    question: "Facing supplier quality or PPAP challenges?",
    cta: "Quality & Inspection",
    href: "/services/quality-inspection",
  },
  {
    question: "Need precision-machined parts or tooling solutions delivered on time?",
    cta: "Explore Products",
    href: "/products",
  },
  {
    question: "Developing a new product and need engineering support?",
    cta: "Engineering Services",
    href: "/services/engineering-services",
  },
  {
    question: "Looking to improve supplier performance and reduce risk?",
    cta: "Consultancy & Advisory",
    href: "/services/consultancy-advisory",
  },
  {
    question: "Not sure where to start?",
    cta: "Talk to an Expert",
    href: "/contact",
  },
];
