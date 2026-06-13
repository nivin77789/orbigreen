import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import globalNetworkMap from "@/assets/global-network-map.webp";
import { GLOBAL_HUBS } from "@/data/globalHubsData";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GlobalNetworkMap() {
  const [activeId, setActiveId] = useState(GLOBAL_HUBS[0].id);
  const activeHub = GLOBAL_HUBS.find((h) => h.id === activeId) ?? GLOBAL_HUBS[0];

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="global-map-frame relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white p-3 shadow-[0_16px_56px_rgba(11,95,126,0.12)] sm:p-4"
      >
        <div className="global-map-frame__glow pointer-events-none absolute inset-0" aria-hidden />
        <figure className="relative overflow-hidden rounded-[1.25rem]">
          <motion.img
            src={globalNetworkMap}
            alt="Orbigreen global network map"
            className="h-auto w-full object-contain"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </figure>
      </motion.div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 text-center sm:mb-6"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">Active Hubs</span>
          <h3 className="mt-2 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-tight text-primary">
            Connected worldwide
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {GLOBAL_HUBS.map((hub, i) => {
            const isActive = hub.id === activeId;
            return (
              <motion.button
                key={hub.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                onClick={() => setActiveId(hub.id)}
                whileHover={{ y: -4 }}
                className={`global-hub-pill group flex w-full flex-col items-center gap-2.5 rounded-2xl px-3 py-4 text-center transition-all duration-500 sm:gap-3 sm:px-4 sm:py-5 ${
                  isActive ? "global-hub-pill--active" : ""
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 sm:h-11 sm:w-11 ${
                    isActive
                      ? "bg-gradient-to-br from-primary to-secondary text-white shadow-[0_6px_18px_-4px_rgba(11,95,126,0.35)]"
                      : "bg-primary/[0.06] text-primary/45 group-hover:text-secondary"
                  }`}
                >
                  {hub.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold leading-snug text-primary sm:text-[14px]">
                    {hub.label}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/90 sm:text-[11px]">
                    {hub.region}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeHub.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl rounded-2xl border border-primary/8 bg-white/80 px-5 py-4 text-center text-[13px] leading-relaxed text-primary/68 backdrop-blur-sm sm:mt-6 sm:text-[14px]"
          >
            <span className="font-semibold text-primary">{activeHub.label}</span>
            {" — "}
            {activeHub.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
