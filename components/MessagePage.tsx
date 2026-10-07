import Link from "next/link";

/** Short centred message with a link back: success, cancel, 404. */
export function MessagePage({
  title,
  body,
  linkLabel,
  children,
}: {
  title: string;
  body: string;
  linkLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[36rem] flex-col justify-center px-5 pt-32">
      {children}
      <h1 className="fade-in font-serif text-5xl italic sm:text-6xl">{title}</h1>
      <p className="fade-in-late mt-8 text-[0.9375rem] leading-[1.85]">{body}</p>
      <Link
        href="/places"
        className="mt-10 self-start text-[0.8125rem] tracking-wide underline decoration-line underline-offset-4 transition-colors duration-500 hover:decoration-ink"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
