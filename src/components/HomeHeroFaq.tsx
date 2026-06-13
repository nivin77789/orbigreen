import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HOME_FAQ } from "@/data/faqData";

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

function FaqRow({
  item,
  index,
  visible,
  isHovered,
  onHover,
  onLeave,
}: {
  item: (typeof HOME_FAQ)[number];
  index: number;
  visible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const alignRight = index % 2 === 1;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: alignRight ? 28 : -28, y: 10 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
      animate={visible ? undefined : { opacity: 0, x: alignRight ? 20 : -20, y: 8 }}
      className={`hero-faq-row flex w-full shrink-0 items-center sm:w-[90%] ${
        alignRight ? "sm:ml-auto" : "sm:mr-auto"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        whileHover={{ y: -3, scale: 1.012 }}
        whileTap={{ scale: 0.995 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={`hero-faq-card faq-zigzag-item w-full overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-300 sm:rounded-[1.125rem] ${
          isHovered ? "hero-faq-card--active" : ""
        }`}
      >
        <div
          className={`hero-faq-card__inner flex flex-col gap-2.5 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3.5 sm:px-5 sm:py-2.5 ${
            alignRight ? "sm:flex-row-reverse" : ""
          }`}
        >
          <p
            className={`min-w-0 flex-1 font-semibold leading-snug text-primary text-[14px] sm:text-[17px] ${
              alignRight ? "text-left sm:text-right" : "text-left"
            }`}
          >
            {item.question}
          </p>

          <motion.div
            className={alignRight ? "self-end sm:self-auto" : "self-start sm:self-auto"}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              to={item.href}
              className={`hero-faq-link group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[15px] ${
                alignRight ? "flex-row-reverse" : ""
              }`}
            >
              {item.cta}
              <motion.span
                className="text-secondary"
                animate={isHovered ? { x: alignRight ? -4 : 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 24 }}
                aria-hidden
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-faq-card__shine"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ originX: alignRight ? 1 : 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function HomeHeroFaq({ visible = true }: { visible?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.75, ease: EASE }}
      className="pointer-events-auto mx-auto flex h-full w-full max-w-[min(100%,64rem)] flex-col px-3 pb-4 pt-[4.5rem] sm:max-w-[66rem] sm:px-6 sm:pb-6 sm:pt-[5.25rem]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="shrink-0 text-center"
      >
        <h3 className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-bold leading-snug tracking-tight text-primary">
          How can we help?
        </h3>
      </motion.div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        className="faq-zigzag hero-faq-list mt-3 flex min-h-0 flex-1 flex-col justify-center gap-1.5 sm:mt-5 sm:gap-2.5"
      >
        {HOME_FAQ.map((item, i) => (
          <FaqRow
            key={item.question}
            item={item}
            index={i}
            visible={visible}
            isHovered={hoveredIndex === i}
            onHover={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
