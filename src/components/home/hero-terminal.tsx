"use client";

import { useEffect, useRef, useState } from "react";

type Line =
  | { type: "command"; text: string }
  | { type: "output"; text: string }
  | { type: "blank" };

const TYPE_SPEED_MS = 32;
const PAUSE_AFTER_COMMAND_MS = 280;
const PAUSE_AFTER_OUTPUT_MS = 420;
const PAUSE_AFTER_BLANK_MS = 80;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function HeroTerminal({
  host,
  yearsOfExperience,
  stackLines,
}: {
  host: string;
  yearsOfExperience: number;
  stackLines: [string, string];
}) {
  const script: Line[] = [
    { type: "command", text: "whoami" },
    { type: "output", text: "Tech Lead · SRE · Full Stack" },
    { type: "blank" },
    { type: "command", text: "uptime --experiencia" },
    { type: "output", text: `${yearsOfExperience}+ anos em produção` },
    { type: "blank" },
    { type: "command", text: "stack --list" },
    { type: "output", text: stackLines[0] },
    { type: "output", text: stackLines[1] },
  ];

  const [completed, setCompleted] = useState<Line[]>([]);
  const [typingText, setTypingText] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCompleted(script);
      return;
    }

    let cancelled = false;

    async function run() {
      for (const block of script) {
        if (cancelled) return;
        if (block.type === "command") {
          for (let c = 1; c <= block.text.length; c++) {
            if (cancelled) return;
            setTypingText(block.text.slice(0, c));
            await sleep(TYPE_SPEED_MS);
          }
          if (cancelled) return;
          setCompleted((prev) => [...prev, block]);
          setTypingText(null);
          await sleep(PAUSE_AFTER_COMMAND_MS);
        } else {
          setCompleted((prev) => [...prev, block]);
          await sleep(
            block.type === "blank"
              ? PAUSE_AFTER_BLANK_MS
              : PAUSE_AFTER_OUTPUT_MS,
          );
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTyping = typingText !== null;

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">
          {host}
        </span>
      </div>

      <div className="min-h-[15rem] px-5 py-5 font-mono text-[13px] leading-relaxed">
        {completed.map((line, i) => (
          <div key={i}>
            {line.type === "command" && (
              <p className="text-zinc-100">
                <span className="text-blue-400">$</span> {line.text}
              </p>
            )}
            {line.type === "output" && (
              <p className="text-zinc-400">{line.text}</p>
            )}
            {line.type === "blank" && <div className="h-4" />}
          </div>
        ))}

        {isTyping && (
          <p className="text-zinc-100">
            <span className="text-blue-400">$</span> {typingText}
            <span className="ml-px inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-zinc-200" />
          </p>
        )}

        {!isTyping && completed.length === script.length && (
          <p className="text-zinc-100">
            <span className="text-blue-400">$</span>{" "}
            <span className="ml-px inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-zinc-200" />
          </p>
        )}
      </div>
    </div>
  );
}
