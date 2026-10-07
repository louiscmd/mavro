"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Size } from "@/data/products";

export type BagItem = { slug: string; size: Size; quantity: number };

type BagContextValue = {
  items: BagItem[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: Size) => void;
  setQuantity: (slug: string, size: Size, quantity: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "mavro.bag.v1";
export const MAX_QUANTITY = 10;

function read(): BagItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: BagItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* private mode or storage full: the bag still works for this visit */
  }
}

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(read());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) write(items);
  }, [items, loaded]);

  const add = useCallback((slug: string, size: Size) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i,
        );
      }
      return [...prev, { slug, size, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((slug: string, size: Size, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) =>
            i.slug === slug && i.size === size ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY) } : i,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const value = useMemo<BagContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => {
        // Write through immediately: a child's effect can run before the initial load.
        write([]);
        setItems([]);
      },
    }),
    [items, isOpen, add, setQuantity, remove],
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}
