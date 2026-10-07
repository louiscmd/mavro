import { en, type Dictionary } from "./dictionaries/en";

/**
 * Locale plumbing. Only English ships today. To add French or Polish:
 *   1. add "fr" / "pl" to `locales`
 *   2. create /lib/dictionaries/fr.ts typed as `Dictionary`
 *   3. register it in `dictionaries`
 *   4. add `translations.fr` entries to products (optional; English is the fallback)
 * then route with app/[locale]/… and pass the locale into these helpers.
 */
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Replace {name} placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
