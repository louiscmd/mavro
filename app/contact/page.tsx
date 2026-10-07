import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { fill, getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

const t = getDictionary().policies.contact;

export const metadata: Metadata = { title: t.title };

export default function ContactPage() {
  return (
    <TextPage title={t.title} paragraphs={t.body.map((p) => fill(p, { email: site.email }))}>
      <p className="mt-10 space-x-8 text-[0.8125rem] tracking-wide">
        <a href={`mailto:${site.email}`} className="underline decoration-line underline-offset-4">
          {site.email}
        </a>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4">
          instagram
        </a>
      </p>
    </TextPage>
  );
}
