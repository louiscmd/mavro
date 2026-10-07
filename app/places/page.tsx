import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { getDictionary } from "@/lib/i18n";
import { getProducts } from "@/lib/products";

const t = getDictionary().places;

export const metadata: Metadata = {
  title: t.title,
  description: t.intro,
  alternates: { canonical: "/places" },
};

export default function PlacesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-40 sm:px-8 sm:pt-48 lg:px-12">
      <header className="mb-16 max-w-[36rem] sm:mb-24">
        <h1 className="fade-in font-serif text-5xl italic leading-none sm:text-6xl">{t.title}</h1>
        <p className="fade-in-late mt-6 text-[0.9375rem] text-muted">{t.intro}</p>
      </header>
      <ProductGrid products={getProducts()} eager={3} />
    </div>
  );
}
