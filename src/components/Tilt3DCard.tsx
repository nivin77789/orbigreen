import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Tilt3DCardProps = {
  children: ReactNode;
  className?: string;
  depth?: number;
  float?: boolean;
};

export function Tilt3DCard({ children, className = "", depth = 10, float = false }: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]), {
    stiffness: 200,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]), {
    stiffness: 200,
    damping: 24,
  });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={float ? { y: [0, -8, 0] } : undefined}
        transition={float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="h-full w-full [transform-style:preserve-3d]"
      >
        {children}
      </motion.div>
    </div>
  );
}
