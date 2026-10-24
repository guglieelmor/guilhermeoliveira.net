"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DICTS, type Lang } from "@/lib/content";
import { SITE } from "@/lib/profile";

type Align = "left" | "center" | "right";
type Paint = "tinta" | "destaque" | "contorno";

type Type = {
  weight: number;
  spacing: number;
  size: number;
  leading: number;
  slant: number;
  align: Align;
  paint: Paint;
  caps: boolean;
  wave: boolean;
};

const START: Type = {
  weight: 500,
  spacing: -4,
  size: 100,
  leading: 100,
  slant: 0,
  align: "center",
  paint: "tinta",
  caps: false,
  wave: true,
};

function pick<T>(list: readonly T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function between(min: number, max: number, step: number) {
  return min + Math.round((Math.random() * (max - min)) / step) * step;
}

// Cada letra vira um span para a onda passar por ela; o h1 continua lendo a frase inteira.
function Letters({ text, on }: { text: string; on: boolean }) {
  if (!on) return <>{text}</>;
  return (
    <>
      {Array.from(text).map((c, i) => (
        <span key={i} className="letra" style={{ "--i": i } as React.CSSProperties}>
          {c}
        </span>
      ))}
    </>
  );
}

// Os controles mexem no próprio título: os eixos da Geist variável, a caixa, a cor e o movimento.
export default function Hero({ lang }: { lang: Lang }) {
  const t = DICTS[lang].hero;
  const [type, setType] = useState<Type>(START);
  const [copied, setCopied] = useState(false);
  // Na chegada, o título se ajusta sozinho do peso fino até o padrão, e os controles acompanham.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start - 300) / 1600);
      if (p >= 0) {
        const e = 1 - Math.pow(1 - p, 3);
        setType((s) => ({ ...s, weight: Math.round((100 + 400 * e) / 10) * 10, spacing: Math.round(6 - 10 * e) }));
      }
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const stop = () => cancelAnimationFrame(frame);
    window.addEventListener("pointerdown", stop, { once: true });
    window.addEventListener("keydown", stop, { once: true });
    return () => {
      stop();
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  const set = <K extends keyof Type>(key: K, value: Type[K]) => setType((s) => ({ ...s, [key]: value }));

  const style = {
    "--peso": type.weight,
    "--espaco": `${type.spacing / 100}em`,
    "--tamanho": type.size / 100,
    "--entrelinha": type.leading / 100,
    "--inclina": `${-type.slant}deg`,
  } as React.CSSProperties;

  const css = [
    "h1 {",
    `  font-weight: ${type.weight};`,
    `  letter-spacing: ${(type.spacing / 100).toFixed(2)}em;`,
    `  line-height: ${(type.leading / 100).toFixed(2)};`,
    `  font-size: ${type.size}%;`,
    type.slant ? `  transform: skewX(${-type.slant}deg);` : null,
    `  text-align: ${type.align};`,
    type.caps ? "  text-transform: uppercase;" : null,
    type.paint === "contorno" ? "  -webkit-text-stroke: 2px currentColor;\n  color: transparent;" : null,
    "}",
  ]
    .filter(Boolean)
    .join("\n");

  function shuffle() {
    setType({
      weight: between(100, 900, 10),
      spacing: between(-8, 6, 1),
      size: between(70, 100, 5),
      leading: between(85, 130, 5),
      slant: pick([0, 0, 4, 8, 12]),
      align: pick(["left", "center", "right"] as const),
      paint: pick(["tinta", "destaque", "contorno"] as const),
      caps: Math.random() < 0.4,
      wave: false,
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const range = (
    key: "weight" | "spacing" | "size" | "leading" | "slant",
    label: string,
    min: number,
    max: number,
    step: number,
    shown: string,
    extra: string,
  ) => (
    <label className={`chip ${extra}`} data-ui>
      <span className="chip-rotulo">{label}</span>
      <output className="chip-valor">{shown}</output>
      <input type="range" min={min} max={max} step={step} value={type[key]} onChange={(e) => set(key, Number(e.target.value))} />
    </label>
  );

  const toggle = (key: "caps" | "wave", label: string, extra: string) => (
    <button
      type="button"
      className={`chip chip-interruptor ${extra}`}
      data-ui
      role="switch"
      aria-checked={type[key]}
      onClick={() => set(key, !type[key])}
    >
      <span className="chip-rotulo">{label}</span>
      <span className="chip-valor">{type[key] ? t.on : t.off}</span>
      <span className="interruptor" aria-hidden="true" />
    </button>
  );

  const segmented = <K extends "align" | "paint">(key: K, label: string, options: [Type[K], string][], extra: string) => (
    <div className={`chip chip-segmentos ${extra}`} data-ui role="group" aria-label={label}>
      <span className="chip-rotulo">{label}</span>
      <span className="segmentos">
        {options.map(([value, name]) => (
          <button key={value} type="button" aria-pressed={type[key] === value} onClick={() => set(key, value)}>
            {name}
          </button>
        ))}
      </span>
    </div>
  );

  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero-palco">
        <div className="hero-cima">
          {range("weight", t.weight, 100, 900, 10, String(type.weight), "chip-a")}
          {range("size", t.size, 60, 100, 5, `${type.size}%`, "chip-b")}
          {range("slant", t.slant, 0, 14, 1, `${type.slant}°`, "chip-c")}
          {range("leading", t.leading, 85, 130, 5, (type.leading / 100).toFixed(2), "chip-d")}
        </div>

        <h1
          id="hero-titulo"
          className="hero-titulo"
          style={style}
          data-caixa={type.caps ? "alta" : undefined}
          data-alinha={type.align}
          data-pinta={type.paint}
          data-onda={type.wave ? "" : undefined}
          aria-label={type.wave ? t.lines.join(" ") : undefined}
        >
          <span className="linha">
            <span>
              <Letters text={t.lines[0]} on={type.wave} />
            </span>
          </span>{" "}
          <span className="linha">
            <span>
              <Letters text={t.lines[1]} on={type.wave} />
            </span>
          </span>
        </h1>

        <div className="hero-baixo">
          <div className="hero-lado">
            {range("spacing", t.spacing, -8, 6, 1, `${(type.spacing / 100).toFixed(2)}em`, "chip-e")}
            {segmented(
              "align",
              t.align,
              [
                ["left", t.alignLeft],
                ["center", t.alignCenter],
                ["right", t.alignRight],
              ],
              "chip-f",
            )}
          </div>

          <div className="hero-centro">
            <p className="hero-sub">
              <Image className="hero-foto" src={SITE.avatar} alt="" width={64} height={64} priority />
              {t.sub}
            </p>
            <div className="hero-acoes">
              <button type="button" className="hero-acao" onClick={shuffle}>
                {t.shuffle}
              </button>
              <button type="button" className="hero-acao" onClick={copy}>
                {copied ? t.copied : t.copy}
              </button>
              <button type="button" className="hero-acao" onClick={() => setType(START)}>
                {t.reset}
              </button>
            </div>
          </div>

          <div className="hero-lado hero-lado-direito">
            {toggle("caps", t.caps, "chip-g")}
            {toggle("wave", t.wave, "chip-h")}
            {segmented(
              "paint",
              t.paint,
              [
                ["tinta", t.paintInk],
                ["destaque", t.paintAccent],
                ["contorno", t.paintOutline],
              ],
              "chip-i",
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
