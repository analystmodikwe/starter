/* ============================================================
 * Header — brand + a quiet indicator of session state.
 * Deliberately does NOT show a "Sign in" button: signing in only
 * happens as a side effect of booking (see QuickContinueModal), so
 * there's no separate auth entry point to put here.
 * ============================================================ */

import type { Session } from "../state/types.ts";

interface HeaderProps {
  session: Session | null;
  onBrandClick: () => void;
}

export function Header({ session, onBrandClick }: HeaderProps) {
  return (
    <header className="app-header pegboard">
      <div className="app-header__row">
        {/* A <button> rather than a link, since there's no router/URL to
            navigate to — clicking it just resets App's screen state. */}
        <button className="brand" onClick={onBrandClick} aria-label="Go to home">
          <span className="brand__mark">Shed</span>Share
        </button>
        <div className="session-pill">
          {session ? (
            <>
              Signed in as <strong>{session.name}</strong>
            </>
          ) : (
            "Browsing as guest"
          )}
        </div>
      </div>
    </header>
  );
}
