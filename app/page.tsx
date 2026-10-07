import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getProduct, getProducts } from "@/lib/products";
import { site } from "@/lib/site";

export default function Home() {
  const t = getDictionary().home;
  const hero = getProduct(site.heroSlug) ?? getProducts()[0];
  const heroImage = hero.images[0];

  return (
    <>
      <section className="relative mx-auto grid min-h-svh max-w-[1440px] grid-rows-[1fr_auto] px-5 pt-16 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:px-12">
        <div className="fade-in relative order-1 mx-auto mt-6 aspect-[3/4] w-full max-w-[34rem] overflow-hidden bg-stone sm:mt-10 lg:order-2 lg:mt-0 lg:h-[calc(100svh-8rem)] lg:max-h-[60rem] lg:w-auto lg:max-w-full lg:justify-self-center">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="photo object-cover"
          />
        </div>
        <div className="order-2 py-12 lg:order-1 lg:py-0">
          <h1 className="fade-in font-serif text-[clamp(4.5rem,14vw,10rem)] font-normal italic leading-[0.85] tracking-tight">
            mavro
          </h1>
          <p className="fade-in-late mt-6 max-w-[22rem] font-serif text-xl italic text-muted sm:text-2xl">
            {t.tagline}
          </p>
          <a
            href="#places"
            className="fade-in-late mt-12 inline-block text-[0.8125rem] tracking-wide text-muted transition-colors duration-500 hover:text-ink"
          >
            {t.scroll} ↓
          </a>
        </div>
      </section>

      <section id="places" aria-labelledby="places-title" className="mx-auto max-w-[1440px] scroll-mt-16 px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12">
        <Reveal className="mb-16 flex flex-col gap-2 border-t border-line pt-8 sm:mb-20 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="places-title" className="font-serif text-4xl italic">
            {t.collectionTitle}
          </h2>
          <p className="text-[0.8125rem] text-muted">{t.collectionIntro}</p>
        </Reveal>
        <ProductGrid products={getProducts()} />
      </section>

      <section aria-labelledby="brand-title" className="mx-auto mt-40 max-w-[36rem] px-5">
        <Reveal>
          <h2 id="brand-title" className="font-serif text-3xl italic">
            {t.brandTitle}
          </h2>
          <div className="mt-8 space-y-5 text-[0.9375rem] leading-[1.85]">
            {t.brand.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-block text-[0.8125rem] tracking-wide underline decoration-line underline-offset-4 transition-colors duration-500 hover:decoration-ink"
          >
            {t.brandLink}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
