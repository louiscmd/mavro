import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Reveal } from "./Reveal";

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  /** Position in the row, used to stagger the reveal across columns. */
  index?: number;
}) {
  const image = product.images[0];
  return (
    <Reveal as="li" image delay={(index % 3) * 140}>
      <Link href={`/places/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone">
          {/* hover zoom lives on a wrapper; the img itself carries the reveal zoom */}
          <div className="absolute inset-0 transition-transform duration-[2000ms] ease-calm group-hover:scale-[1.04]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="photo object-cover"
            />
          </div>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl italic leading-tight transition-transform duration-700 ease-calm group-hover:translate-x-1">
            {product.placeName}
          </h3>
          <span className="text-[0.8125rem] tabular-nums text-muted">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-1 text-[0.8125rem] text-muted transition-colors duration-700 group-hover:text-ink">
          {product.motto}
        </p>
      </Link>
    </Reveal>
  );
}

export function ProductGrid({ products, eager = 0 }: { products: Product[]; eager?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 sm:gap-y-20 xl:grid-cols-3">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < eager} index={i} />
      ))}
    </ul>
  );
}
