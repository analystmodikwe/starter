/* ============================================================
 * ItemCard — the "price tag" signature component (see styles.css
 * .tag-card for the punched-hole + dashed-line visual).
 * Every field here can be missing/null per data/types.ts, so each
 * render path has an explicit fallback — nothing assumes "happy path"
 * data.
 * ============================================================ */

import type { Item } from "../data/types.ts";
import { categoryLabel, formatDistance, formatPrice, formatPricePeriod } from "../lib/format.ts";

interface ItemCardProps {
  item: Item;
  onSelect: (itemId: Item["id"]) => void;
}

export function ItemCard({ item, onSelect }: ItemCardProps) {
  // "removed" items never reach this component (filtered out earlier in
  // HomeScreen); "paused" ones do, dimmed via this flag, so a browsing
  // user can still see the listing exists without being able to book it.
  const unavailable = item.status !== "available";
  const photo = item.photoUrls[0];

  return (
    // Real <button>, not a <div onClick>, so this card is keyboard-
    // reachable (Tab) and activatable (Enter/Space) for free.
    <button
      type="button"
      className={`tag-card${unavailable ? " tag-card--unavailable" : ""}`}
      onClick={() => onSelect(item.id)}
    >
      <div className="tag-card__photo">
        {photo ? (
          // alt="" because the title text right below already describes
          // the item — a screen reader doesn't need the image described
          // twice.
          <img src={photo} alt="" loading="lazy" />
        ) : (
          <span className="tag-card__photo--empty">No photo yet</span>
        )}
      </div>
      <div className="tag-card__body">
        <span className="tag-card__category">{categoryLabel(item.category)}</span>
        <h3 className="tag-card__title">{item.title}</h3>

        {item.status === "paused" && <span className="badge badge--paused">Paused by owner</span>}
        {item.status === "removed" && <span className="badge badge--removed">No longer listed</span>}

        <div className="tag-card__meta-row">
          {/* formatPrice/formatPricePeriod already handle price === null
              (a free item) — this component doesn't need its own null
              check, the formatter owns that. */}
          <span className={`tag-card__price${item.price === null ? " tag-card__price--free" : ""}`}>
            {formatPrice(item.price)}{" "}
            <span style={{ fontWeight: 400, fontSize: "0.75em" }}>{formatPricePeriod(item.price)}</span>
          </span>
          <span className="tag-card__distance">{formatDistance(item.distanceKm)}</span>
        </div>
      </div>
    </button>
  );
}
