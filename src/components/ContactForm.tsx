import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { motion } from "framer-motion";

type ContactFormProps = {
  compact?: boolean;
};

export function ContactForm({ compact = false }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <motion.form
      key="contact-form"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 2800);
      }}
      className={
        compact
          ? "glass-card-light flex flex-col gap-3 rounded-2xl border border-primary/10 p-4 shadow-[0_16px_48px_-24px_rgba(11,95,126,0.18)] sm:gap-3.5 sm:p-5"
          : "flex flex-col gap-4 rounded-2xl border border-primary/10 bg-section p-8 shadow-sm"
      }
    >
      {compact && (
        <div className="border-b border-primary/[0.07] pb-3">
          <SectionLabel>Contact Us</SectionLabel>
          <p className="mt-1 text-[13px] lg:text-[14px] leading-snug text-primary/62">
            Send a quick message — our team will respond within one business day.
          </p>
        </div>
      )}
      {!compact && (
        <SectionLabel tone="muted">Quick contact</SectionLabel>
      )}
      <input
        required
        placeholder="Full name"
        className="border-b border-primary/15 bg-transparent py-2.5 text-[15px] lg:text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary sm:py-3"
      />
      <input
        required
        type="email"
        placeholder="Work email"
        className="border-b border-primary/15 bg-transparent py-2.5 text-[15px] lg:text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary sm:py-3"
      />
      <textarea
        required
        rows={compact ? 3 : 4}
        placeholder="Tell us about your sourcing requirement"
        className="resize-none border-b border-primary/15 bg-transparent py-2.5 text-[15px] lg:text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary sm:py-3"
      />
      <button
        type="submit"
        className="gradient-border-cta group mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-2.5 text-[13px] lg:text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)] sm:px-7 sm:py-3 sm:text-[14px] lg:text-[15px]"
      >
        <span>{sent ? "Sent" : "Send message"}</span>
      </button>
    </motion.form>
  );
}
