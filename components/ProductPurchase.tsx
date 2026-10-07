"use client";

import { useState } from "react";
import type { Product, Size } from "@/data/products";
import { useBag } from "./BagProvider";
import { getDictionary } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

export function ProductPurchase({ product }: { product: Product }) {
  const t = getDictionary().product;
  const { add, open } = useBag();
  const [size, setSize] = useState<Size | null>(null);
  const [showHint, setShowHint] = useState(false);

  function onAdd() {
    if (!size) {
      setShowHint(true);
      return;
    }
    add(product.slug, size);
    open();
  }

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-[0.8125rem] tracking-wide text-muted">{t.sizeLabel}</legend>
        <div className="grid grid-cols-6 border-l border-t border-line">
          {product.sizes.map((s) => (
            <label key={s} className="relative cursor-pointer border-b border-r border-line">
              <input
                type="radio"
                name="size"
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setShowHint(false);
                }}
                className="peer sr-only"
              />
              <span className="flex h-11 items-center justify-center text-[0.8125rem] tracking-wide transition-colors duration-500 hover:bg-stone peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-current">
                {s}
              </span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-2 h-5 text-xs text-muted">
          {showHint ? t.sizeRequired : ""}
        </p>
      </fieldset>

      <div className="mt-4 flex items-center gap-6">
        <span className="text-base tabular-nums">{formatPrice(product.price)}</span>
        <button
          type="button"
          onClick={onAdd}
          className="h-12 flex-1 border border-ink text-[0.8125rem] tracking-[0.08em] transition-colors duration-700 ease-calm hover:bg-ink hover:text-paper"
        >
          {t.addToBag}
        </button>
      </div>
    </div>
  );
}
