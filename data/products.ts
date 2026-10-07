/**
 * The whole catalogue lives here. To add a place:
 *   1. drop the image(s) into /public/products
 *   2. add an entry to `products` below
 * Everything else (grid, product page, metadata, sitemap, checkout) picks it up.
 *
 * Copy fields (placeName, motto, season, setting, story, alt) are written in
 * English. Translations go in the optional `translations` map, keyed by locale,
 * and are resolved by `localizeProduct` in /lib/products.ts.
 */

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Where the artwork sits on the photo, used for the "detail" view.
   * x / y are the centre of the print in %, zoom is the magnification.
   */
  detail?: { x: number; y: number; zoom: number };
};

export type ProductCopy = {
  placeName: string;
  motto: string;
  season: string;
  setting: string;
  story: string;
};

export type Product = ProductCopy & {
  slug: string;
  /** Price in euro cents. */
  price: number;
  sizes: readonly Size[];
  images: ProductImage[];
  translations?: Partial<Record<string, Partial<ProductCopy>>>;
};

const PRICE = 13500; // €135.00
const W = { width: 928, height: 1152 }; // first photo series
const T = { width: 896, height: 1200 }; // second photo series

export const products: Product[] = [
  {
    slug: "porthole",
    placeName: "the porthole",
    motto: "steady in any weather.",
    season: "winter",
    setting: "a lighthouse study on a stormy coast",
    story:
      "A brass lamp, an open logbook and a chart held flat by a cold mug of coffee. Outside, the sea throws itself at the rocks and nothing in the room moves. The storm is real; so is the work.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/porthole.webp",
        alt: "Heather gray hoodie, back view, with a round porthole illustration of a lamplit desk facing a stormy sea, and the motto “steady in any weather.”",
        ...W,
        detail: { x: 50, y: 52, zoom: 1.8 },
      },
    ],
  },
  {
    slug: "vineyard",
    placeName: "the vineyard",
    motto: "some things take seasons.",
    season: "late summer",
    setting: "a farmhouse terrace above the vines",
    story:
      "A stone farmhouse, a linen cloth, a carafe of water and a bowl of figs. The vines below took years before they gave anything worth keeping. Most good things do.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/vineyard.webp",
        alt: "Heather gray hoodie, back view, with a painted Tuscan farmhouse terrace, a laptop on a wooden table above rolling vineyards, and the motto “some things take seasons.”",
        ...W,
        detail: { x: 50, y: 52, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "tea-house",
    placeName: "the tea house",
    motto: "restraint is a skill.",
    season: "early spring",
    setting: "a veranda over a moss garden",
    story:
      "A low table, a teapot, a sketchbook left open. Cherry blossom over still water and stepping stones through the moss. Here, the hard part is knowing what to leave out.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/tea-house.webp",
        alt: "Heather gray hoodie, back view, with an illustration of a Japanese veranda overlooking a moss garden and koi pond under cherry blossom, and the vertical motto “restraint is a skill.”",
        ...W,
        detail: { x: 53, y: 52, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "desert-room",
    placeName: "the desert room",
    motto: "far from the noise, close to the work.",
    season: "golden hour",
    setting: "an adobe studio in the desert",
    story:
      "Clay walls, an open door and red mesas in the last of the light. One desk, one cup, nothing on the calendar. The quiet is not an escape; it is where the work gets done.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/desert-room.webp",
        alt: "Heather gray hoodie, back view, with an arched painting of an adobe room opening onto desert mesas at golden hour, and the motto “far from the noise, close to the work.”",
        ...W,
        detail: { x: 50, y: 52, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "beach-house",
    placeName: "the beach house",
    motto: "no audience required.",
    season: "autumn",
    setting: "an empty beach house terrace",
    story:
      "The season is over and the dunes are empty. A director's chair, a sweater on the railing, a laptop on a weathered bench. Nobody is watching, which is exactly the point.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/beach-house.webp",
        alt: "Heather gray hoodie, back view, with a muted painting of an empty wooden beach terrace above the dunes and sea, and the motto “no audience required.”",
        ...W,
        detail: { x: 50, y: 52, zoom: 1.6 },
      },
    ],
  },
  {
    slug: "meadow",
    placeName: "the meadow",
    motto: "the long way, on purpose.",
    season: "spring",
    setting: "a tent beside an alpine lake",
    story:
      "A canvas tent, a folding table and wildflowers up to the ankles. The road ended a few hours' walk ago. Some places are only worth it because they take a while to reach.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/meadow.webp",
        alt: "Heather gray hoodie, back view, with an arched engraving-style illustration of a tent and folding desk in an alpine meadow beside a lake, and the curved motto “the long way, on purpose.”",
        ...W,
        detail: { x: 50, y: 54, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "hut",
    placeName: "the hut",
    motto: "freedom was the plan.",
    season: "summer",
    setting: "an island hut over turquoise water",
    story:
      "A thatched roof on bamboo stilts, a hammock, a coconut beside the laptop. The water is clear enough to count the posts. This was never a holiday; it was the whole idea.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/hut.webp",
        alt: "Heather gray hoodie, back view, with a vintage-style illustration of a thatched hut on stilts over turquoise water, and the motto “freedom was the plan.”",
        ...W,
        detail: { x: 50, y: 50, zoom: 1.6 },
      },
    ],
  },
  {
    slug: "cafe",
    placeName: "the café",
    motto: "first light, first draft.",
    season: "winter",
    setting: "a café window on a snowy old-town street",
    story:
      "A croissant, a flat white and a frosted window onto an old-town street. The first tram goes by under the lamps. The city is still asleep; the first page is already written.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/cafe.webp",
        alt: "Heather gray hoodie, back view, with a painting of a café window seat overlooking a snowy old-town street and tram at dawn, and the motto “first light, first draft.”",
        ...W,
        detail: { x: 50, y: 50, zoom: 1.6 },
      },
    ],
  },
  {
    slug: "train",
    placeName: "the train",
    motto: "in motion, without hurry.",
    season: "winter",
    setting: "a window seat crossing an alpine viaduct",
    story:
      "A window seat, a paper cup and a newspaper folded in half. Outside, the train curves over a stone viaduct into a white valley. Moving forward does not have to mean rushing.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/train.webp",
        alt: "Heather gray hoodie, back view, with a blue cyanotype-style print of a train window overlooking a snowy alpine viaduct, and the motto “in motion, without hurry.”",
        ...T,
        detail: { x: 50, y: 42, zoom: 1.8 },
      },
    ],
  },
  {
    slug: "bothy",
    placeName: "the bothy",
    motto: "nothing to prove.",
    season: "autumn",
    setting: "a stone cottage in the scottish highlands",
    story:
      "A stone cottage in the heather, a loch beyond and a tartan scarf on the desk. No signal worth mentioning, no one to impress. The work is simply the work.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/bothy.webp",
        alt: "Heather gray hoodie, back view, with two watercolour panels of a highland stone cottage and a desk by the window, and the motto “nothing to prove.”",
        ...T,
        detail: { x: 50, y: 45, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "riad",
    placeName: "the riad",
    motto: "small rooms, large plans.",
    season: "spring",
    setting: "a courtyard with a fountain and a lemon tree",
    story:
      "Tiled arches, a fountain, a lemon tree and a glass of mint tea. The courtyard is small and the sky above it is not. Big things are usually planned in quiet rooms.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/riad.webp",
        alt: "Heather gray hoodie, back view, with a flat illustration of a Moroccan riad courtyard with a fountain, lemon tree and a laptop on a low table, and the motto “small rooms, large plans.”",
        ...T,
        detail: { x: 50, y: 48, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "greenhouse",
    placeName: "the greenhouse",
    motto: "nobody sees the roots.",
    season: "autumn",
    setting: "a glasshouse study in a falling-leaf forest",
    story:
      "Iron and glass, hanging ferns and a candle on the desk while the forest outside turns gold. What grows here grows slowly and mostly out of sight. That is where it counts.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/greenhouse.webp",
        alt: "Heather gray hoodie, back view, with a detailed illustration of a Victorian greenhouse study with books and plants in an autumn forest, and the motto “nobody sees the roots.”",
        ...T,
        detail: { x: 50, y: 44, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "cabin",
    placeName: "the cabin",
    motto: "earned quietly.",
    season: "late autumn",
    setting: "a black cabin in a misty pine forest",
    story:
      "A dark cabin with one lit window, wet gravel and an old coupé parked under the pines. No announcement, no caption. Some things are better shown by simply being there.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/cabin.webp",
        alt: "Heather gray hoodie, back view, with a charcoal-style illustration of a black cabin with a lit window and a classic car in a misty pine forest, and the motto “earned quietly.”",
        ...T,
        detail: { x: 50, y: 44, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "boathouse",
    placeName: "the boathouse",
    motto: "own your time.",
    season: "summer",
    setting: "a red boathouse on a norwegian fjord",
    story:
      "A red boathouse, a bench on the jetty and a rowing boat tied at the end. Waterfalls run down the cliffs across the fjord. The day belongs to whoever decides how to spend it.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/boathouse.webp",
        alt: "Heather gray hoodie, back view, with a three-panel illustration of a red boathouse and jetty on a Norwegian fjord, and the vertical motto “own your time.”",
        ...T,
        detail: { x: 48, y: 46, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "rooftop",
    placeName: "the rooftop",
    motto: "the work speaks later.",
    season: "autumn",
    setting: "a covered rooftop terrace in the rain",
    story:
      "Rain on the awning, a glass of red and a laptop glowing over the city. Everyone else went inside an hour ago. The results will arrive in their own time.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/rooftop.webp",
        alt: "Heather gray hoodie, back view, with a woodcut-style print of a rooftop table under an awning in the rain at night, and the motto “the work speaks later.”",
        ...T,
        detail: { x: 50, y: 48, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "dock",
    placeName: "the dock",
    motto: "think long. move quietly.",
    season: "autumn",
    setting: "a misty lake at dawn",
    story:
      "A wooden canoe, a thermos and a notebook at the end of the dock. Mist lifts off the water as the trees catch fire with colour. Decide slowly, then go without a sound.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/dock.webp",
        alt: "Heather gray hoodie, back view, with an oval watercolour of a wooden dock and canoe on a misty autumn lake, and the motto “think long. move quietly.”",
        ...T,
        detail: { x: 50, y: 45, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "window",
    placeName: "the window",
    motto: "patience compounds.",
    season: "winter",
    setting: "a lamplit cabin window above snowy peaks",
    story:
      "An oil lamp, a fountain pen and steam rising off a mug. Snow keeps falling on the pines and the mountains do not move. Small, quiet efforts add up to something large.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/window.webp",
        alt: "Heather gray hoodie, back view, with a sepia engraving of a frosted cabin window over snowy mountains, an oil lamp and an open journal, and the motto “patience compounds.”",
        ...T,
        detail: { x: 50, y: 48, zoom: 1.7 },
      },
    ],
  },
  {
    slug: "balcony",
    placeName: "the balcony",
    motto: "early, and unannounced.",
    season: "early spring",
    setting: "a rooftop balcony above a misty old city",
    story:
      "A bistro table, an olive tree in a clay pot and an espresso going cold. The spires are still half lost in fog. Up before the city, working before anyone knows.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/balcony.webp",
        alt: "Heather gray hoodie, back view, with a pastel illustration of a wrought-iron balcony with a bistro table and olive tree above misty rooftops at dawn, and the motto “early, and unannounced.”",
        ...W,
        detail: { x: 50, y: 52, zoom: 1.6 },
      },
    ],
  },
  {
    slug: "postcard",
    placeName: "the postcard",
    motto: "early, and unannounced.",
    season: "early spring",
    setting: "the same rooftop, printed as a postage stamp",
    story:
      "The balcony again, pressed into a pink postage stamp. The same table, the same olive tree, the same quiet start. A small note sent from the hours no one else sees.",
    price: PRICE,
    sizes: SIZES,
    images: [
      {
        src: "/products/postcard.webp",
        alt: "Heather gray hoodie, back view, with a pink postage-stamp illustration of a rooftop terrace with a bistro table and olive tree, and the motto “early, and unannounced.”",
        ...T,
        detail: { x: 50, y: 45, zoom: 1.7 },
      },
    ],
  },
];
