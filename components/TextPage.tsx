import { Reveal } from "./Reveal";

/** Narrow, text-only page used for about and the policy placeholders. */
export function TextPage({
  title,
  lead,
  paragraphs,
  children,
}: {
  title: string;
  lead?: string;
  paragraphs: string[];
  children?: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[36rem] px-5 pt-40 sm:pt-48">
      <h1 className="fade-in font-serif text-5xl italic leading-none sm:text-6xl">{title}</h1>
      {lead && <p className="fade-in-late mt-6 font-serif text-2xl italic text-muted">{lead}</p>}
      <div className="mt-12 h-px bg-line" />
      <div className="mt-12 space-y-6 text-[0.9375rem] leading-[1.85]">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 120}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
      {children}
    </article>
  );
}
