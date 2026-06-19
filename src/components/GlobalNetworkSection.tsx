import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import globalNetworkMap from "@/assets/global-network-satellite.webp";
import globalNetworkMap2x from "@/assets/global-network-satellite@2x.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GlobalNetworkSection() {
  return (
    <section className="global-network-section border-t border-primary/10 bg-section/50">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 lg:px-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-8 max-w-2xl text-center lg:mb-10"
        >
          <SectionLabel as="h5">Active Hubs</SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="global-network-map-panel"
        >
          <span className="global-network-map-panel__glow" aria-hidden />
          <img
            src={globalNetworkMap}
            srcSet={`${globalNetworkMap} 1280w, ${globalNetworkMap2x} 2048w`}
            sizes="(min-width: 1280px) 1200px, 100vw"
            width={1280}
            height={640}
            alt="Orbigreen global supply network map showing connected hubs across North America, South America, EMEA, and Asia Pacific"
            className="global-network-map-image"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
