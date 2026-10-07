import type { Metadata } from "next";
import { ClearBag } from "@/components/ClearBag";
import { MessagePage } from "@/components/MessagePage";
import { fill, getDictionary } from "@/lib/i18n";
import { getStripe } from "@/lib/stripe";

const t = getDictionary().success;

export const metadata: Metadata = { title: t.title, robots: { index: false } };

async function getEmail(sessionId?: string) {
  if (!sessionId) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? (session.customer_details?.email ?? null) : null;
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const email = await getEmail((await searchParams).session_id);
  return (
    <MessagePage title={t.title} body={email ? fill(t.bodyWithEmail, { email }) : t.body} linkLabel={t.back}>
      <ClearBag />
    </MessagePage>
  );
}
