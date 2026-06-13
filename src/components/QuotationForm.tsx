import { useRef, useState } from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  "Castings & Forging",
  "Machining & Fabrication",
  "Assemblies & Stamping",
  "Pressure Vessels & Tanks",
  "Fasteners & Transmission",
  "Engineering Services",
  "Global Sourcing",
  "Transport & Logistics",
  "Site Installation",
  "Other",
];

const fieldClass =
  "quotation-field mt-1.5 w-full rounded-xl border border-primary/10 bg-white/80 px-3 py-2.5 text-[14px] text-primary placeholder-primary/35 outline-none transition-all focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(92,191,42,0.12)]";

const labelClass = "text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50";

export function QuotationForm() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setFileName("");
          if (fileRef.current) fileRef.current.value = "";
        }, 3200);
      }}
      className="quotation-form-card flex h-full flex-col gap-3.5 rounded-[1.35rem] p-4 sm:gap-4 sm:rounded-2xl sm:p-5 lg:gap-3.5 lg:p-5 xl:p-6"
    >
      <div className="flex items-start justify-between gap-4 border-b border-primary/[0.07] pb-3.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">Request Quotation</span>
          <p className="mt-1 text-[13px] leading-snug text-primary/62 sm:text-[14px]">
            Share your requirement details and attach drawings, specifications, or reference images.
          </p>
        </div>
        <div className="quotation-form-badge hidden shrink-0 sm:flex" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-secondary" aria-hidden>
            <path
              d="M9 12l2 2 4-4m5.5-1.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-2.5 xl:gap-3">
        <label className="block">
          <span className={labelClass}>Company name *</span>
          <input required placeholder="Your company" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Contact person *</span>
          <input required placeholder="Full name" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Work email *</span>
          <input required type="email" placeholder="name@company.com" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Phone *</span>
          <input required type="tel" placeholder="+91 ..." className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-2.5 xl:gap-3">
        <label className="block">
          <span className={labelClass}>Product / service category *</span>
          <select required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Estimated quantity / volume</span>
          <input placeholder="e.g. 500 units / annual" className={fieldClass} />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Requirement details *</span>
        <textarea
          required
          rows={2}
          placeholder="Material, tolerances, delivery location, timeline, standards, and any other specifications..."
          className={`${fieldClass} resize-none leading-relaxed`}
        />
      </label>

      <div>
        <span className={labelClass}>Attachments</span>
        <label className="quotation-upload mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 transition-colors sm:px-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,.pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.zip,.doc,.docx,.xls,.xlsx"
            multiple
            className="sr-only"
            onChange={(e) => {
              const names = Array.from(e.target.files ?? []).map((f) => f.name);
              setFileName(names.length ? names.join(", ") : "");
            }}
          />
          <div className="quotation-upload__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-primary">
              {fileName || "Upload drawings, specs, or images"}
            </p>
            <p className="text-[11px] text-primary/50">PDF, images, CAD files, ZIP — up to 25 MB each</p>
          </div>
          <span className="quotation-upload__btn hidden shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:inline">
            Browse
          </span>
        </label>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-primary/[0.07] pt-3.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-primary/50">
          Secure submission · Drawings reviewed by sourcing specialists
        </p>
        <button
          type="submit"
          className={`gradient-border-cta inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold transition-all sm:shrink-0 sm:px-7 ${
            sent ? "opacity-90" : "hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
          }`}
        >
          <span>{sent ? "Quotation request sent" : "Submit quotation request"}</span>
          {!sent && (
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
