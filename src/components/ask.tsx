"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DICTS, type Lang } from "@/lib/content";

// Nomes em português e inglês levam à mesma resposta.
const ALIASES: Record<string, string> = {
  help: "ajuda",
  "?": "ajuda",
  quem: "whoami",
  classes: "aulas",
  career: "trajetoria",
  "trajetória": "trajetoria",
  projects: "projetos",
  contact: "contato",
  cat: "gato",
  clear: "limpar",
};

const CAT = [" /\\_/\\", "( o.o )", " > ^ <"];
const KEEP = 6;

type Entry = { id: number; cmd: string; lines: string[] };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Um terminal que conversa sozinho: digita um comando, responde, passa ao próximo. Quem clica assume o teclado.
export default function Ask({ lang, latestPost }: { lang: Lang; latestPost: { title: string; href: string } | null }) {
  const dict = DICTS[lang];
  const t = dict.ask;
  const term = dict.terminal;
  const [log, setLog] = useState<Entry[]>([]);
  const [typing, setTyping] = useState("");
  const [auto, setAuto] = useState(true);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  const answer = useCallback(
    (raw: string): string[] => {
      const cmd = ALIASES[raw] ?? raw;
      switch (cmd) {
        case "":
        case "ajuda":
          return term.help;
        case "whoami":
          return term.whoami;
        case "stack":
          return term.stack;
        case "aulas":
          return term.aulas;
        case "trajetoria":
          return term.trajetoria;
        case "projetos":
          return term.projetos;
        case "blog":
          return latestPost ? [latestPost.title, `guilhermeoliveira.net${latestPost.href}`] : [dict.blog.none];
        case "contato":
          return term.contato;
        case "gato":
          return [...CAT, "", ...term.cat];
        default:
          return [term.unknown(raw)];
      }
    },
    [term, latestPost, dict.blog.none],
  );

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if ((ALIASES[cmd] ?? cmd) === "limpar") {
        setLog([]);
        return;
      }
      const id = nextId.current++;
      setLog((l) => [...l, { id, cmd, lines: answer(cmd) }].slice(-KEEP));
    },
    [answer],
  );

  // Só começa a conversar quando aparece na tela.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A demo: digita letra por letra, responde, espera e segue o roteiro em loop.
  useEffect(() => {
    if (!auto || !visible) return;
    let alive = true;
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (async () => {
      let i = 0;
      while (alive) {
        const cmd = t.script[i % t.script.length];
        for (let k = 1; k <= cmd.length && alive; k++) {
          setTyping(cmd.slice(0, k));
          await sleep(instant ? 0 : 70 + Math.random() * 60);
        }
        await sleep(instant ? 0 : 380);
        if (!alive) break;
        setTyping("");
        run(cmd);
        await sleep(instant ? 4000 : 2600);
        i++;
      }
    })();
    return () => {
      alive = false;
      setTyping("");
    };
  }, [auto, visible, t.script, run]);

  // A tela rola sozinha até a última resposta, sem mexer na rolagem da página.
  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [log, typing]);

  function takeOver() {
    setAuto(false);
    input.current?.focus({ preventScroll: true });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setAuto(false);
    run(value);
    setValue("");
  }

  function suggest(cmd: string) {
    setAuto(false);
    run(cmd);
  }

  return (
    <section id="terminal" ref={section} className="pergunta" aria-labelledby="pergunta-titulo">
      <div className="pergunta-texto">
        <h2 id="pergunta-titulo" className="pergunta-titulo">
          {t.title}
        </h2>
        <p className="pergunta-lead">{t.lead}</p>
        <div className="exemplos">
          {t.examples.map((ex) => (
            <button key={ex} type="button" onClick={() => suggest(ex)}>
              {ex}
            </button>
          ))}
        </div>
        <p className="nota">{t.note}</p>
      </div>

      <div className="janela" data-ui onClick={takeOver}>
        <div className="janela-topo">
          <span>gulliver@guilhermeoliveira.net: ~</span>
          {auto ? (
            <button
              type="button"
              className="janela-estado"
              onClick={(e) => {
                e.stopPropagation();
                takeOver();
              }}
            >
              <span className="janela-ponto" aria-hidden="true" />
              {t.auto}
            </button>
          ) : (
            <button
              type="button"
              className="janela-estado"
              data-manual=""
              onClick={(e) => {
                e.stopPropagation();
                setAuto(true);
              }}
            >
              {t.resume}
            </button>
          )}
        </div>

        <div className="janela-tela" ref={screen} role="log" aria-live="polite">
          {log.map((entry) => (
            <div key={entry.id} className="troca">
              <p className="troca-cmd">
                <span aria-hidden="true">$ </span>
                {entry.cmd || " "}
              </p>
              <pre className="troca-resposta">
                <code>
                  {entry.lines.map((line, i) => (
                    <span key={i} style={{ "--i": i } as React.CSSProperties}>
                      {line || " "}
                      {"\n"}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          ))}
          {auto && typing && (
            <p className="troca-cmd troca-digitando" aria-hidden="true">
              <span>$ </span>
              {typing}
              <span className="cursor" />
            </p>
          )}
        </div>

        <form className="janela-entrada" onSubmit={submit}>
          <span aria-hidden="true">$</span>
          <input
            id="terminal-entrada"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setAuto(false)}
            placeholder={t.placeholder}
            aria-label={t.inputLabel}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="send"
          />
          <button type="submit">{t.send}</button>
        </form>
      </div>
    </section>
  );
}
