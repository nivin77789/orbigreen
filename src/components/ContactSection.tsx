import { Link } from "react-router-dom";
import { EMAIL, OFFICE_ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="content-auto relative border-t border-primary/10 bg-white py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.3em] text-secondary">Contact Us Today</span>
          <h3 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-tight text-primary">
            Let's build your
            <br />
            supply advantage.
          </h3>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.25em] text-primary/50">Phone</dt>
              <dd className="mt-1">
                <a href={`tel:${PHONE_TEL}`} className="text-[17px] lg:text-[18px] font-medium text-primary hover:text-secondary">
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.25em] text-primary/50">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${EMAIL}`} className="text-[17px] lg:text-[18px] font-medium text-primary hover:text-secondary">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.25em] text-primary/50">Office</dt>
              <dd className="mt-1 max-w-xs text-[15px] lg:text-[16px] leading-relaxed text-primary/70">{OFFICE_ADDRESS}</dd>
            </div>
          </dl>
          <Link
            to="/quotation"
            className="gradient-border-cta mt-8 inline-flex rounded-full px-6 py-3 text-[14px] lg:text-[15px] font-semibold transition-all hover:shadow-[0_0_32px_-4px_rgba(92,191,42,0.45)]"
          >
            Request Quotation →
          </Link>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
