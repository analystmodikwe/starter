import { useEffect, useState } from "react";
import type { Item } from "../data/types.ts";
import { fetchItems } from "../data/items.ts";

export type ItemsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: Item[] };

/**
 * Loads items via the mock async loader in data/items.ts.
 * Modelled as a small state machine (loading/error/ready) rather than
 * separate booleans, so a screen can never render two states at once.
 */
export function useItems(): ItemsState {
  const [state, setState] = useState<ItemsState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    fetchItems()
      .then((items) => {
        if (!cancelled) {
          setState({ status: "ready", items });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "error", message: "Couldn't load items. Try refreshing." });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
