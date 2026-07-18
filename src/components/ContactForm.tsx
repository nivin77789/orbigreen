import { useState, type FormEvent } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { motion } from "framer-motion";
import { submitWebsiteForm } from "@/lib/submitForm";

type ContactFormProps = {
  compact?: boolean;
};

export function ContactForm({ compact = false }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitWebsiteForm(event.currentTarget);
      setSent(true);
      event.currentTarget.reset();
      window.setTimeout(() => setSent(false), 3200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      key="contact-form"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className={
        compact
          ? "glass-card-light flex flex-col gap-3 rounded-2xl border border-primary/10 p-4 shadow-[0_16px_48px_-24px_rgba(11,95,126,0.18)] sm:gap-3.5 sm:p-5"
          : "flex flex-col gap-4 rounded-2xl border border-primary/10 bg-section p-8 shadow-sm"
      }
    >
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {compact && (
        <div className="border-b border-primary/[0.07] pb-3">
          <SectionLabel>Contact Us</SectionLabel>
          <p className="mt-1 text-[13px] leading-snug text-primary/62 lg:text-[14px]">
            Send a quick message — our team will respond within one business day.
          </p>
        </div>
      )}
      {!compact && <SectionLabel tone="muted">Quick contact</SectionLabel>}

      <input
        required
        name="name"
        placeholder="Full name"
        aria-label="Full name"
        disabled={submitting}
        className="border-b border-primary/15 bg-transparent py-2.5 text-[15px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary disabled:opacity-60 sm:py-3 lg:text-[16px]"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Work email"
        aria-label="Work email"
        disabled={submitting}
        className="border-b border-primary/15 bg-transparent py-2.5 text-[15px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary disabled:opacity-60 sm:py-3 lg:text-[16px]"
      />
      <textarea
        required
        name="message"
        rows={compact ? 3 : 4}
        placeholder="Tell us about your sourcing requirement"
        aria-label="Message"
        disabled={submitting}
        className="resize-none border-b border-primary/15 bg-transparent py-2.5 text-[15px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary disabled:opacity-60 sm:py-3 lg:text-[16px]"
      />

      {error && (
        <p className="text-[13px] leading-snug text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="gradient-border-cta group mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-2.5 text-[13px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)] disabled:cursor-not-allowed disabled:opacity-60 sm:px-7 sm:py-3 sm:text-[14px] lg:text-[15px]"
      >
        <span>{sent ? "Sent" : submitting ? "Sending…" : "Send message"}</span>
      </button>
    </motion.form>
  );
}
