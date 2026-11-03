"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DICTS, type Lang } from "@/lib/content";
import { ALURA_COURSES, ALURA_EXERCISES, ALURA_PATHS, aluraYear, pathCourses } from "@/lib/alura";
import { CONTACT } from "@/lib/profile";

const FIRST = 2016;
const LAST = 2026;
const YEARS = Array.from({ length: LAST - FIRST + 1 }, (_, i) => FIRST + i);
const LEVEL: Record<string, number> = { nativo: 100, native: 100, profissional: 72, "professional working": 72, básico: 30, elementary: 30 };

type Item = { key: string; name: string; meta: string };
type Block = Item & { year: number; hours: number };

const sum = (cs: typeof ALURA_COURSES) => cs.reduce((n, c) => n + c.hours, 0);

// Um bloco por formação (as que têm os mesmos cursos viram uma só, como Vue.js e Vue.js 2),
// um bloco por ano com os cursos avulsos e um bloco para cada curso de outra plataforma.
function blocks(t: (typeof DICTS)[Lang]): Block[] {
  const out: Block[] = [];
  const groups = new Map<string, { names: string[]; courses: typeof ALURA_COURSES }>();
  for (const p of ALURA_PATHS) {
    const courses = pathCourses(p.id);
    const key = courses.map((c) => c.slug).join(",");
    const g = groups.get(key);
    if (g) g.names.push(p.name);
    else groups.set(key, { names: [p.name], courses });
  }
  for (const [key, g] of groups) {
    const year = Math.max(...g.courses.map(aluraYear));
    const hours = sum(g.courses);
    out.push({
      key: `p-${key}`,
      name: t.cv.pathLabel(g.names.join(" + ")),
      meta: `${year} · ${t.cv.courseCount(g.courses.length, hours)}`,
      year,
      hours,
    });
  }
  const loose = ALURA_COURSES.filter((c) => c.paths.length === 0);
  for (const year of new Set(loose.map(aluraYear))) {
    const cs = loose.filter((c) => aluraYear(c) === year);
    const hours = sum(cs);
    out.push({ key: `l-${year}`, name: t.list.loose(cs.length), meta: `${year} · ${hours}h`, year, hours });
  }
  for (const c of t.cv.otherCourses) {
    out.push({ key: `o-${c.name}`, name: c.name, meta: String(c.year), year: c.year, hours: 0 });
  }
  return out;
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

  const courses = blocks(t);
  const total = sum(ALURA_COURSES);
  const firstCourse = Math.min(...courses.map((c) => c.year));
  const count = useCount(total, seen);

  const latest = courses.reduce((a, b) => (b.year >= a.year && b.hours ? b : a));
  const [active, setActive] = useState<Item>({ key: latest.key, name: latest.name, meta: latest.meta });

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
        <div className="estudo-resumo">
          <p className="estudo-total">
            <span className="estudo-numero">{count}</span>
            <span>{s.hours(firstCourse)}</span>
          </p>
          <a className="estudo-alura" href={CONTACT.alura} target="_blank" rel="noopener noreferrer">
            {s.alura(ALURA_COURSES.length, ALURA_PATHS.length, ALURA_EXERCISES)}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </div>

      <div className="grafico" data-ui ref={chart}>
        <div className="grafico-area" style={{ "--anos": YEARS.length } as React.CSSProperties}>
          <div className="grafico-cursos" aria-label={s.groups.courses} role="group">
            {YEARS.map((year) => (
              <div key={year} className="grafico-coluna">
                {courses
                  .filter((c) => c.year === year)
                  .map((c, i) => {
                    const item = { key: c.key, name: c.name, meta: c.meta };
                    return (
                      <button
                        key={c.key}
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
