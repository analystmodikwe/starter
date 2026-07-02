import { useState, type FormEvent } from "react";
import type { Session } from "../state/types.ts";

interface QuickContinueModalProps {
  onContinue: (session: Session) => void;
  onCancel: () => void;
}

/**
 * Thabo asked for a forced sign-up wall before anyone can see anything.
 * That's a dark pattern (blocking real value to farm emails) — refused,
 * see FOUNDER-RESPONSE.md. This is the reshape: a name + email is asked
 * for only at the moment it's actually needed (confirming a booking),
 * and the reason ("so the owner can reach you") is stated honestly.
 */
export function QuickContinueModal({ onContinue, onCancel }: QuickContinueModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const nameError = touched && name.trim().length === 0 ? "Enter your name." : null;
  const emailError = touched && !isValidEmail(email) ? "Enter a valid email." : null;
  const canSubmit = name.trim().length > 0 && isValidEmail(email);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Errors only appear after a submit attempt, not while someone is
    // still typing their first letter — `touched` gates that. Without
    // it, nameError would flash red the instant the modal opens.
    setTouched(true);
    if (!canSubmit) {
      return;
    }
    onContinue({ name: name.trim(), email: email.trim() });
  }

  return (
    // role="dialog" + aria-modal + aria-labelledby is what makes a
    // screen reader announce "dialog: Quick details to book" instead of
    // just dumping form fields with no context.
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="quick-continue-title">
      <div className="modal">
        <h2 className="modal__title" id="quick-continue-title">
          Quick details to book
        </h2>
        <p className="modal__sub">
          We only ask for this at booking time, not before you browse. The owner uses it to confirm
          the handover with you.
        </p>
        {/* noValidate turns off the browser's built-in validation UI so
            our own error messages (styled, consistent with the rest of
            the app) show instead of the browser's default popup. */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="qc-name">Your name</label>
            <input
              id="qc-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            {nameError && <p className="field-error">{nameError}</p>}
          </div>
          <div className="field-group">
            <label htmlFor="qc-email">Email</label>
            <input
              id="qc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {emailError && <p className="field-error">{emailError}</p>}
          </div>
          <div className="modal__actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Deliberately loose email check — enough to catch obvious typos
 * ("no @ at all") without trying to fully validate RFC 5322 email
 * syntax, which is notoriously hard to get exactly right with a regex
 * and not worth the complexity for a mock booking flow with no real
 * backend to actually send mail through.
 */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
