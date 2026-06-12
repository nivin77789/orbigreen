import { Link } from "react-router-dom";
import logo from "../logo.png";
import { COMPANY_NAME, TAGLINE } from "@/lib/constants";

type BrandLogoProps = {
  variant?: "nav" | "footer" | "loader";
  onClick?: () => void;
};

export function BrandLogo({ variant = "nav", onClick }: BrandLogoProps) {
  const isNav = variant === "nav";
  const isFooter = variant === "footer";
  const showText = variant === "loader";

  const logoHeight = isNav ? "h-11 md:h-12" : isFooter ? "h-14 md:h-16" : "h-14 md:h-16";
  const nameSize = "text-[16px]";
  const taglineSize = "text-[11px] md:text-[12px]";

  const content = (
    <div className="flex items-center gap-3 md:gap-4">
      <img
        src={logo}
        alt={COMPANY_NAME}
        className={`${logoHeight} w-auto shrink-0 object-contain`}
      />
      {showText && (
        <div className="flex min-w-0 flex-col">
          <span className={`${nameSize} font-bold leading-tight tracking-tight text-primary`}>
            {COMPANY_NAME}
          </span>
          <span
            className={`${taglineSize} mt-0.5 self-end text-right font-semibold uppercase tracking-[0.22em] text-secondary`}
          >
            {TAGLINE}
          </span>
        </div>
      )}
    </div>
  );

  if (variant === "loader") {
    return content;
  }

  return (
    <Link to="/" onClick={onClick} className="inline-flex shrink-0 transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
