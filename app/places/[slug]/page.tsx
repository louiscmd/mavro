import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Disclosure } from "@/components/Disclosure";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { SizeGuide } from "@/components/SizeGuide";
import { Rise } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getProduct, getProducts } from "@/lib/products";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.placeName} — ${product.motto}`;
  const description = `${product.story} ${product.season} · ${product.setting}.`;
  return {
    title,
    description,
    alternates: { canonical: `/places/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/places/${product.slug}`,
      images: [{ url: `/og/${product.slug}.jpg`, width: 1200, height: 630, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const t = getDictionary().product;

  const others = getProducts().filter((p) => p.slug !== product.slug);
  const start = products.findIndex((p) => p.slug === product.slug);
  const more = [0, 1, 2].map((i) => others[(start + i) % others.length]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `mavro — ${product.placeName}`,
    description: product.story,
    image: product.images.map((i) => `${siteUrl()}${i.src}`),
    brand: { "@type": "Brand", name: "mavro" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteUrl()}/places/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[1440px] px-0 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div className="fade-in lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.images} placeName={product.placeName} />
          </div>

          <div className="px-5 pb-8 sm:px-0 lg:pt-16">
            <Link
              href="/places"
              className="group text-[0.8125rem] tracking-wide text-muted transition-colors duration-500 hover:text-ink"
            >
              <span className="inline-block transition-transform duration-700 ease-calm group-hover:-translate-x-1">←</span>{" "}
              {t.back}
            </Link>

            <h1 className="mt-10 text-[0.8125rem] tracking-[0.12em] text-muted">{product.placeName}</h1>
            <p className="mt-4 font-serif text-[clamp(2.5rem,7vw,4rem)] italic leading-[1.02]">
              <Rise text={product.motto} base={250} step={90} />
            </p>
            <p className="fade-in-late mt-6 text-[0.8125rem] tracking-wide text-muted">
              {product.season} · {product.setting}
            </p>

            <div className="fade-in-later">
              <div className="my-10 h-px bg-line" />
              <p className="max-w-[30rem] text-[0.9375rem] leading-[1.85]">{product.story}</p>
              <div className="mt-12 max-w-[30rem]">
                <ProductPurchase product={product} />
              </div>
            </div>

            <div className="mt-12 max-w-[30rem] border-t border-line">
              <SizeGuide />
              <Disclosure title={t.details}>
                <ul className="space-y-1 text-[0.8125rem] text-muted">
                  {t.detailsList.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="more-title" className="mx-auto mt-32 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-14">
          <div className="draw" />
          <h2 id="more-title" className="pt-8 font-serif text-3xl italic">
            {t.more}
          </h2>
        </Reveal>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
          {more.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </ul>
      </section>
    </>
  );
}
