"use client";

import { useEffect, useRef } from "react";
import { STACK } from "@/lib/profile";

// A stack corre numa faixa de acento; rolar a página acelera a faixa, e ela volta ao ritmo sozinha.
export default function Faixa() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = window.scrollY;
    let boost = 0;
    let frame = 0;
    const tick = () => {
      const y = window.scrollY;
      boost = Math.min(6, boost * 0.92 + Math.abs(y - last) * 0.04);
      last = y;
      for (const a of el.getAnimations({ subtree: true })) a.playbackRate = 1 + boost;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const row = (reverse: boolean) => (
    <div className="faixa-linha" data-reverso={reverse ? "" : undefined} aria-hidden="true">
      {[0, 1].map((copy) => (
        <span key={copy} className="faixa-trilho">
          {(reverse ? [...STACK].reverse() : STACK).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div className="faixa-stack" ref={ref}>
      <p className="oculto">{STACK.join(", ")}</p>
      {row(false)}
      {row(true)}
    </div>
  );
}
