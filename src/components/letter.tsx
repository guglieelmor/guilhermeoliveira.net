"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DICTS, type Lang } from "@/lib/content";
import { SITE } from "@/lib/profile";

// A carta em letra grande: as palavras acendem conforme se rola, como quem lê junto.
export default function Letter({ lang }: { lang: Lang }) {
  const l = DICTS[lang].letter;
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(Infinity);

  // Cada parágrafo vira uma lista de palavras; o trecho marcado continua junto, dentro do <mark>.
  let count = 0;
  const paragraphs = l.paragraphs.map((p) =>
    p.map((seg) => {
      const words = (typeof seg === "string" ? seg : seg.mark).split(/(\s+)/);
      const items = words.map((w) => (w.trim() ? { w, n: count++ } : { w, n: -1 }));
      return { mark: typeof seg !== "string", items };
    }),
  );
  const total = count;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Começa quando o topo da carta passa de 85% da tela e termina com o fim dela em 60%.
      const p = (vh * 0.85 - r.top) / (r.height - vh * 0.25);
      setLit(Math.round(Math.max(0, Math.min(1, p)) * total));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  return (
    <section ref={ref} className="carta" aria-labelledby="carta-titulo">
      <h2 id="carta-titulo" className="oculto">
        {l.title}
      </h2>
      <div className="carta-coluna">
        {paragraphs.map((p, i) => (
          <p key={i}>
            {i === 0 && <Image className="carta-foto" src={SITE.avatar} alt={SITE.name} width={96} height={96} />}
            {p.map((seg, j) => {
              const words = seg.items.map((it, k) =>
                it.n < 0 ? (
                  it.w
                ) : (
                  <span key={k} className="palavra" data-acesa={it.n < lit ? "" : undefined}>
                    {it.w}
                  </span>
                ),
              );
              return seg.mark ? <mark key={j}>{words}</mark> : <span key={j}>{words}</span>;
            })}
          </p>
        ))}
        <p className="carta-assinatura" data-acesa={lit >= total ? "" : undefined}>
          <span>{l.sign}</span>
          <span className="nota">{l.role}</span>
        </p>
      </div>
    </section>
  );
}
