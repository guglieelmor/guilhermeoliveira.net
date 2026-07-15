"use client";

import { ArrowDown } from "lucide-react";

const LABEL = "TECH LEAD • FULL STACK • SRE • PROFESSOR • ";

export default function OrbitBadge({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Rolar para o conteúdo"
      className="group relative flex h-24 w-24 cursor-pointer items-center justify-center md:h-32 md:w-32"
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-muted-foreground"
        style={{ animation: "badge-spin 16s linear infinite" }}
        aria-hidden="true"
      >
        <defs>
          <path
            id="orbit-path"
            d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
          />
        </defs>
        <text
          fontSize="10.5"
          letterSpacing="2"
          fill="currentColor"
          className="font-display uppercase"
        >
          <textPath href="#orbit-path">{LABEL.repeat(2)}</textPath>
        </text>
      </svg>

      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500 text-white transition-transform group-hover:scale-110 md:h-14 md:w-14">
        <ArrowDown size={18} />
      </span>
    </button>
  );
}
