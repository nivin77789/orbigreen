import { Link } from "react-router-dom";
import { SectionLabel } from "@/components/SectionLabel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const SECTIONS = [
  {
    label: "Guides",
    description:
      "Practical breakdowns of sourcing, quality, and cost control — written for engineering and procurement teams.",
    items: [
      "Cheap sourcing vs landed cost",
      "How to qualify overseas suppliers",
      "Quality planning for industrial components",
    ],
  },
  {
    label: "Insights",
    description:
      "Market intelligence, diversification strategies, and operational best practices from active sourcing programs.",
    items: [
      "China+1 strategy (and common pitfalls)",
      "Supplier risk management",
      "Lead time reduction playbook",
    ],
  },
  {
    label: "FAQ",
    description:
      "Fast answers to common questions about global sourcing, inspections, and working models.",
    items: [
      "What is global sourcing?",
      "Agent vs buying office",
      "When do you need factory audits?",
    ],
  },
  {
    label: "Case studies",
    description:
      "Real-world examples of cost savings, quality improvement, and delivery performance gains.",
    items: [
      "Cost-down & benchmarking",
      "Quality stabilization",
      "Supply chain transparency rollout",
    ],
  },
];


export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-section text-primary">
      <Nav />

      <main className="pt-28">
        <section className="mx-auto max-w-[1280px] px-6 pb-16 lg:px-10">
          <SectionLabel>Knowledge Hub</SectionLabel>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-primary">
            Resources
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-[16px] lg:text-[17px] leading-relaxed text-primary/70">
            Guides, insights, FAQs, and case studies to help procurement and engineering teams source with
            confidence.
          </p>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-[1280px] space-y-16 px-6 lg:px-10">
            {SECTIONS.map((section, si) => (
              <div
                key={section.label}
                className={si % 2 === 1 ? "rounded-3xl border border-primary/8 bg-white px-6 py-12 lg:px-10" : ""}
              >
                <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-primary">
                  {section.label}
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] lg:text-[16px] leading-relaxed text-primary/65">{section.description}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, i) => (
                    <div
                      key={item}
                      className="glass-card group flex flex-col justify-between rounded-2xl p-5 transition-all duration-500 ease-out hover:glass-card-hover"
                    >
                      <div>
                        <span className="text-[10px] lg:text-[11px] tabular-nums tracking-widest text-primary/35 transition-colors group-hover:text-secondary">
                          0{i + 1}
                        </span>
                        <h3 className="mt-2 text-[15px] lg:text-[16px] font-semibold leading-snug tracking-tight text-primary">
                          {item}
                        </h3>
                      </div>
                      <span className="mt-4 text-[11px] lg:text-[12px] font-medium uppercase tracking-[0.2em] text-primary/40 transition-colors group-hover:text-secondary">
                        Read more →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-primary/10 bg-white py-24">
          <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
            <SectionLabel>Need help?</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-primary">
              Talk to an expert
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] lg:text-[16px] leading-relaxed text-primary/70">
              Share your drawings, specs, or sourcing goals — we'll recommend the right sourcing, quality, and
              delivery approach.
            </p>
            <Link
              to="/contact"
              className="gradient-border-cta mt-10 inline-flex rounded-full px-8 py-3.5 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
            >
              Discuss your requirement
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
