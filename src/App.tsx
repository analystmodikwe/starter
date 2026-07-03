// 
//  * App — the root component.
//  *
//  * Owns the two pieces of state that need to survive screen changes:
//  *  - `screen`: which "page" is showing (see state/types.ts for why this
//  *    is a hand-rolled union instead of a router — DECISION-LOG.md).
//  *  - `session`: the mock, in-memory logged-in user, created only once
//  *    someone reaches the booking flow (see QuickContinueModal.tsx).
//  *
//  * `useItems()` is called once, here, so both ItemDetailScreen and
//  * BookingScreen can look up the same in-memory item list by id without
//  * each screen re-fetching independently.
//   */

import { useState } from "react";
import { useItems } from "./hooks/useItems.ts";
import { Header } from "./components/Header.tsx";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { ItemDetailScreen } from "./screens/ItemDetailScreen.tsx";
import { BookingScreen } from "./screens/BookingScreen.tsx";
import type { Screen, Session } from "./state/types.ts";

export function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [session, setSession] = useState<Session | null>(null);
  const itemsState = useItems();

  function goHome() {
    setScreen({ name: "home" });
  }

  return (
    <>
      <Header session={session} onBrandClick={goHome} />

      {screen.name === "home" && (
        // onSelectItem hands back the clicked item's id; we build the
        // next Screen value here so HomeScreen doesn't need to know
        // anything about navigation, only "an item was picked".
        <HomeScreen onSelectItem={(itemId) => setScreen({ name: "detail", itemId })} />
      )}