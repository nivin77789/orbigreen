import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { GLOBAL_HUBS } from "@/data/globalHubsData";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GlobalNetworkMap() {
  const [activeId, setActiveId] = useState(GLOBAL_HUBS[0].id);
  const activeHub = GLOBAL_HUBS.find((h) => h.id === activeId) ?? GLOBAL_HUBS[0];

  return (
    <div>
      <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 text-center sm:mb-6"
        >
          <SectionLabel>Active Hubs</SectionLabel>
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
                  <span className="block text-[13px] lg:text-[14px] font-semibold leading-snug text-primary sm:text-[14px] lg:text-[15px]">
                    {hub.label}
                  </span>
                  <span className="mt-1 block text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.16em] text-secondary/90 sm:text-[11px] lg:text-[12px]">
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
            className="mx-auto mt-5 max-w-2xl rounded-2xl border border-primary/8 bg-white/80 px-5 py-4 text-center text-[13px] lg:text-[14px] leading-relaxed text-primary/68 backdrop-blur-sm sm:mt-6 sm:text-[14px] lg:text-[15px]"
          >
            <span className="font-semibold text-primary">{activeHub.label}</span>
            {" — "}
            {activeHub.description}
          </motion.p>
        </AnimatePresence>
    </div>
  );
}
