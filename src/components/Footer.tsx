import { Link } from "react-router-dom";
import { SectionLabel } from "@/components/SectionLabel";
import { SocialLinks } from "@/components/SocialLinks";
import { BrandLogo } from "@/components/BrandLogo";
import { EMAIL, OFFICE_ADDRESS } from "@/lib/constants";
import { ContactPhones } from "@/components/ContactPhones";
import { SERVICES } from "@/data/servicesData";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-primary/10 bg-white py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 text-[14px] lg:text-[15px] sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 lg:px-10">
        <div>
          <BrandLogo variant="footer" />
          <div className="mt-5">
            <SectionLabel as="h5" tone="muted">Follow Us</SectionLabel>
            <SocialLinks className="mt-3" />
          </div>
        </div>
        <div>
          <SectionLabel as="h5" tone="muted">Contact Us</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-primary/75">
            <li>
              <ContactPhones linkClassName="transition-colors hover:text-primary" />
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-primary">
                {EMAIL}
              </a>
            </li>
            <li className="max-w-xs leading-relaxed">{OFFICE_ADDRESS}</li>
          </ul>
        </div>
        <div>
          <SectionLabel as="h5" tone="muted">Quick Links</SectionLabel>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-primary/75">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="transition-colors hover:text-primary">
                Media
              </Link>
            </li>
            <li>
              <Link to="/global-presence" className="transition-colors hover:text-primary">
                Get in Touch
              </Link>
            </li>
            <li>
              <Link to="/quotation" className="transition-colors hover:text-primary">
                Request Quotation
              </Link>
            </li>
            <li className="col-span-2">
              <Link to="/contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <SectionLabel as="h5" tone="muted">Services</SectionLabel>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-primary/75">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="transition-colors hover:text-primary">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-primary/8 px-6 pt-6 text-[12px] lg:text-[13px] text-primary/50 lg:px-10">
        © 2026 Orbigreen Techsource. All rights reserved.
      </div>
    </footer>
  );
}
