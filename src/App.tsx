/* ============================================================
 * This is a near-empty shell ON PURPOSE.
 *
 * We are not giving you a component structure, a router, a state
 * pattern, or a design. Those are the decisions being assessed —
 * designing them is your job, and defending them in your Decision
 * Log is the point.
 *
 * Delete this placeholder. Build the product described in BRIEF.md.
 * Type your data using src/data/types.ts. Load it via
 * src/data/items.ts (or reshape that — your call).
 * ============================================================ */

import { useState } from "react";
import { useItems } from "./hooks/useItems.ts";
import { Header } from "./components/Header.tsx";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { ItemDetailScreen } from "./screens/ItemDetailScreen.tsx";
import { BookingScreen } from "./screens/BookingScreen.tsx";
import type { Screen, Session } from "./state/types.ts";