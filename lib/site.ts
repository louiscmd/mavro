export const site = {
  name: "mavro",
  instagram: "https://www.instagram.com/mavro",
  email: "hello@mavro.studio",
  /** Hoodie used in the home hero. */
  heroSlug: "cabin",
};

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
