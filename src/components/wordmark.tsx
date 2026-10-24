"use client";

import { useRef } from "react";

// Cada letra ganha peso conforme a distância do cursor; sem cursor (toque, sem JS), fica no peso de repouso.
export default function Wordmark({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    for (const el of ref.current?.children ?? []) {
      const r = el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      const w = 900 - Math.min(d, 420) / 420 * 700;
      (el as HTMLElement).style.fontWeight = String(Math.round(w));
    }
  }

  function leave() {
    for (const el of ref.current?.children ?? []) (el as HTMLElement).style.fontWeight = "";
  }

  return (
    <p className="rodape-marca" ref={ref} onPointerMove={move} onPointerLeave={leave} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>
          {c}
        </span>
      ))}
    </p>
  );
}
