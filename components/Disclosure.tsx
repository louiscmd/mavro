/** A quiet expandable section built on <details>; works without JS. */
export function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[0.8125rem] tracking-wide [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden className="text-muted transition-transform duration-500 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}
