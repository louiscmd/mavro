import Link from "next/link";
import { fill, getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer() {
  const t = getDictionary().footer;
  const links = [
    { href: "/shipping", label: t.shipping },
    { href: "/returns", label: t.returns },
    { href: "/contact", label: t.contact },
  ];

  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
        <div>
          <p className="font-serif text-3xl italic">mavro</p>
          <p className="mt-1 text-[0.8125rem] text-muted">{t.note}</p>
        </div>
        <nav aria-label="footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.8125rem] tracking-wide">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-opacity duration-500 hover:opacity-60">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-500 hover:opacity-60"
              >
                {t.instagram}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 pb-8 text-xs text-muted sm:px-8 lg:px-12">
        {fill(t.rights, { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
