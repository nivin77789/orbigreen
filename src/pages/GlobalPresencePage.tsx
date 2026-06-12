import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlobalNetworkMap } from "@/components/GlobalNetworkMap";

const NETWORK_STATS = [
  { value: "4+", label: "Sourcing markets" },
  { value: "500+", label: "Supplier network" },
  { value: "50+", label: "Global clients" },
  { value: "15+", label: "Years experience" },
];

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

export default function GlobalPresencePage() {
  return (
    <div className="min-h-screen bg-white text-primary">
      <Nav />

      <main className="pt-28">
        <section className="relative mx-auto max-w-[1280px] px-6 pb-16 lg:px-10 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
              Global Network
            </span>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-primary">
              Our global presence{" "}
              <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                & network
              </span>
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-primary/70">
              A single-window sourcing partner with on-the-ground presence across key manufacturing hubs and
              logistics corridors — connecting you to the right suppliers, anywhere in the world.
            </p>
          </motion.div>
        </section>

        <section className="border-t border-primary/10 bg-section py-14 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <GlobalNetworkMap />
          </div>
        </section>

        <section className="py-14 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="metrics-band relative overflow-hidden rounded-[1.5rem]">
              <div className="grid grid-cols-2">
                {NETWORK_STATS.map((stat) => (
                  <div key={stat.label} className="px-4 py-7 text-center sm:px-6">
                    <div className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-transparent">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-primary/10 bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tight text-primary">
              How our network works for you
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PRESENCE.map((item, i) => (
                <motion.div
                  key={item.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.55 }}
                  className="glass-card-light rounded-2xl p-6 transition-all hover:glass-card-hover"
                >
                  <span className="text-[12px] font-bold tabular-nums text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[17px] font-semibold text-primary">{item.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-primary/65">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-primary/10 py-20">
          <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-10">
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-primary">
              Expand your supply base with confidence
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] text-primary/65">
              Tell us your target regions and product categories — we'll map the right network for your program.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/quotation"
                className="gradient-border-cta rounded-full px-7 py-3.5 text-[14px] font-semibold"
              >
                Request Quotation
              </Link>
              <Link
                to="/contact"
                className="glass-card-light rounded-full px-7 py-3.5 text-[14px] font-semibold text-primary hover:glass-card-hover"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
