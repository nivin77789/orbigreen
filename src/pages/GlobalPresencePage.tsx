import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { QuotationForm } from "@/components/QuotationForm";
import { GlobalNetworkMap } from "@/components/GlobalNetworkMap";
import { NETWORK_CORRIDORS } from "@/data/globalHubsData";
import globalNetworkBanner from "@/assets/global-network-banner.png";

const EASE = [0.16, 1, 0.3, 1] as const;

type FormMode = "contact" | "quotation";

const PRESENCE = [
  {
    t: "On-the-ground teams",
    d: "Local sourcing and quality professionals in key manufacturing regions — without you setting up foreign entities.",
  },
  {
    t: "Multi-corridor logistics",
    d: "Coordinated freight routes connecting Asia, Europe, Middle East, and North America to your delivery points.",
  },
  {
    t: "Supplier ecosystems",
    d: "Vetted foundries, machine shops, fabricators, and assemblers across our active sourcing markets.",
  },
  {
    t: "Client partnerships",
    d: "Long-term relationships with OEMs and industrial buyers worldwide — built on transparency and results.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: EASE },
  }),
};

function GetInTouchHero() {
  const [formMode, setFormMode] = useState<FormMode>("contact");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-white">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-8 pt-[5.25rem] sm:px-6 lg:px-10 lg:pb-12 lg:pt-[5.75rem]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="max-w-xl lg:pt-2"
          >
            <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.3em] text-secondary">
              Get in Touch
            </span>
            <h1 className="mt-3 text-balance text-[clamp(1.85rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-tight text-primary">
              Our global presence{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                & network
              </span>
            </h1>
            <div className="global-presence-heading-line mt-5" />

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setFormMode("contact")}
                aria-pressed={formMode === "contact"}
                className={`w-full rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold transition-all sm:w-auto ${
                  formMode === "contact"
                    ? "gradient-border-cta shadow-[0_0_28px_-4px_rgba(92,191,42,0.4)]"
                    : "glass-card-light text-primary hover:glass-card-hover"
                }`}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => setFormMode("quotation")}
                aria-pressed={formMode === "quotation"}
                className={`w-full rounded-full px-6 py-3 text-[13px] lg:text-[14px] font-semibold transition-all sm:w-auto ${
                  formMode === "quotation"
                    ? "gradient-border-cta shadow-[0_0_28px_-4px_rgba(92,191,42,0.4)]"
                    : "glass-card-light text-primary hover:glass-card-hover"
                }`}
              >
                Request Quotation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <AnimatePresence mode="wait">
              {formMode === "contact" ? (
                <ContactForm key="contact" compact />
              ) : (
                <QuotationForm key="quotation" compact />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function GlobalPresencePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-primary">
      <Nav />

      <main>
        <GetInTouchHero />

        {/* Map + hubs */}
        <section className="relative border-t border-primary/10 bg-section/50 py-14 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative mb-10 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_16px_48px_-24px_rgba(11,95,126,0.18)] sm:mb-12 sm:rounded-[1.75rem]"
            >
              <img
                src={globalNetworkBanner}
                alt=""
                className="aspect-[21/9] w-full object-cover object-center sm:aspect-[2.35/1]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0}
              className="mb-10 max-w-2xl"
            >
              <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
                Worldwide Footprint
              </span>
              <h2 className="mt-3 text-[clamp(1.65rem,3vw,2.35rem)] font-semibold tracking-tight text-primary">
                India HQ at the center of your supply network
              </h2>
              <p className="mt-3 text-[16px] lg:text-[17px] leading-relaxed text-primary/65">
                Select a hub to explore its role in your sourcing program — from manufacturing and near-shore to
                logistics and client partnerships.
              </p>
            </motion.div>
            <GlobalNetworkMap />
          </div>
        </section>

        {/* Corridors */}
        <section className="border-t border-primary/10 bg-section/40 py-14 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="mb-10 max-w-2xl"
            >
              <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
                Supply Corridors
              </span>
              <h2 className="mt-3 text-[clamp(1.65rem,3vw,2.35rem)] font-semibold tracking-tight text-primary">
                Three corridors. One coordinated network.
              </h2>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-3">
              {NETWORK_CORRIDORS.map((corridor, i) => (
                <motion.div
                  key={corridor.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="glass-card-light relative overflow-hidden rounded-2xl p-6 transition-all hover:glass-card-hover lg:p-7"
                >
                  <span className="text-[11px] lg:text-[12px] font-bold tabular-nums text-secondary/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[17px] lg:text-[18px] font-semibold text-primary">{corridor.t}</h3>
                  <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed text-primary/65">{corridor.d}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {corridor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/10 bg-white/80 px-3 py-1 text-[11px] lg:text-[12px] font-semibold text-primary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-t border-primary/10 py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="lg:sticky lg:top-32"
              >
                <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
                  Network Capabilities
                </span>
                <h2 className="mt-3 text-[clamp(1.65rem,3vw,2.35rem)] font-semibold tracking-tight text-primary">
                  How our network works for you
                </h2>
                <p className="mt-4 text-[16px] lg:text-[17px] leading-relaxed text-primary/65">
                  From supplier identification to final delivery — every stage is managed through one accountable
                  partner with global reach.
                </p>
                <div className="global-presence-heading-line mt-6" />
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {PRESENCE.map((item, i) => (
                  <motion.div
                    key={item.t}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
                    whileHover={{ y: -3 }}
                    className="glass-card-light rounded-2xl p-6 transition-all hover:glass-card-hover"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-[12px] lg:text-[13px] font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[16px] lg:text-[17px] font-semibold text-primary">{item.t}</h3>
                    <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed text-primary/65">{item.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-primary/10 py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-white to-secondary/[0.06]" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative z-10 mx-auto max-w-[1280px] px-6 text-center lg:px-10"
          >
            <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">Get Started</span>
            <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary">
              Expand your supply base{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                with confidence
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] lg:text-[17px] leading-relaxed text-primary/65">
              Tell us your target regions and product categories — we'll map the right network for your program.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/quotation"
                className="gradient-border-cta rounded-full px-7 py-3.5 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
              >
                Request Quotation
              </Link>
              <Link
                to="/contact"
                className="glass-card-light rounded-full px-7 py-3.5 text-[14px] lg:text-[15px] font-semibold text-primary hover:glass-card-hover"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
