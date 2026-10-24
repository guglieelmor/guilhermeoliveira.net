"use client";

import { useEffect } from "react";

const S = 64;
const AMARELO = "#cdbf22";
const TINTA = "#0a0a0a";

// Favicon vivo: a carinha pisca, olha para o cursor, se assusta no clique e dorme com a aba em segundo plano.
// Desenha num canvas e troca o href de um <link rel="icon"> próprio; o icon.svg estático segue como fallback.
export default function Favicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = S;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);

    let olhar = { x: 0, y: 0 };
    let alvo = { x: 0, y: 0 };
    let piscaEm = performance.now() + 2500;
    let susto = 0;
    let ultimo = "";

    // A aba fica no canto superior esquerdo: o olhar aponta do topo da janela para o cursor.
    function mover(e: PointerEvent) {
      const dx = e.clientX - window.innerWidth * 0.15;
      const dy = e.clientY + 60;
      const d = Math.hypot(dx, dy) || 1;
      alvo = { x: (dx / d) * 4, y: (dy / d) * 3 };
    }
    function clicar() {
      susto = performance.now() + 600;
    }

    function desenhar(agora: number) {
      const dormindo = document.hidden;
      ctx!.clearRect(0, 0, S, S);
      ctx!.fillStyle = AMARELO;
      ctx!.beginPath();
      ctx!.roundRect(0, 0, S, S, 14);
      ctx!.fill();
      ctx!.fillStyle = TINTA;
      ctx!.strokeStyle = TINTA;
      ctx!.lineCap = "round";
      ctx!.lineWidth = 5;

      if (dormindo) {
        for (const x of [22, 42]) {
          ctx!.beginPath();
          ctx!.arc(x, 26, 6, 0.15 * Math.PI, 0.85 * Math.PI);
          ctx!.stroke();
        }
        ctx!.beginPath();
        ctx!.ellipse(32, 46, 4, 3, 0, 0, Math.PI * 2);
        ctx!.fill();
        // "z" sobe e volta a cada 2s; com a aba escondida o timer cai para ~1 quadro por segundo.
        const t = (agora / 2000) % 1;
        ctx!.font = "bold 20px system-ui, sans-serif";
        ctx!.globalAlpha = 1 - t;
        ctx!.fillText("z", 46 + t * 6, 18 - t * 10);
        ctx!.globalAlpha = 1;
      } else {
        olhar = { x: olhar.x + (alvo.x - olhar.x) * 0.3, y: olhar.y + (alvo.y - olhar.y) * 0.3 };
        const assustado = agora < susto;
        if (agora > piscaEm + 140) piscaEm = agora + 2200 + Math.random() * 3000;
        const fechado = agora > piscaEm;
        const ry = fechado ? 1.5 : assustado ? 11 : 9;
        for (const x of [22, 42]) {
          ctx!.beginPath();
          ctx!.ellipse(x + olhar.x, 27 + olhar.y, assustado ? 7 : 6, ry, 0, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.beginPath();
        if (assustado) ctx!.ellipse(32, 47, 5, 6, 0, 0, Math.PI * 2);
        else {
          ctx!.moveTo(22, 44);
          ctx!.quadraticCurveTo(32, 52, 42, 44);
        }
        if (assustado) ctx!.fill();
        else ctx!.stroke();
      }

      // Só troca o href quando o quadro muda, para não martelar o navegador.
      const url = canvas.toDataURL("image/png");
      if (url !== ultimo) link.href = ultimo = url;
    }

    const id = window.setInterval(() => desenhar(performance.now()), 100);
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerdown", clicar);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerdown", clicar);
      link.remove();
    };
  }, []);

  return null;
}
