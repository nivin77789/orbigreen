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

export function QuotationForm() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setFileName("");
          if (fileRef.current) fileRef.current.value = "";
        }, 3200);
      }}
      className="flex flex-col gap-5 rounded-2xl border border-primary/10 bg-white p-8 shadow-[0_8px_40px_rgba(11,95,126,0.08)] lg:p-10"
    >
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
          Request Quotation
        </span>
        <p className="mt-2 text-[15px] leading-relaxed text-primary/65">
          Share your requirement details and attach drawings, specifications, or reference images.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
            Company name *
          </span>
          <input
            required
            placeholder="Your company"
            className="mt-2 w-full border-b border-primary/15 bg-transparent py-3 text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
            Contact person *
          </span>
          <input
            required
            placeholder="Full name"
            className="mt-2 w-full border-b border-primary/15 bg-transparent py-3 text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
            Work email *
          </span>
          <input
            required
            type="email"
            placeholder="name@company.com"
            className="mt-2 w-full border-b border-primary/15 bg-transparent py-3 text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
            Phone *
          </span>
          <input
            required
            type="tel"
            placeholder="+91 ..."
            className="mt-2 w-full border-b border-primary/15 bg-transparent py-3 text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
            Product / service category *
          </span>
          <select
            required
            defaultValue=""
            className="mt-2 w-full border-b border-primary/15 bg-transparent py-3 text-[16px] text-primary outline-none transition-colors focus:border-secondary"
          >
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
            Estimated quantity / volume
          </span>
          <input
            placeholder="e.g. 500 units / annual"
            className="mt-2 w-full border-b border-primary/15 bg-transparent py-3 text-[16px] text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
          Requirement details *
        </span>
        <textarea
          required
          rows={4}
          placeholder="Material, tolerances, delivery location, timeline, standards, and any other specifications..."
          className="mt-2 w-full resize-none border-b border-primary/15 bg-transparent py-3 text-[16px] leading-relaxed text-primary placeholder-primary/35 outline-none transition-colors focus:border-secondary"
        />
      </label>

      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/50">
          Attachments
        </span>
        <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/15 bg-section/50 px-6 py-8 transition-colors hover:border-secondary/40 hover:bg-white">
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
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary/40"
            aria-hidden
          >
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-3 text-[14px] font-medium text-primary">
            Upload drawings, specs, or images
          </span>
          <span className="mt-1 text-[12px] text-primary/50">
            PDF, images, CAD files, ZIP — up to 25 MB each
          </span>
          {fileName && (
            <span className="mt-3 max-w-full truncate text-[12px] font-medium text-secondary">
              {fileName}
            </span>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="gradient-border-cta group mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
      >
        <span>{sent ? "Quotation request sent" : "Submit quotation request"}</span>
      </button>
    </motion.form>
  );
}
