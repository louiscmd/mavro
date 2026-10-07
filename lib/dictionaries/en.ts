/**
 * All interface and page copy. Translations copy this file, keep the same
 * shape (enforced by the `Dictionary` type) and change only the strings.
 */
export const en = {
  meta: {
    title: "mavro — places to work from",
    description:
      "Heather gray hoodies for entrepreneurs, each printed with a quiet place to work. For an entrepreneur, by an entrepreneur.",
  },
  nav: {
    home: "mavro",
    places: "places",
    about: "about",
    bag: "bag ({count})",
    skip: "skip to content",
  },
  home: {
    tagline: "for an entrepreneur, by an entrepreneur.",
    collectionTitle: "the places",
    collectionIntro: "Every hoodie is a place. Every place has a motto.",
    scroll: "the collection",
    brandTitle: "a quiet uniform",
    brand: [
      "Mavro makes one thing: a heavy heather gray hoodie with a place on its back. A study in a storm, a courtyard in Marrakech, a tent at the edge of an alpine lake. Places where good work happens because nothing is asking for attention.",
      "It is not a uniform for the hustle. It is for the people who build slowly, keep their heads down and let the work speak later.",
    ],
    brandLink: "read the story",
  },
  places: {
    title: "places",
    intro: "Nineteen places, one hoodie. Heavy brushed fleece in heather gray, printed on the back.",
  },
  product: {
    sizeLabel: "size",
    sizeRequired: "choose a size",
    addToBag: "add to bag",
    added: "added to bag",
    sizeGuide: "size guide",
    sizeGuideNote: "Measurements in centimetres, taken flat. The fit is relaxed and slightly oversized; size down for a closer fit.",
    sizeGuideHeaders: ["size", "chest width", "body length", "sleeve"],
    details: "details",
    detailsList: [
      "480 gsm brushed cotton fleece",
      "heather gray, garment dyed",
      "artwork printed on the back",
      "relaxed fit, dropped shoulders",
      "made in portugal",
    ],
    viewFull: "full view",
    viewDetail: "artwork detail",
    zoomHint: "tap to zoom",
    closeZoom: "close",
    back: "all places",
    more: "other places",
  },
  bag: {
    title: "bag",
    close: "close bag",
    empty: "Your bag is empty.",
    emptyLink: "see the places",
    size: "size {size}",
    decrease: "decrease quantity",
    increase: "increase quantity",
    remove: "remove",
    subtotal: "subtotal",
    shippingNote: "Shipping and taxes calculated at checkout.",
    checkout: "checkout",
    redirecting: "one moment…",
    error: "Checkout is unavailable right now. Please try again.",
  },
  success: {
    title: "thank you.",
    body: "Your order is in. A confirmation is on its way to your inbox, and your place will ship within three working days.",
    bodyWithEmail: "Your order is in. A confirmation is on its way to {email}, and your place will ship within three working days.",
    back: "back to the places",
  },
  cancel: {
    title: "no rush.",
    body: "Checkout was cancelled and nothing was charged. Your bag is still here whenever you are ready.",
    back: "back to the places",
  },
  about: {
    title: "about",
    lead: "for an entrepreneur, by an entrepreneur.",
    body: [
      "Mavro started with a simple observation: the best work I have done happened in quiet places. A borrowed desk by a window. A café before it opened. A cabin with bad signal.",
      "So we make one garment, and make it well: a heavy heather gray hoodie, the kind you forget you are wearing. On the back, a place. On each place, a short line to keep in mind.",
      "No drops, no countdowns, no noise. New places arrive when they are ready.",
    ],
    sign: "— mavro",
  },
  footer: {
    shipping: "shipping",
    returns: "returns",
    contact: "contact",
    instagram: "instagram",
    note: "heather gray, always.",
    rights: "© {year} mavro",
  },
  policies: {
    shipping: {
      title: "shipping",
      body: [
        "Placeholder. Orders ship within three working days from our studio in the EU.",
        "EU delivery: 3–6 working days. United Kingdom, Switzerland and Norway: 5–8 working days. Rest of world: 7–14 working days.",
        "Shipping costs are shown at checkout. You will receive a tracking link by email once your order leaves us.",
      ],
    },
    returns: {
      title: "returns",
      body: [
        "Placeholder. You can return unworn items within 30 days of delivery for a full refund.",
        "Write to us with your order number and we will send return instructions. Refunds are issued to the original payment method within five working days of receiving the return.",
        "Exchanges for a different size are free within the EU.",
      ],
    },
    contact: {
      title: "contact",
      body: [
        "Placeholder. For orders, sizing or anything else, write to {email}. We answer within one working day.",
        "Or find us on Instagram.",
      ],
    },
  },
  notFound: {
    title: "nothing here.",
    body: "This place does not exist, or not yet.",
    back: "back to the places",
  },
};

export type Dictionary = typeof en;
