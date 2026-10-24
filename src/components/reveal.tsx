"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Entradas: cada seção marcada com data-reveal ganha .visivel ao entrar na tela;
// o CSS escalona os filhos e as palavras dos títulos (ver Titulo).
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.visivel)"));
    const show = (el: Element) => el.classList.add("visivel");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    // Rolagem rápida pode pular o observer: tudo que já passou do topo aparece.
    const fallback = () => {
      for (const s of sections) {
        if (s.getBoundingClientRect().top < window.innerHeight) show(s);
      }
    };
    window.addEventListener("scroll", fallback, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", fallback);
    };
  }, [pathname]);

  return null;
}
