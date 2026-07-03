import type { Item, ItemId } from "../data/types.ts";
import {
  categoryLabel,
  formatDistance,
  formatPrice,
  formatPricePeriod,
  formatRating,
  initials,
} from "../lib/format.ts";

interface ItemDetailScreenProps {
  item: Item;
  onBack: () => void;
  onBookNow: (itemId: ItemId) => void;
}

export function ItemDetailScreen({ item, onBack, onBookNow }: ItemDetailScreenProps) {
  // Drives both the status note below and the Book Now button's
  // disabled state — a paused/removed item should be visible but never
  // bookable, from either entry point.
  const bookable = item.status === "available";
  const photo = item.photoUrls[0];

  return (
    <div className="page">
      <button type="button" className="btn btn-ghost detail__back" onClick={onBack}>
        ← Back to browse
      </button>

      <div className="detail">
        <div className="detail__photo">
          {photo ? (
            // Real alt text here (unlike ItemCard's alt="") since this
            // is the primary, larger image on the page, not a duplicate
            // of adjacent text.
            <img src={photo} alt={item.title} />
          ) : (
            <span className="detail__photo--empty">No photo yet</span>
          )}
        </div>

        <div className="detail__category">{categoryLabel(item.category)}</div>

        <div className="detail__head">
          <h1 className="detail__title">{item.title}</h1>
        </div>

        {item.status === "paused" && (
          <p className="detail__status-note">This owner has paused new bookings for now.</p>
        )}
        {item.status === "removed" && (
          <p className="detail__status-note">This listing is no longer available.</p>
        )}

        <p className="detail__desc">{item.description}</p>

        <div className="detail__owner">
          <div className="detail__owner-avatar" aria-hidden="true">
            {/* Letter-avatar fallback — no owner photo field exists in
                the data model, so this never has a broken-image case to
                handle in the first place. */}
            {initials(item.owner.displayName)}
          </div>
          <div>
            <div className="detail__owner-name">Lent by {item.owner.displayName}</div>
            <div className="detail__owner-rating">
              {formatRating(item.owner.rating, item.owner.ratingCount)}
            </div>
          </div>
        </div>

        <div className="detail__price-row">
          <span className="detail__price">
            {formatPrice(item.price)}{" "}
            <span className="detail__price-period">{formatPricePeriod(item.price)}</span>
          </span>
          <span className="tag-card__distance">{formatDistance(item.distanceKm)}</span>
        </div>

        {/* disabled (not just visually styled) so a paused/removed item
            genuinely cannot be booked — this is enforced here, not only
            trusted to the booking screen. */}
        <button
          type="button"
          className="btn btn-primary"
          disabled={!bookable}
          onClick={() => onBookNow(item.id)}
          style={{ width: "100%" }}
        >
          {bookable ? "Book now" : "Not available right now"}
        </button>
      </div>
    </div>
  );
}
