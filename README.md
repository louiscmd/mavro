# mavro

Heather gray hoodies for entrepreneurs, each printed with a quiet place to work.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Stripe Checkout.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in STRIPE_SECRET_KEY (test mode, sk_test_…)
npm run dev                  # http://localhost:3000
```

Test card: `4242 4242 4242 4242`, any future date, any CVC.

## Add a place

1. Put the photo in `public/products/<slug>.webp`.
2. Add an entry to `data/products.ts` (slug, placeName, motto, season, setting, story, price in cents, sizes, images).
3. `npm run og` to regenerate the Open Graph images in `public/og`.

Nothing else needs to change: the grid, product page, metadata, sitemap and checkout read from that file.

## Structure

```
data/products.ts         the catalogue (single source of truth)
lib/dictionaries/en.ts   all interface copy; add fr.ts / pl.ts with the same shape
lib/i18n.ts              locale registry + getDictionary()
lib/products.ts          getProducts / getProduct / localizeProduct
lib/stripe.ts            server-side Stripe client
app/api/checkout         creates the Checkout Session (prices rebuilt server-side)
app/places/[slug]        product pages (statically generated)
components/              Header, Footer, BagProvider, BagPanel, ProductCard,
                         ProductGallery, ProductPurchase, SizeGuide, Reveal, …
```

## Translations

UI copy lives in `lib/dictionaries/en.ts`; product copy can be overridden per
locale with `translations: { fr: { motto: "…", story: "…" } }` in
`data/products.ts`. To ship French or Polish, add the dictionary, register the
locale in `lib/i18n.ts` and move routes under `app/[locale]/`.

## Deploy to Vercel

1. Import the GitHub repo on vercel.com (framework is detected automatically).
2. Add environment variables: `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL`
   (your production URL, e.g. `https://mavro.studio`).
3. Deploy.
