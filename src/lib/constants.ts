export const COMPANY_NAME = "Orbigreen Techsource";
export const HERO_BG = "#34A4BF";
export const HERO_BG_RGB = "52, 164, 191";
export const HERO_BG_DARK_RGB = "26, 125, 148";
export const TAGLINE = "Smart. Sustainable. Sourcing.";

export const PHONES = [
  { display: "+91 99718 63450", tel: "+919971863450" },
  { display: "+91 99991 03781", tel: "+919999103781" },
] as const;

export const PHONE_DISPLAY = PHONES.map((phone) => phone.display).join(" | ");
export const PHONE_WHATSAPP = "919971863450";
export const EMAIL = "info@orbigreentech.com";
/** Form submissions are delivered to this inbox via Web3Forms (see WEB3FORMS_ACCESS_KEY). */
export const FORM_RECIPIENT_EMAIL = "orbigreenrfq@gmail.com";
export const WEB3FORMS_ACCESS_KEY = "ea21d180-9691-4e95-97f5-80265668e478";
export const OFFICE_ADDRESS =
  "SCO 26, First Floor, Saraswati Vihar, Dhakoli, Zirakpur, District SAS Nagar, Pin Code: 140603, Punjab, India";

export const CONTACT_SUMMARY = `Phone: ${PHONE_DISPLAY} · Email: ${EMAIL} · Office: ${OFFICE_ADDRESS}.`;
