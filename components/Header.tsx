"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBag } from "./BagProvider";
import { fill, getDictionary } from "@/lib/i18n";

/** Slides out of the way while scrolling down, glides back on the way up. */
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return hidden;
}

export function Header() {
  const t = getDictionary().nav;
  const { count, open } = useBag();
  const pathname = usePathname();
  const hidden = useHideOnScroll();
  const current = (href: string) => (pathname.startsWith(href) ? "page" : undefined);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 bg-paper/85 backdrop-blur-sm transition-transform duration-700 ease-calm focus-within:translate-y-0 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-3 focus:py-2"
      >
        {t.skip}
      </a>
      <nav
        aria-label="main"
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link href="/" className="font-serif text-2xl italic leading-none tracking-wide">
          {t.home}
        </Link>
        <ul className="flex items-center gap-6 text-[0.8125rem] tracking-wide sm:gap-9">
          <li>
            <Link href="/places" aria-current={current("/places")} className="link-line">
              {t.places}
            </Link>
          </li>
          <li>
            <Link href="/about" aria-current={current("/about")} className="link-line">
              {t.about}
            </Link>
          </li>
          <li>
            <button type="button" onClick={open} aria-haspopup="dialog" className="link-line tabular-nums">
              {/* keyed on count so the number fades in afresh when it changes */}
              <span key={count} className="count-fade">
                {fill(t.bag, { count })}
              </span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="h-px bg-line" />
    </header>
  );
}
