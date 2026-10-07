"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/data/products";
import { getDictionary } from "@/lib/i18n";

type View = { image: ProductImage; detail: boolean };

/**
 * Main product image plus an "artwork detail" view (the same photo, magnified
 * on the print). Tapping the image opens a full-screen zoom.
 */
export function ProductGallery({ images, placeName }: { images: ProductImage[]; placeName: string }) {
  const t = getDictionary().product;
  const views: View[] = images.flatMap((image) => [
    { image, detail: false },
    ...(image.detail ? [{ image, detail: true }] : []),
  ]);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const view = views[active];

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-stone"
        aria-label={`${placeName}, ${t.zoomHint}`}
      >
        {views.map((v, i) => (
          <Frame key={i} view={v} visible={i === active} priority={i === 0} />
        ))}
      </button>

      {views.length > 1 && (
        <div className="mt-4 flex gap-6 px-5 text-[0.8125rem] sm:px-0" role="group" aria-label="views">
          {views.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`border-b pb-1 tracking-wide transition-colors duration-500 ${
                i === active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {v.detail ? t.viewDetail : t.viewFull}
            </button>
          ))}
        </div>
      )}

      {zoomed && <Zoom view={view} onClose={() => setZoomed(false)} closeLabel={t.closeZoom} />}
    </div>
  );
}

function Frame({ view, visible, priority }: { view: View; visible: boolean; priority: boolean }) {
  const d = view.image.detail;
  const style =
    view.detail && d ? { transform: `scale(${d.zoom})`, transformOrigin: `${d.x}% ${d.y}%` } : undefined;
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-calm ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden={!visible}
    >
      <Image
        src={view.image.src}
        alt={visible ? view.image.alt : ""}
        fill
        priority={priority}
        quality={90}
        sizes="(min-width: 1024px) 55vw, 100vw"
        style={style}
        className="photo object-cover"
      />
    </div>
  );
}

function Zoom({ view, onClose, closeLabel }: { view: View; onClose: () => void; closeLabel: string }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={view.image.alt}
      className="fade-in fixed inset-0 z-50 overflow-auto bg-paper"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="fixed right-5 top-5 z-10 bg-paper/80 px-3 py-1 text-[0.8125rem] tracking-wide sm:right-8"
      >
        {closeLabel}
      </button>
      <div className="mx-auto min-h-full w-full max-w-[1100px] cursor-zoom-out">
        <Image
          src={view.image.src}
          alt={view.image.alt}
          width={view.image.width}
          height={view.image.height}
          quality={90}
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="photo h-auto w-full"
        />
      </div>
    </div>
  );
}
