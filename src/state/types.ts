import type { ItemId } from "../data/types.ts";

/**
 * Single-page app, no backend and no deep-linking requirement in the brief,
 * so a discriminated-union screen state (kept in App) replaces a router.
 * See DECISION-LOG.md for why this was chosen over react-router.
 */
export type Screen =
  | { name: "home" }
  | { name: "detail"; itemId: ItemId }
  | { name: "booking"; itemId: ItemId };

/**
 * Mock, in-memory-only "session". Deliberately NOT persisted (no real
 * backend exists to own this data) and deliberately NOT required to browse —
 * see the forced-signup decision in FOUNDER-RESPONSE.md.
 */
export interface Session {
  name: string;
  email: string;
}
