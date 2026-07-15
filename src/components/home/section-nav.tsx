"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "sobre-section", label: "Sobre" },
  { id: "experiencia-section", label: "Experiência" },
  { id: "competencias-section", label: "Competências" },
  { id: "projetos-section", label: "Projetos" },
  { id: "blog-section", label: "Blog" },
];

export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() =>
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="group flex items-center gap-3"
          aria-label={section.label}
        >
          <span
            className={cn(
              "text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100",
              active === section.id && "text-violet-500 dark:text-violet-400",
            )}
          >
            {section.label}
          </span>
          <span
            className={cn(
              "h-2 w-2 rounded-full border border-muted-foreground/40 transition-all",
              active === section.id
                ? "scale-125 border-violet-500 bg-violet-500"
                : "bg-transparent",
            )}
          />
        </button>
      ))}
    </nav>
  );
}
