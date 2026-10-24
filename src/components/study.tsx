"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DICTS, type Lang } from "@/lib/content";

const FIRST = 2016;
const LAST = 2026;
const YEARS = Array.from({ length: LAST - FIRST + 1 }, (_, i) => FIRST + i);
const LEVEL: Record<string, number> = { nativo: 100, native: 100, profissional: 72, "professional working": 72, básico: 30, elementary: 30 };

type Item = { key: string; name: string; meta: string };

function parseCourse(c: string) {
  // "Formação SEO · 2024 (36h)" vira { name: "Formação SEO", year: 2024, hours: 36 }.
  const [name, rest = ""] = c.split(" · ");
  const m = rest.match(/(\d{4})(?:\s*\((\d+)h\))?/);
  return { name, year: m ? Number(m[1]) : LAST, hours: m?.[2] ? Number(m[2]) : 0 };
}

// Contador que sobe do zero quando a seção aparece.
function useCount(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);
  return n;
}

// Formação como um gráfico de anos: cursos empilhados pelas horas, graduações como faixas.
export default function Study({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  const cv = t.cv;
  const s = t.list;
  const ref = useRef<HTMLElement>(null);
  const chart = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  const courses = cv.courses.map(parseCourse);
  const total = courses.reduce((sum, c) => sum + c.hours, 0);
  const firstCourse = Math.min(...courses.map((c) => c.year));
  const count = useCount(total, seen);

  const latest = courses.reduce((a, b) => (b.year >= a.year && b.hours ? b : a));
  const [active, setActive] = useState<Item>({
    key: `c-${latest.name}`,
    name: latest.name,
    meta: `${latest.year} · ${latest.hours}h`,
  });

  // No celular o gráfico rola de lado; ele abre nos anos mais recentes.
  useEffect(() => {
    const el = chart.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pick = (item: Item) => ({
    onMouseEnter: () => setActive(item),
    onFocus: () => setActive(item),
    onClick: () => setActive(item),
    "aria-pressed": active.key === item.key,
  });

  return (
    <section id="formacao" ref={ref} className="estudo" data-visto={seen ? "" : undefined} aria-labelledby="estudo-titulo">
      <div className="estudo-topo">
        <h2 id="estudo-titulo" className="titulo">
          {s.title}
        </h2>
        <p className="estudo-total">
          <span className="estudo-numero">{count}</span>
          <span>{s.hours(firstCourse)}</span>
        </p>
      </div>

      <div className="grafico" data-ui ref={chart}>
        <div className="grafico-area" style={{ "--anos": YEARS.length } as React.CSSProperties}>
          <div className="grafico-cursos" aria-label={s.groups.courses} role="group">
            {YEARS.map((year) => (
              <div key={year} className="grafico-coluna">
                {courses
                  .filter((c) => c.year === year)
                  .map((c, i) => {
                    const item = { key: `c-${c.name}`, name: c.name, meta: c.hours ? `${year} · ${c.hours}h` : `${year}` };
                    return (
                      <button
                        key={c.name}
                        type="button"
                        className="curso"
                        style={{ "--h": c.hours || 18, "--d": (year - FIRST) * 60 + i * 90 } as React.CSSProperties}
                        aria-label={`${c.name}, ${item.meta}`}
                        {...pick(item)}
                      />
                    );
                  })}
              </div>
            ))}
          </div>

          <div className="grafico-faixas" aria-label={s.groups.study} role="group">
            {cv.education.map((e, i) => {
              const end = e.end ? e.end.getFullYear() : LAST;
              const item = {
                key: `e-${e.id}`,
                name: e.degree,
                meta: `${e.school.split(" · ")[0]} · ${e.start.getFullYear()}–${e.end ? end : cv.now}`,
              };
              return (
                <button
                  key={e.id}
                  type="button"
                  className="trecho"
                  style={
                    {
                      gridColumn: `${e.start.getFullYear() - FIRST + 1} / ${end - FIRST + 2}`,
                      "--d": i * 140,
                    } as React.CSSProperties
                  }
                  aria-label={`${e.degree}, ${item.meta}`}
                  {...pick(item)}
                >
                  <Image src={e.image} alt="" width={20} height={20} />
                  <span>{e.school.split(" · ")[0]}</span>
                </button>
              );
            })}
          </div>

          <ol className="grafico-anos" aria-hidden="true">
            {YEARS.map((y) => (
              <li key={y}>{y}</li>
            ))}
          </ol>
        </div>

        <p className="grafico-detalhe" aria-live="polite">
          <strong key={active.key}>{active.name}</strong>
          <span>{active.meta}</span>
        </p>
      </div>

      <div className="estudo-lados">
        <div>
          <h3 className="grupo">{s.groups.certs}</h3>
          <ul className="selos">
            {cv.certifications.map((c, i) => (
              <li key={c} style={{ "--d": i * 70 } as React.CSSProperties}>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="grupo">{s.groups.langs}</h3>
          <ul className="idiomas">
            {cv.languages.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <span className="nota">{l.level}</span>
                <span className="medidor" aria-hidden="true">
                  <span style={{ "--v": LEVEL[l.level] ?? 50 } as React.CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
