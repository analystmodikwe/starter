import { useState } from "react";
import type { Item } from "../data/types.ts";
import type { Session } from "../state/types.ts";
import { formatDateRange, formatPrice, daysBetween } from "../lib/format.ts";
import { QuickContinueModal } from "../components/QuickContinueModal.tsx";

interface BookingScreenProps {
  item: Item;
  session: Session | null;
  onSessionCreated: (session: Session) => void;
  onBack: () => void;
  onDone: () => void;
}

type Step = "dates" | "review" | "done";

export function BookingScreen({ item, session, onSessionCreated, onBack, onDone }: BookingScreenProps) {
  const [step, setStep] = useState<Step>("dates");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  // Local to this screen, not lifted to App — the modal is purely a
  // "how do I get a session" detail of the booking flow, nothing else
  // in the app needs to know it exists.
  const [showAuthModal, setShowAuthModal] = useState(false);

  function handleDatesSubmit() {
    if (!startDate || !endDate) {
      setDateError("Pick both a start and end date.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setDateError("End date can't be before the start date.");
      return;
    }
    setDateError(null);
    setStep("review");
  }

  function handleConfirm() {
    if (!agreed) {
      return;
    }
    if (!session) {
      // This is the ONE place auth is ever requested — at the point of
      // commitment, not on page load. If there's already a session
      // (e.g. this is a second booking in the same visit), skip
      // straight to "done" instead of asking again.
      setShowAuthModal(true);
      return;
    }
    setStep("done");
  }

  function handleAuthContinue(newSession: Session) {
    // Bubble the new session up to App so it persists across future
    // bookings in this visit, then finish this booking immediately —
    // no need to make the person click "Confirm" a second time.
    onSessionCreated(newSession);
    setShowAuthModal(false);
    setStep("done");
  }

  const nights = startDate && endDate ? daysBetween(startDate, endDate) : 0;
  const totalLabel = describeTotal(item, nights);

  return (
    <div className="page">
      <button type="button" className="btn btn-ghost detail__back" onClick={onBack}>
        ← Back to {item.title}
      </button>

      <div className="booking">
        {/* Static step indicator — purely visual feedback, doesn't drive
            any logic itself (the `step` state variable does that). */}
        <div className="booking__steps">
          <span className={`booking__step${step === "dates" ? " booking__step--active" : ""}`}>
            1. Dates
          </span>
          <span className={`booking__step${step === "review" ? " booking__step--active" : ""}`}>
            2. Review
          </span>
          <span className={`booking__step${step === "done" ? " booking__step--active" : ""}`}>
            3. Confirmed
          </span>
        </div>

        {step === "dates" && (
          <>
            <h1>When do you need it?</h1>
            <div className="field-group">
              <label htmlFor="start-date">Start date</label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="field-group">
              <label htmlFor="end-date">End date</label>
              <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            {dateError && <p className="field-error">{dateError}</p>}
            <div className="booking__actions">
              <button type="button" className="btn btn-primary" onClick={handleDatesSubmit}>
                Continue to review
              </button>
            </div>
          </>
        )}

        {step === "review" && (
          <>
            <h1>Review your booking</h1>
            <div className="summary-card">
              <div className="summary-row">
                <span>Item</span>
                <span>{item.title}</span>
              </div>
              <div className="summary-row">
                <span>Dates</span>
                <span>{formatDateRange(startDate, endDate)}</span>
              </div>
              <div className="summary-row">
                <span>Duration</span>
                <span>
                  {nights} {nights === 1 ? "day" : "days"}
                </span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>{totalLabel}</span>
              </div>
            </div>

            <label className="checkbox-row">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>
                I'll return the item in the condition I received it, and agree to the owner's
                handover arrangement.
              </span>
            </label>

            <div className="booking__actions">
              <button type="button" className="btn btn-ghost" onClick={() => setStep("dates")}>
                Back
              </button>
              {/* disabled until the checkbox is ticked — prevents a
                  confirmed booking with an unacknowledged handover
                  agreement, not just a UX nicety. */}
              <button type="button" className="btn btn-primary" disabled={!agreed} onClick={handleConfirm}>
                Confirm booking
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <div className="confirmation">
            <div className="confirmation__stamp">Booked</div>
            <h1>You're set, {session?.name ?? "neighbour"}.</h1>
            <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>
              {item.title} · {formatDateRange(startDate, endDate)}. The owner will reach out at{" "}
              {session?.email} to arrange handover.
            </p>
            <button type="button" className="btn btn-primary" style={{ marginTop: 24 }} onClick={onDone}>
              Back to browsing
            </button>
          </div>
        )}
      </div>

      {showAuthModal && (
        <QuickContinueModal onContinue={handleAuthContinue} onCancel={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

/**
 * Calculates the booking total, respecting the item's pricing period.
 * The naive version of this function — amountCents * nights, always —
 * is wrong for anything not priced per day: it would overcharge an
 * hourly item and misprice a weekly item entirely. See DECISION-LOG.md
 * and AI-USAGE.md moment 3 for the full reasoning.
 */
function describeTotal(item: Item, nights: number): string {
  if (item.price === null) {
    return "Free";
  }
  if (nights === 0) {
    // No valid date range picked yet — show the base rate rather than a
    // misleading "R0" total.
    return formatPrice(item.price);
  }
  // Weekly items are billed per week (rounded up), not per day.
  const unitsForPeriod = item.price.period === "week" ? Math.ceil(nights / 7) : nights;
  // Hourly items are NOT multiplied by the number of days at all — the
  // date range only measures days, so an hourly price is shown as-is.
  const totalCents = item.price.amountCents * (item.price.period === "hour" ? 1 : unitsForPeriod);
  const rands = totalCents / 100;
  return `R${rands % 1 === 0 ? rands.toFixed(0) : rands.toFixed(2)}`;
}
