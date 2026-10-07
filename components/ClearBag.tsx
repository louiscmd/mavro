"use client";

import { useEffect } from "react";
import { useBag } from "./BagProvider";

/** Empties the bag once, after a successful payment. */
export function ClearBag() {
  const { clear } = useBag();
  useEffect(() => clear(), []);
  return null;
}
