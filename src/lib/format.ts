import type { Category, Price } from "../data/types.ts";

// Record<Category, string> forces this object to cover every Category
// value — if the union in data/types.ts ever gains a new category, this
// line fails to compile until a label is added here. A plain
// { [key: string]: string } wouldn't catch a missing entry.
const CATEGORY_LABELS: Record<Category, string> = {
  "power-tools": "Power tools",
  "hand-tools": "Hand tools",
  garden: "Garden",
  kitchen: "Kitchen",
  outdoor: "Outdoor",
  party: "Party",
  other: "Other",
};

export function categoryLabel(category: Category): string {
  return CATEGORY_LABELS[category];
}

/** Formats a Price for display. Returns "Free" when price is null. */
export function formatPrice(price: Price | null): string {
  if (price === null) {
    return "Free";
  }
  const rands = price.amountCents / 100;
  // Avoid "R50.00" for whole-rand amounts — only show decimals when
  // the price actually has cents.
  const amount = rands % 1 === 0 ? rands.toFixed(0) : rands.toFixed(2);
  return `R${amount}`;
}

/** The "/ day" (etc.) suffix shown next to a price, or "to borrow" for free items. */
export function formatPricePeriod(price: Price | null): string {
  if (price === null) {
    return "to borrow";
  }
  return `/ ${price.period}`;
}

/** Distance may be unknown (viewer hasn't shared location). */
export function formatDistance(distanceKm: number | null): string {
  if (distanceKm === null) {
    return "Distance unknown";
  }
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m away`;
  }
  return `${distanceKm.toFixed(1)} km away`;
}

/** Rating may be null when an owner has no ratings yet. */
export function formatRating(rating: number | null, count: number): string {
  if (rating === null || count === 0) {
    return "No ratings yet";
  }
  return `${rating.toFixed(1)} ★ (${count})`;
}

/** First letter of first + last name, for the owner avatar fallback (no owner photo field exists). */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

/** Human-readable "3 Jul – 5 Jul" style range for the booking summary. */
export function formatDateRange(startISO: string, endISO: string): string {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const fmt = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "short" });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/**
 * Whole days between two ISO date strings, minimum 1 — used to drive
 * both the "3 days" summary line and the pricing calculation in
 * BookingScreen's describeTotal.
 */
export function daysBetween(startISO: string, endISO: string): number {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}
