"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Also ease the image inside from a slight zoom. */
  image?: boolean;
  /** Stagger in ms. */
  delay?: number;
  as?: "div" | "li" | "section";
};

/** Slow fade-up when the element first scrolls into view. */
export function Reveal({ children, className = "", image = false, delay = 0, as = "div" }: Props) {
  const Tag = as as "div"; // every variant is a plain block element
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${image ? "reveal-image" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
