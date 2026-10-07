"use client";

import Link from "next/link";
import { useBag } from "./BagProvider";
import { fill, getDictionary } from "@/lib/i18n";

export function Header() {
  const t = getDictionary().nav;
  const { count, open } = useBag();

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-paper/85 backdrop-blur-sm">
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
            <Link href="/places" className="transition-opacity duration-500 hover:opacity-60">
              {t.places}
            </Link>
          </li>
          <li>
            <Link href="/about" className="transition-opacity duration-500 hover:opacity-60">
              {t.about}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={open}
              aria-haspopup="dialog"
              className="tabular-nums transition-opacity duration-500 hover:opacity-60"
            >
              {fill(t.bag, { count })}
            </button>
          </li>
        </ul>
      </nav>
      <div className="h-px bg-line" />
    </header>
  );
}
