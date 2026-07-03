import { useMemo, useState } from "react";
import type { Category, Item, ItemId } from "../data/types.ts";
import { useItems } from "../hooks/useItems.ts";
import { FilterBar, type PriceFilter } from "../components/FilterBar.tsx";
import { ItemCard } from "../components/ItemCard.tsx";
import { EmptyState } from "../components/EmptyState.tsx";

interface HomeScreenProps {
  onSelectItem: (itemId: ItemId) => void;
}

export function HomeScreen({ onSelectItem }: HomeScreenProps) {
  const itemsState = useItems();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  // Only compute the filtered list once we actually have items — avoids
  // re-running the filter pipeline on every render while still loading.
  const visibleItems = useMemo(() => {
    if (itemsState.status !== "ready") {
      return [];
    }
    return filterItems(itemsState.items, { query, category, priceFilter });
  }, [itemsState, query, category, priceFilter]);

  return (
    <>
      <section className="hero pegboard">
        <div className="hero__inner">
          <p className="hero__eyebrow">Borrow from people nearby</p>
          <h1 className="hero__title">The drill you need for one afternoon, not a lifetime.</h1>
          <p className="hero__sub">
            Browse what your neighbours are lending — tools, kitchen gear, party equipment. No
            account needed to look around.
          </p>
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            resultCount={visibleItems.length}
          />
        </div>
      </section>

      <div className="page">
        {/* Three mutually exclusive render branches, matching the three
            ItemsState variants — this is what "narrowing" buys us: no
            branch can render outside its matching status. */}
        {itemsState.status === "loading" && <p>Loading items…</p>}

        {itemsState.status === "error" && (
          <EmptyState title="Something went wrong" body={itemsState.message} />
        )}

        {itemsState.status === "ready" && visibleItems.length === 0 && (
          <EmptyState
            title="Nothing matches that search"
            body="Try a different word, or clear your filters."
            action={{
              label: "Clear filters",
              onClick: () => {
                setQuery("");
                setCategory("all");
                setPriceFilter("all");
              },
            }}
          />
        )}

        {itemsState.status === "ready" && visibleItems.length > 0 && (
          <div className="item-grid">
            {visibleItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={onSelectItem} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

interface FilterParams {
  query: string;
  category: Category | "all";
  priceFilter: PriceFilter;
}

/**
 * Pure function, deliberately kept outside the component and outside
 * React entirely — it's a plain data transform (Item[] in, Item[] out)
 * with no hooks or JSX, so it's trivial to reason about or unit test
 * on its own.
 */
function filterItems(items: Item[], { query, category, priceFilter }: FilterParams): Item[] {
  const q = query.trim().toLowerCase();

  return items
    // "removed" listings are gone for good — never show them, regardless
    // of search/filter state. "paused" ones are handled differently: see
    // ItemCard, which still renders them (dimmed) rather than hiding them.
    .filter((item) => item.status !== "removed")
    .filter((item) => (q ? item.title.toLowerCase().includes(q) : true))
    .filter((item) => (category === "all" ? true : item.category === category))
    .filter((item) => {
      if (priceFilter === "all") return true;
      if (priceFilter === "free") return item.price === null;
      return item.price !== null;
    });
}
