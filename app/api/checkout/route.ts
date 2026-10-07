import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { SIZES, type Size } from "@/data/products";
import { getProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";
import { siteUrl } from "@/lib/site";

const MAX_QUANTITY = 10;
const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH", "NO", "US", "CA", "AU", "JP",
];

type IncomingItem = { slug?: unknown; size?: unknown; quantity?: unknown };

export async function POST(request: Request) {
  let body: { items?: IncomingItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Never trust prices or names from the client: rebuild every line from /data/products.ts.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const origin = siteUrl();
  const publicImages = origin.startsWith("https://");

  for (const item of Array.isArray(body.items) ? body.items : []) {
    const product = typeof item.slug === "string" ? getProduct(item.slug) : undefined;
    const size = item.size as Size;
    const quantity = Number(item.quantity);
    if (!product || !SIZES.includes(size) || !product.sizes.includes(size)) {
      return NextResponse.json({ error: "Unknown product or size." }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }
    lineItems.push({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.price,
        product_data: {
          name: `mavro — ${product.placeName} (${size})`,
          description: product.motto,
          images: publicImages ? [`${origin}${product.images[0].src}`] : undefined,
          metadata: { slug: product.slug, size },
        },
      },
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "standard shipping",
            type: "fixed_amount",
            fixed_amount: { amount: 800, currency: "eur" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
