import { defaultLocale, type Locale } from "./i18n";

const intlLocale: Record<Locale, string> = { en: "en-IE" };

export function formatPrice(cents: number, locale: Locale = defaultLocale) {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
