import type { Metadata } from "next";
import { MessagePage } from "@/components/MessagePage";
import { getDictionary } from "@/lib/i18n";

const t = getDictionary().cancel;

export const metadata: Metadata = { title: t.title, robots: { index: false } };

export default function CancelPage() {
  return <MessagePage title={t.title} body={t.body} linkLabel={t.back} />;
}
