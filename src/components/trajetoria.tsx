"use client";

import { useEffect, useRef, useState } from "react";
import { DICTS, formatPeriod, type Lang } from "@/lib/content";

type Commit = {
  id: string;
  name: string;
  detail: string;
  hash: string;
  date: string;
  subject: string;
  body: string;
  stack: string[];
  big: string;
  branch: boolean;
};

// Hash curto e estável a partir do id, só para o painel parecer um git log de verdade.
function shortHash(id: string) {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function commits(lang: Lang): Commit[] {
  const t = DICTS[lang];
  const roles = t.cv.experience.map((e) => ({
    id: e.id,
    name: e.role,
    detail: `${e.company.split(" · ")[0]} · ${e.start.getFullYear()}–${e.end ? e.end.getFullYear() : t.cv.now}`,
    hash: shortHash(e.id),
    date: formatPeriod(t, e.start, e.end),
    subject: `${e.role} · ${e.company.split(" · ")[0]}`,
    body: e.description,
    stack: e.tags,
    big: String(e.start.getFullYear()),
    branch: false,
  }));
  const projects = t.cv.projects.map((p) => ({
    id: p.id,
    name: p.name,
    detail: p.role,
    hash: shortHash(p.id),
    date: p.tag,
    subject: p.name,
    body: p.description,
    stack: [],
    big: p.name,
    branch: true,
  }));
  return [...roles, ...projects];
}

export default function Trajetoria({ lang }: { lang: Lang }) {
  const t = DICTS[lang].work;
  const list = commits(lang);
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  // Cada commit ganha um trecho de rolagem; o painel fixo mostra o que está no meio da tela.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  function go(i: number) {
    setActive(i);
    steps.current[i]?.scrollIntoView({ block: "center" });
  }

  return (
    <section
      id="trajetoria"
      className="trajetoria"
      aria-labelledby="trajetoria-titulo"
      style={{ "--n": list.length, "--p": active / (list.length - 1) } as React.CSSProperties}
    >
      <div className="trajetoria-palco">
        <div className="trajetoria-lado">
          <h2 id="trajetoria-titulo" className="titulo">
            {t.title}
          </h2>
          <ol className="indice">
            <li className="indice-trilho" aria-hidden="true" />
            {list.map((c, i) => (
              <li key={c.id} data-ramo={c.branch ? "" : undefined} data-passou={i < active ? "" : undefined}>
                <button type="button" onClick={() => go(i)} aria-current={i === active ? "step" : undefined}>
                  <span className="indice-nome">{c.name}</span>
                  <span className="indice-detalhe">{c.detail}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="trajetoria-campo">
          <p className="trajetoria-grande" aria-hidden="true" key={list[active].id}>
            {list[active].big}
          </p>
          {list.map((c, i) => (
            <article key={c.id} className="commit" data-ui data-active={i === active ? "" : undefined} aria-hidden={i !== active}>
              <pre>
                <code>
                  <span className="commit-hash">commit {c.hash}</span>
                  {i === 0 ? <span className="commit-ref"> (HEAD -&gt; main)</span> : null}
                  {"\n"}
                  {t.authorLine}
                  {"\n"}
                  {t.dateLabel}   {c.date}
                  {"\n\n"}
                  <span className="commit-assunto">    {c.subject}</span>
                  {"\n\n"}
                </code>
              </pre>
              <p className="commit-corpo">{c.body}</p>
              {c.stack.length > 0 && (
                <pre className="commit-stack">
                  <code>
                    {t.stackLabel} |{" "}
                    {c.stack.map((s, k) => (
                      <span key={s} className="commit-add" style={{ "--k": k } as React.CSSProperties}>
                        +{s}{" "}
                      </span>
                    ))}
                  </code>
                </pre>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="trajetoria-passos" aria-hidden="true">
        {list.map((c, i) => (
          <div
            key={c.id}
            data-step={i}
            ref={(el) => {
              steps.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
