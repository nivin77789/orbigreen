import { Link } from "react-router-dom";
import { SocialLinks } from "@/components/SocialLinks";
import logo from "../logo.png";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-primary/10 bg-white py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-6 text-[12px] md:grid-cols-4 lg:px-10">
        <div>
          <Link to="/" className="inline-block">
            <img src={logo} alt="Orbigreen Techsource" className="h-12 w-auto max-w-[220px] object-contain" />
          </Link>
          <p className="mt-3 max-w-xs leading-relaxed text-primary/55">Smart. Sustainable. Sourcing.</p>
          <div className="mt-5">
            <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary/50">Follow Us</h5>
            <SocialLinks className="mt-3" />
          </div>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary/50">Quick Links</h5>
          <ul className="mt-4 space-y-2 text-primary/70">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/resources" className="transition-colors hover:text-primary">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary/50">Services</h5>
          <ul className="mt-4 space-y-2 text-primary/70">
            <li>
              <Link to="/services/consultancy-advisory" className="transition-colors hover:text-primary">
                Training & Consultancy
              </Link>
            </li>
            <li>
              <Link to="/services/global-sourcing" className="transition-colors hover:text-primary">
                Global Sourcing
              </Link>
            </li>
            <li>
              <Link to="/services/engineering-services" className="transition-colors hover:text-primary">
                Engineering
              </Link>
            </li>
            <li>
              <Link to="/services/quality-inspection" className="transition-colors hover:text-primary">
                Quality & Inspection
              </Link>
            </li>
            <li>
              <Link to="/services/site-installation" className="transition-colors hover:text-primary">
                Site & Installation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary/50">Reach</h5>
          <ul className="mt-4 space-y-2 text-primary/70">
            <li>
              <a href="tel:+919888338615" className="transition-colors hover:text-primary">
                +91 98883 38615
              </a>
            </li>
            <li>
              <a href="mailto:info@orbigreen.com" className="transition-colors hover:text-primary">
                info@orbigreen.com
              </a>
            </li>
            <li>Zirakpur, Punjab</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-primary/8 px-6 pt-6 text-[11px] text-primary/45 lg:px-10">
        © 2026 Orbigreen Techsource. All rights reserved.
      </div>
    </footer>
  );
}
