"use client";

import { useState } from "react";
import { DICTS, type Lang } from "@/lib/content";

// Perguntas em letra grande; a aberta vira uma faixa de destaque com a resposta ao lado.
export default function Faq({ lang }: { lang: Lang }) {
  const t = DICTS[lang].faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="perguntas" className="faq" aria-labelledby="faq-titulo">
      <div className="faq-topo">
        <h2 id="faq-titulo" className="titulo">
          {t.title}
        </h2>
        <p className="faq-conta">{t.count(t.items.length)}</p>
      </div>
      <ul className="faq-lista">
        {t.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} data-aberta={isOpen ? "" : undefined}>
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-r-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="faq-pergunta">{item.q}</span>
                  <span className="faq-sinal" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-resposta" id={`faq-r-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div>
                  <p>{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
