import { Link } from "react-router-dom";
import { EMAIL, OFFICE_ADDRESS } from "@/lib/constants";
import { ContactPhones } from "@/components/ContactPhones";
import { SectionLabel } from "@/components/SectionLabel";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="content-auto section-spacing relative border-t border-primary/10 bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <SectionLabel>Contact Us Today</SectionLabel>
          <h3 className="section-heading mt-3 text-primary">Let&apos;s build your supply advantage.</h3>
          <dl className="mt-10 space-y-6">
            <div>
              <dt>
                <SectionLabel tone="muted">Phone</SectionLabel>
              </dt>
              <dd className="mt-1">
                <ContactPhones className="text-[17px] lg:text-[18px] font-medium text-primary" />
              </dd>
            </div>
            <div>
              <dt>
                <SectionLabel tone="muted">Email</SectionLabel>
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${EMAIL}`} className="text-[17px] lg:text-[18px] font-medium text-primary hover:text-secondary">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <SectionLabel tone="muted">Office</SectionLabel>
              </dt>
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
