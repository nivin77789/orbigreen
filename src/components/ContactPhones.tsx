import { PHONES } from "@/lib/constants";

type ContactPhonesProps = {
  className?: string;
  linkClassName?: string;
  separatorClassName?: string;
};

export function ContactPhones({
  className = "",
  linkClassName = "transition-colors hover:text-secondary",
  separatorClassName = "text-primary/35",
}: ContactPhonesProps) {
  return (
    <span className={className}>
      {PHONES.map((phone, index) => (
        <span key={phone.tel}>
          {index > 0 && <span className={separatorClassName}> | </span>}
          <a href={`tel:${phone.tel}`} className={linkClassName}>
            {phone.display}
          </a>
        </span>
      ))}
    </span>
  );
}
