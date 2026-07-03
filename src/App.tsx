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

      {screen.name === "detail" &&
        // IIFE so we can do the item lookup + early return *before*
        // deciding what to render, without needing a separate component
        // just to hold a local variable.
        (() => {
          // TypeScript knows `screen.itemId` exists here because this
          // whole block is inside the `screen.name === "detail"` check —
          // that's the payoff of the Screen union from state/types.ts.
          const item = itemsState.status === "ready" ? itemsState.items.find((i) => i.id === screen.itemId) : undefined;
          if (!item) {
            // Covers two real cases: items haven't finished loading yet,
            // or screen.itemId points at something that doesn't exist.
            // Either way, better to bounce home than crash on item.title.
            return <MissingItemFallback onBack={goHome} />;
          }
          return (
            <ItemDetailScreen
              item={item}
              onBack={goHome}
              onBookNow={(itemId) => setScreen({ name: "booking", itemId })}
            />
          );
        })()}

        
      {screen.name === "booking" &&
        (() => {
          const item = itemsState.status === "ready" ? itemsState.items.find((i) => i.id === screen.itemId) : undefined;
          if (!item) {
            return <MissingItemFallback onBack={goHome} />;
          }
          return (
            <BookingScreen
              item={item}
              session={session}
              // Lifted up to App so the session survives navigating back
              // to browse and into a second booking, instead of resetting
              // every time BookingScreen unmounts.
              onSessionCreated={setSession}
              onBack={() => setScreen({ name: "detail", itemId: item.id })}
              onDone={goHome}
            />
          );
        })()}