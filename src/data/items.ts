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
    title: "Hand Tools Set",
    category: "hand-tools",
    description: "Spanner, pliers, hammer, screwdriver, etc..,",
    photoUrls: ["https://tse4.mm.bing.net/th/id/OIP.WVrQqS7pbQJT6UDCcr78mwHaFr?rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 5000, period: "day" },
    owner: { id: "usr_a", displayName: "Naledi", rating: 4.8, ratingCount: 24, joinedISO: "2025-02-11" },
    distanceKm: 1.2,
    status: "available",
    postedISO: "2026-06-20",
  },
  {
    id: "itm_002",
    title: "Gardening Tools Set",
    category: "outdoor",
    description: "spade, fork, trowel, etc...",
    photoUrls: ["https://tse2.mm.bing.net/th/id/OIP.DJv3LmH6bc9asFCUf1F60gHaEO?rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 5000, period: "day" },
    owner: { id: "usr_b", displayName: "Sipho", rating: 1.2, ratingCount: 10, joinedISO: "2026-06-18" },
    distanceKm: 2.0,
    status: "available",
    postedISO: "2026-06-25",
  },
  {
    id: "itm_003",
    title: "Garden Hose Pipe",
    category: "outdoor",
    description: "100ft garden hose with spray nozzle.",
    photoUrls: ["https://tse3.mm.bing.net/th/id/OIP.SF3IQI3yxb2ULoMtf6pVgQHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3"],
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
    title: "Jumping Castle",
    category: "party",
    description: "fun for the kids! 4x4m, 2.5m tall.",
    photoUrls: ["https://th.bing.com/th/id/R.32134938e7faaa8547f9264a19aa2fb7?rik=l8MdS2ggX7PovQ&riu=http%3a%2f%2fwww.rainbowinflatableskzn.co.za%2fwp-content%2fuploads%2f2015%2f06%2fSTANDARD-JUMPING-CASTLE2-1500x1500.jpg&ehk=INh4TbKniGtNqcAA726oCF7gLkJCQbbgFAkZigNYT0k%3d&risl=&pid=ImgRaw&r=0"],
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
    title: "Staple Gun",
    category: "hand-tools",
    description: "Manual Staple Gun, up to 600mm.",
    photoUrls: ["https://m.media-amazon.com/images/I/817B2oxnkeL._AC_.jpg"],
    price: { amountCents: 3000, period: "day" },
    owner: { id: "usr_c", displayName: "Fatima", rating: 4.2, ratingCount: 6, joinedISO: "2025-11-02" },
    distanceKm: 4.7,
    status: "available",
    postedISO: "2026-06-11",
  },
  {
    id: "itm_008",
    title: "Stretch Tent",
    category: "party",
    description: "Stretch tent for outdoors",
    photoUrls: ["https://tse2.mm.bing.net/th/id/OIP.6quUmJbT_-FWsyGpxT6gGQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"],
    price: { amountCents: 17000, period: "day" },
    owner: { id: "usr_e", displayName: "Themba", rating: 3.9, ratingCount: 11, joinedISO: "2024-09-14" },
    distanceKm: null,
    status: "available",
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
