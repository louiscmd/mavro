"use client";

import { useEffect, useRef } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Moves its content at a fraction of the scroll speed (positive = slower than
 * the page, i.e. sinks; negative = rises). Optionally fades out as it scrolls away.
 */
export function Parallax({
  children,
  speed = 0.1,
  fade = false,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.5) return; // off screen, nothing to do
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
      // Fade only on wide screens: on phones the text sits below the fold and would dim as it arrives.
      if (fade && wide.matches) el.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.7)));
      else el.style.opacity = "";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, fade]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/**
 * Text whose letters or words rise out of a mask one after another.
 * Screen readers get the plain text once.
 */
export function Rise({
  text,
  by = "word",
  base = 0,
  step = 70,
}: {
  text: string;
  by?: "letter" | "word";
  base?: number;
  step?: number;
}) {
  const parts = by === "letter" ? [...text] : text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden style={{ "--base": `${base}ms`, "--step": `${step}ms` } as React.CSSProperties}>
        {parts.map((part, i) => (
          <span key={i}>
            <span className="rise">
              <span style={{ "--i": i } as React.CSSProperties}>{part}</span>
            </span>
            {by === "word" && i < parts.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
