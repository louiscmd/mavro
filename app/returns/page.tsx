import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { getDictionary } from "@/lib/i18n";

const t = getDictionary().policies.returns;

export const metadata: Metadata = { title: t.title };

export default function Page() {
  return <TextPage title={t.title} paragraphs={t.body} />;
}
