import { MessagePage } from "@/components/MessagePage";
import { getDictionary } from "@/lib/i18n";

export default function NotFound() {
  const t = getDictionary().notFound;
  return <MessagePage title={t.title} body={t.body} linkLabel={t.back} />;
}
