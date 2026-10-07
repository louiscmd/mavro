// Builds 1200x630 Open Graph JPEGs into /public/og from the product photos
// (social platforms handle JPEG more reliably than WebP).
// Run `npm run og` after adding a product. Uses `sharp`, which ships with Next.js.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "public/products");
const out = path.join(root, "public/og");
const PAPER = { r: 0xff, g: 0xff, b: 0xff };
fs.mkdirSync(out, { recursive: true });

async function card(file, target) {
  const photo = await sharp(path.join(src, file)).resize({ height: 630, fit: "inside" }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: PAPER } })
    .composite([{ input: photo, gravity: "center", blend: "multiply" }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(target);
}

for (const file of fs.readdirSync(src).filter((f) => /\.(webp|jpe?g|png)$/i.test(f))) {
  await card(file, path.join(out, `${path.parse(file).name}.jpg`));
}
await card("boathouse.webp", path.join(out, "default.jpg"));
console.log("og images written to public/og");
