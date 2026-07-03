/* ============================================================
 * Mock data. Pretend this is the JSON a real API would return.
 * Notice the deliberately awkward reality in here:
 *  - some items have no photos
 *  - some have no price (free)
 *  - some owners have no rating yet (null)
 *  - some items are "paused" and must not be bookable
 *  - distanceKm is null for some (viewer hasn't shared location)
 * Your UI has to handle ALL of these gracefully. That is the point.
 *
 * You may reshape how you load/serve this (a fake async fetch, a
 * context, a hook) — that architectural choice is yours to make
 * and to defend in your Decision Log.
 * ============================================================ */

import type { Item } from "./types.ts";

export const ITEMS: Item[] = [
  {
    id: "itm_001",
    title: "Cordless Drill (18V)",
    category: "power-tools",
    description: "Solid drill, two batteries, works for most home jobs.",
    photoUrls: ["https://www.bing.com/th?id=OPEC.EzsAuznBt4Oe9A474C474&o=5&pid=21.1&w=140&h=106&qlt=100&dpr=1,3&o=2"],
    price: { amountCents: 5000, period: "day" },
    owner: { id: "usr_a", displayName: "Naledi", rating: 4.8, ratingCount: 24, joinedISO: "2025-02-11" },
    distanceKm: 1.2,
    status: "available",
    postedISO: "2026-06-20",
  },
  {
    id: "itm_002",
    title: "Extension Ladder (3m)",
    category: "outdoor",
    description: "Aluminium, light, fits in a hatchback.",
    photoUrls: ["https://yardlink.com/wp-content/uploads/2024/03/6.3m_Double_Extension_Ladder.webp"],
    price: { amountCents: 5000, period: "day" },
    owner: { id: "usr_b", displayName: "Sipho", rating: 1.2, ratingCount: 10, joinedISO: "2026-06-18" },
    distanceKm: 2.0,
    status: "available",
    postedISO: "2026-06-25",
  },
  {
    id: "itm_003",
    title: "Pressure Washer",
    category: "outdoor",
    description: "Great for driveways and walls. Bring your own hose.",
    photoUrls: ["https://m.media-amazon.com/images/I/71QvIwb6ahL._AC_SL1500_.jpg"],
    price: { amountCents: 12000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "paused",
    postedISO: "2026-05-30",
  },
  {
    id: "itm_004",
    title: "Stand Mixer",
    category: "kitchen",
    description: "For big baking days. Comes with whisk + dough hook.",
    photoUrls: ["https://cb.scene7.com/is/image/Crate/KitchenAdArtJuniperSSS24_VND/$web_plp_card_hires$/240201155207/kitchenaid-artisan-series-juniper-5-quart-tilt-head-stand-mixer.jpg"],
    price: { amountCents: 8000, period: "day" },
    owner: { id: "usr_d", displayName: "Grace", rating: 5.0, ratingCount: 2, joinedISO: "2026-01-19" },
    distanceKm: 0.6,
    status: "available",
    postedISO: "2026-06-28",
  },
  {
    id: "itm_005",
    title: "Folding Tables (x4)",
    category: "party",
    description: "Set of four trestle tables. Good for events.",
    photoUrls: ["https://d9dvmj2a7k2dc.cloudfront.net/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/a/dad-ycz-122z-2-gg.jpg"],
    price: { amountCents: 15000, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: 8.1,
    status: "available",
    postedISO: "2026-06-15",
  },
  {
    id: "itm_006",
    title: "Lawn Mower (petrol)",
    category: "garden",
    description: "Self-propelled. A bit loud but cuts fast.",
    photoUrls: ["https://cdn.mos.cms.futurecdn.net/hUoSSQLzrxcmcFsWcwiRVe.jpg"],
    price: null,
    owner: { id: "usr_f", displayName: "Anele", rating: 4.5, ratingCount: 18, joinedISO: "2025-07-07" },
    distanceKm: 2.9,
    status: "available",
    postedISO: "2026-06-22",
  },
  {
    id: "itm_007",
    title: "Tile Cutter",
    category: "hand-tools",
    description: "Manual tile cutter, up to 600mm.",
    photoUrls: ["https://tse1.mm.bing.net/th/id/OIP.A_Y2KWicUvuSyuIAu6RUSAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 3000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "available",
    postedISO: "2026-06-11",
  },
  {
    id: "itm_008",
    title: "Gazebo (3x3m)",
    category: "party",
    description: "Pop-up gazebo, white. One pole has tape on it, still fine.",
    photoUrls: ["https://tse2.mm.bing.net/th/id/OIP.z4ORGZ3qf2hHcka0lqFGXwHaFf?rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 0, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: null,
    status: "removed",
    postedISO: "2026-04-02",
  },
];

/**
 * A fake async loader so you can practise typing data you don't
 * control yet. Use it or replace it — your call, but justify it.
 */
export function fetchItems(): Promise<Item[]> {
  return new Promise((resolve) => setTimeout(() => resolve(ITEMS), 400));
}
