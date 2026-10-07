import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { getDictionary } from "@/lib/i18n";

const t = getDictionary().about;

export const metadata: Metadata = { title: t.title, description: t.lead };

export default function AboutPage() {
  return (
    <TextPage title={t.title} lead={t.lead} paragraphs={t.body}>
      <p className="mt-10 font-serif text-xl italic text-muted">{t.sign}</p>
    </TextPage>
  );
}
