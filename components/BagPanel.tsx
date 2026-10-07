"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MAX_QUANTITY, useBag } from "./BagProvider";
import { getProduct } from "@/lib/products";
import { fill, getDictionary } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

export function BagPanel() {
  const t = getDictionary().bag;
  const { items, isOpen, close, setQuantity, remove } = useBag();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const lines = items
    .map((item) => ({ item, product: getProduct(item.slug) }))
    .filter((l): l is { item: typeof l.item; product: NonNullable<typeof l.product> } => !!l.product);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.item.quantity, 0);

  // Focus management, Escape to close, and scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus();
    };
  }, [isOpen, close]);

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = (await res.json()) as { url?: string };
      if (!res.ok || !data.url) throw new Error();
      window.location.assign(data.url);
    } catch {
      setError(t.error);
      setPending(false);
    }
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-scrim transition-opacity duration-700 ease-calm ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col border-l border-line bg-paper transition-transform duration-700 ease-calm ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <h2 id="bag-title" className="font-serif text-2xl italic">
            {t.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="text-[0.8125rem] tracking-wide transition-opacity duration-500 hover:opacity-60"
          >
            {t.close}
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="font-serif text-xl italic text-muted">{t.empty}</p>
            <Link href="/places" onClick={close} className="underline decoration-line underline-offset-4">
              {t.emptyLink}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map(({ item, product }) => (
                <li key={`${item.slug}-${item.size}`} className="flex gap-4 py-6">
                  <Link
                    href={`/places/${product.slug}`}
                    onClick={close}
                    className="relative block aspect-[3/4] w-20 shrink-0 overflow-hidden bg-stone"
                  >
                    <Image
                      src={product.images[0].src}
                      alt=""
                      fill
                      sizes="80px"
                      className="photo object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        href={`/places/${product.slug}`}
                        onClick={close}
                        className="font-serif text-lg italic leading-tight"
                      >
                        {product.placeName}
                      </Link>
                      <span className="tabular-nums">{formatPrice(product.price * item.quantity)}</span>
                    </div>
                    <p className="text-xs text-muted">{fill(t.size, { size: item.size })}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          aria-label={`${t.decrease}: ${product.placeName}, ${item.size}`}
                          onClick={() => setQuantity(item.slug, item.size, item.quantity - 1)}
                          className="h-8 w-8 transition-opacity duration-500 hover:opacity-60"
                        >
                          −
                        </button>
                        <span className="w-6 text-center tabular-nums" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`${t.increase}: ${product.placeName}, ${item.size}`}
                          onClick={() => setQuantity(item.slug, item.size, item.quantity + 1)}
                          disabled={item.quantity >= MAX_QUANTITY}
                          className="h-8 w-8 transition-opacity duration-500 hover:opacity-60 disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.slug, item.size)}
                        className="text-xs text-muted underline decoration-line underline-offset-4 transition-colors duration-500 hover:text-ink"
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 pb-8 pt-6">
              <div className="flex items-baseline justify-between">
                <span>{t.subtotal}</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{t.shippingNote}</p>
              <button
                type="button"
                onClick={checkout}
                disabled={pending}
                className="mt-6 h-12 w-full bg-ink text-paper tracking-wide transition-opacity duration-500 hover:opacity-85 disabled:opacity-60"
              >
                {pending ? t.redirecting : t.checkout}
              </button>
              {error && (
                <p role="alert" className="mt-3 text-xs text-muted">
                  {error}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
