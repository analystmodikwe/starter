/* ============================================================
 * FilterBar — pure "controlled input" component.
 * Holds no state of its own; the parent (HomeScreen) owns query/
 * category/priceFilter and passes both the current value and a setter
 * down. Keeping it stateless makes HomeScreen the single source of
 * truth for "what is currently filtered", which is what actually
 * drives the item grid.
 * ============================================================ */

import type { Category } from "../data/types.ts";

export type PriceFilter = "all" | "free" | "paid";

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: Category | "all";
  onCategoryChange: (value: Category | "all") => void;
  priceFilter: PriceFilter;
  onPriceFilterChange: (value: PriceFilter) => void;
  resultCount: number;
}

// "all" isn't a real Category, so this list is built by hand rather than
// derived from the Category union — deliberately, so "All categories"
// can sit first without awkwardly extending the domain type just for UI.
const CATEGORIES: Array<{ value: Category | "all"; label: string }> = [
  { value: "all", label: "All categories" },
  { value: "power-tools", label: "Power tools" },
  { value: "hand-tools", label: "Hand tools" },
  { value: "garden", label: "Garden" },
  { value: "kitchen", label: "Kitchen" },
  { value: "outdoor", label: "Outdoor" },
  { value: "party", label: "Party" },
  { value: "other", label: "Other" },
];

export function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  priceFilter,
  onPriceFilterChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar" role="search">
      <div className="filter-bar__search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {/* Visually hidden but present for screen readers — the search
            icon alone isn't an accessible label. */}
        <label htmlFor="item-search" className="visually-hidden">
          Search items
        </label>
        <input
          id="item-search"
          type="text"
          placeholder="Search for a drill, a ladder, a mixer…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <label htmlFor="category-filter" className="visually-hidden">
        Filter by category
      </label>
      <select
        id="category-filter"
        className="filter-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "all")}
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* role="group" + aria-pressed on each chip is what makes this
          read as a real toggle-button group to assistive tech, not just
          three unrelated buttons. */}
      <div className="filter-chip-group" role="group" aria-label="Filter by price">
        {(["all", "free", "paid"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className="filter-chip"
            aria-pressed={priceFilter === value}
            onClick={() => onPriceFilterChange(value)}
          >
            {value === "all" ? "Any price" : value === "free" ? "Free" : "Paid"}
          </button>
        ))}
      </div>

      {/* aria-live announces the updated count to screen reader users
          after each filter change, without needing focus to move. */}
      <div className="filter-bar__results" aria-live="polite">
        {resultCount} {resultCount === 1 ? "item" : "items"} nearby
      </div>
    </div>
  );
}
