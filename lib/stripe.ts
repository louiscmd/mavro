import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set. Copy .env.example to .env.local.");
  client ??= new Stripe(key);
  return client;
}
