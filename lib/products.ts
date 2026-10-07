import { products, type Product } from "@/data/products";
import { defaultLocale, type Locale } from "./i18n";

export function getProducts(locale: Locale = defaultLocale): Product[] {
  return products.map((p) => localizeProduct(p, locale));
}

export function getProduct(slug: string, locale: Locale = defaultLocale): Product | undefined {
  const product = products.find((p) => p.slug === slug);
  return product && localizeProduct(product, locale);
}

/** Overlay a product's translated copy (if any) on top of the English source. */
export function localizeProduct(product: Product, locale: Locale): Product {
  const t = product.translations?.[locale];
  return t ? { ...product, ...t } : product;
}
