import { motion } from "framer-motion";

const ORBS = [
  {
    className: "left-[-12%] top-[8%] h-[420px] w-[420px] bg-secondary/18",
    duration: 24,
    delay: 0,
  },
  {
    className: "right-[-8%] top-[22%] h-[380px] w-[380px] bg-primary/14",
    duration: 28,
    delay: 2,
  },
  {
    className: "bottom-[12%] left-[18%] h-[320px] w-[320px] bg-accent/16",
    duration: 20,
    delay: 4,
  },
  {
    className: "bottom-[18%] right-[12%] h-[360px] w-[360px] bg-secondary/12",
    duration: 26,
    delay: 1,
  },
];

export function ServicesAmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(92,191,42,0.08),transparent)]" />

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${orb.className}`}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 35, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,95,126,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,95,126,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(92,191,42,0.06), transparent, rgba(11,95,126,0.05), transparent)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
