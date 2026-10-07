import { getDictionary } from "@/lib/i18n";
import { Disclosure } from "./Disclosure";

// Flat garment measurements in cm: chest width, body length, sleeve.
const MEASUREMENTS: [string, number, number, number][] = [
  ["XS", 56, 66, 58],
  ["S", 59, 68, 59],
  ["M", 62, 70, 60],
  ["L", 65, 72, 61],
  ["XL", 68, 74, 62],
  ["XXL", 71, 76, 63],
];

export function SizeGuide() {
  const t = getDictionary().product;
  return (
    <Disclosure title={t.sizeGuide}>
      <table className="w-full text-left text-[0.8125rem] tabular-nums">
        <thead>
          <tr className="border-b border-line text-muted">
            {t.sizeGuideHeaders.map((h) => (
              <th key={h} scope="col" className="py-2 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEASUREMENTS.map(([size, ...values]) => (
            <tr key={size} className="border-b border-line last:border-0">
              <th scope="row" className="py-2 font-normal">
                {size}
              </th>
              {values.map((v, i) => (
                <td key={i} className="py-2">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs leading-relaxed text-muted">{t.sizeGuideNote}</p>
    </Disclosure>
  );
}
