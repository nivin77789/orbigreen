import { useRef, useState, type FormEvent } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { motion } from "framer-motion";
import { submitWebsiteForm } from "@/lib/submitForm";

const CATEGORIES = [
  "Castings & Forging",
  "Machining & Fabrication",
  "Assemblies & Stamping",
  "Pressure Vessels & Tanks",
  "Fasteners & Transmission",
  "Engineering Services",
  "Global Sourcing",
  "Logistics",
  "Site Installation",
  "Other",
];

type QuotationFormProps = {
  compact?: boolean;
};

export function QuotationForm({ compact = false }: QuotationFormProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fieldClass = compact
    ? "quotation-field w-full rounded-xl border border-primary/10 bg-white/80 px-3 py-2.5 text-[16px] text-primary placeholder-primary/40 outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)] disabled:opacity-60 sm:py-2 sm:text-[14px]"
    : "quotation-field w-full rounded-xl border border-primary/10 bg-white/80 px-3 py-2.5 text-[16px] text-primary placeholder-primary/35 outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)] disabled:opacity-60 sm:text-[14px] lg:text-[15px]";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setError("");

    try {
      await submitWebsiteForm(form, {
        subject: "[Orbigreen] New quotation request",
        fileInput: fileRef.current,
        collection: "quotations",
      });
      setSent(true);
      form.reset();
      setFileName("");
      if (fileRef.current) fileRef.current.value = "";
      window.setTimeout(() => setSent(false), 3200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      key="quotation-form"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={onSubmit}
      data-lenis-prevent
      className={`quotation-form-card flex h-full flex-col rounded-[1.35rem] sm:rounded-2xl ${
        compact
          ? "gap-2.5 p-3.5 sm:max-h-[min(72vh,34rem)] sm:gap-3 sm:overflow-y-auto sm:p-4 lg:max-h-[min(72vh,34rem)]"
          : "gap-3 p-4 sm:gap-3.5 sm:p-5 lg:p-5"
      }`}
    >
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {!compact && (
        <div className="border-b border-primary/[0.07] pb-2.5">
          <SectionLabel>Request Quotation</SectionLabel>
        </div>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        <input
          required
          name="company"
          placeholder="Company name *"
          aria-label="Company name"
          disabled={submitting}
          className={fieldClass}
        />
        <input
          required
          name="contact_person"
          placeholder="Contact person *"
          aria-label="Contact person"
          disabled={submitting}
          className={fieldClass}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Work email *"
          aria-label="Work email"
          disabled={submitting}
          className={fieldClass}
        />
        <input
          required
          type="tel"
          name="phone"
          placeholder="Phone *"
          aria-label="Phone"
          disabled={submitting}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <select
          required
          name="category"
          defaultValue=""
          aria-label="Product or service category"
          disabled={submitting}
          className={fieldClass}
        >
          <option value="" disabled>
            Category *
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          name="quantity"
          placeholder="Quantity / volume"
          aria-label="Estimated quantity or volume"
          disabled={submitting}
          className={fieldClass}
        />
      </div>

      <textarea
        required
        name="details"
        rows={2}
        placeholder="Requirement details — material, tolerances, delivery, timeline *"
        aria-label="Requirement details"
        disabled={submitting}
        className={`${fieldClass} resize-none leading-relaxed`}
      />

      <label
        className={`quotation-upload flex cursor-pointer items-center gap-2.5 rounded-xl transition-colors ${
          compact ? "px-3 py-2" : "px-3.5 py-2.5 sm:px-4"
        } ${submitting ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={fileRef}
          name="attachments"
          type="file"
          accept="image/*,.pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.zip,.doc,.docx,.xls,.xlsx"
          multiple
          disabled={submitting}
          className="sr-only"
          onChange={(e) => {
            const names = Array.from(e.target.files ?? []).map((f) => f.name);
            setFileName(names.length ? names.join(", ") : "");
          }}
        />
        <div
          className={`quotation-upload__icon flex shrink-0 items-center justify-center rounded-xl ${compact ? "h-8 w-8" : "h-9 w-9"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={compact ? "h-4 w-4" : "h-5 w-5"} aria-hidden>
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span
          className={`min-w-0 flex-1 truncate font-medium text-primary ${compact ? "text-[13px]" : "text-[13px] lg:text-[14px]"}`}
        >
          {fileName || "Attach drawings, specs, or images"}
        </span>
      </label>

      {error && (
        <p className="text-[13px] leading-snug text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className={`flex justify-end ${compact ? "pt-0.5" : "border-t border-primary/[0.07] pt-3"}`}>
        <button
          type="submit"
          disabled={submitting}
          className={`gradient-border-cta inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
            compact ? "px-5 py-2.5 text-[13px]" : "px-6 py-2.5 text-[13px] sm:px-7 sm:py-3 lg:text-[14px]"
          } ${sent ? "opacity-90" : "hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"}`}
        >
          <span>{sent ? "Sent" : submitting ? "Sending…" : "Submit request"}</span>
          {!sent && !submitting && (
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </motion.form>
  );
}
