import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  packLabel: string;
  kg: number;
  unitPrice: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, packLabel: string) => void;
  setQty: (slug: string, packLabel: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "grainery-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
    return {
      items,
      count,
      subtotal,
      add: (item, qty = 1) => {
        setItems((prev) => {
          const idx = prev.findIndex(
            (p) => p.slug === item.slug && p.packLabel === item.packLabel,
          );
          if (idx > -1) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...prev, { ...item, qty }];
        });
      },
      remove: (slug, packLabel) =>
        setItems((prev) => prev.filter((p) => !(p.slug === slug && p.packLabel === packLabel))),
      setQty: (slug, packLabel, qty) =>
        setItems((prev) =>
          prev
            .map((p) =>
              p.slug === slug && p.packLabel === packLabel ? { ...p, qty: Math.max(1, qty) } : p,
            )
            .filter((p) => p.qty > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
