import { motion } from "framer-motion";

type Hub = {
  id: string;
  label: string;
  region: string;
  cx: number;
  cy: number;
};

const HUBS: Hub[] = [
  { id: "india", label: "India HQ", region: "Headquarters", cx: 68, cy: 48 },
  { id: "china", label: "China", region: "Sourcing Hub", cx: 78, cy: 38 },
  { id: "vietnam", label: "Vietnam", region: "Manufacturing", cx: 76, cy: 46 },
  { id: "turkey", label: "Turkey", region: "Near-shore", cx: 54, cy: 36 },
  { id: "germany", label: "Europe", region: "Client Network", cx: 50, cy: 30 },
  { id: "usa", label: "North America", region: "Client Network", cx: 22, cy: 36 },
  { id: "uae", label: "Middle East", region: "Logistics", cx: 58, cy: 42 },
  { id: "japan", label: "Japan", region: "Partners", cx: 86, cy: 36 },
];

const CONNECTIONS: [string, string][] = [
  ["india", "china"],
  ["india", "vietnam"],
  ["india", "turkey"],
  ["india", "germany"],
  ["india", "usa"],
  ["india", "uae"],
  ["india", "japan"],
  ["china", "vietnam"],
  ["turkey", "germany"],
];

function getHub(id: string) {
  return HUBS.find((h) => h.id === id)!;
}

export function GlobalNetworkMap() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white p-4 shadow-[0_12px_48px_rgba(11,95,126,0.1)] sm:p-6 lg:p-8">
      <svg
        viewBox="0 0 100 52"
        className="h-auto w-full"
        role="img"
        aria-label="Global network map showing Orbigreen presence"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(92,191,42,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <rect width="100" height="52" fill="url(#mapGlow)" />

        {/* Simplified continents */}
        <g fill="rgba(11,95,126,0.06)" stroke="rgba(11,95,126,0.12)" strokeWidth="0.15">
          <path d="M12 18c4-6 14-8 20-4 6 4 8 12 4 18-4 6-14 8-20 2-6-6-8-14-4-16z" />
          <path d="M26 28c6-2 12 2 14 10 2 8-4 14-12 12-8-2-12-10-8-16 4-6 10-8 6-6z" />
          <path d="M44 14c8-4 18-2 22 6 4 8 0 18-10 20-10 2-18-6-16-14 2-8 8-14 4-12z" />
          <path d="M48 32c6 0 12 4 14 12 2 8-6 14-14 10-8-4-10-14-4-18 6-4 10-2 4-4z" />
          <path d="M68 20c10-6 20-2 22 8 2 10-8 18-18 16-10-2-14-12-10-18 4-6 12-8 6-6z" />
          <path d="M78 38c4 0 8 4 6 10-2 6-10 8-14 4-4-4-2-10 4-12 6-2 10 0 4-2z" />
        </g>

        {CONNECTIONS.map(([from, to], i) => {
          const a = getHub(from);
          const b = getHub(to);
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke="rgba(92,191,42,0.35)"
              strokeWidth="0.2"
              strokeDasharray="1 1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}

        {HUBS.map((hub, i) => (
          <g key={hub.id}>
            <motion.circle
              cx={hub.cx}
              cy={hub.cy}
              r="2.2"
              fill="rgba(92,191,42,0.2)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 200 }}
            />
            <motion.circle
              cx={hub.cx}
              cy={hub.cy}
              r="0.9"
              fill="#5CBF2A"
              stroke="#fff"
              strokeWidth="0.25"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 300 }}
            />
            {hub.id === "india" && (
              <motion.circle
                cx={hub.cx}
                cy={hub.cy}
                r="1.8"
                fill="none"
                stroke="#0B5F7E"
                strokeWidth="0.3"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </g>
        ))}
      </svg>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {HUBS.map((hub, i) => (
          <motion.div
            key={hub.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="rounded-xl border border-primary/8 bg-section/60 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-[14px] font-semibold text-primary">{hub.label}</span>
            </div>
            <span className="mt-1 block text-[12px] text-primary/55">{hub.region}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
