import { Link } from "react-router-dom";
import logo from "../logo.png";
import { COMPANY_NAME } from "@/lib/constants";

type BrandLogoProps = {
  variant?: "nav" | "footer" | "loader";
  onClick?: () => void;
};

export function BrandLogo({ variant = "nav", onClick }: BrandLogoProps) {
  const isNav = variant === "nav";
  const isLoader = variant === "loader";

  const logoHeight = isNav
    ? "h-11 md:h-12"
    : isLoader
      ? "h-16 md:h-20"
      : "h-14 md:h-16";

  const content = (
    <img
      src={logo}
      alt={COMPANY_NAME}
      className={`${logoHeight} w-auto shrink-0 object-contain`}
    />
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
