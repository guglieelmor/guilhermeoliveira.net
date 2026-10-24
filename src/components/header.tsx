"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { DICTS, type Lang } from "@/lib/content";
import type { Theme } from "@/lib/prefs";

const YEAR = 60 * 60 * 24 * 365;

function darkQuery() {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

function subscribeDark(callback: () => void) {
  const query = darkQuery();
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${YEAR}; samesite=lax`;
}

export default function Header({ lang, theme }: { lang: Lang; theme: Theme }) {
  const t = DICTS[lang];
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState<Theme>(theme);
  const systemDark = useSyncExternalStore(subscribeDark, () => darkQuery().matches, () => false);
  const dark = current ? current === "escuro" : systemDark;
  const [homeSection, setHomeSection] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [slab, setSlab] = useState<{ x: number; w: number } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menu = useRef<HTMLDetailsElement>(null);

  // Na home, o link ativo é a seção no meio da tela; nas outras páginas, a própria página.
  const section =
    pathname === "/"
      ? homeSection
      : pathname.startsWith("/blog")
        ? "/blog"
        : pathname.startsWith("/sobre")
          ? "/sobre"
          : null;

  // A barra some ao descer e volta ao subir; ganha fundo assim que sai do topo.
  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!menu.current?.open) setHidden(y > last && y > 400);
      last = y;
    }
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `/#${entry.target.id}`;
          if (entry.isIntersecting) setHomeSection(href);
          else setHomeSection((s) => (s === href ? null : s));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ["trajetoria", "terminal"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  // "/" leva ao terminal, como a busca de um editor.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || target.closest("input, textarea, [contenteditable]")) return;
      const input = document.getElementById("terminal-entrada") as HTMLInputElement | null;
      if (!input) return;
      e.preventDefault();
      document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "start" });
      input.focus({ preventScroll: true });
      input.select();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // O bloco de destaque corre até o link sob o cursor, ou volta para a seção atual.
  const target = hover ?? section;
  useLayoutEffect(() => {
    const el = target ? links.current[target] : null;
    setSlab(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [target, lang]);

  function toggleTheme() {
    const next: Theme = dark ? "claro" : "escuro";
    setCookie("tema", next);
    document.documentElement.dataset.theme = next;
    setCurrent(next);
  }

  function setLang(next: Lang) {
    if (next === lang) return;
    setCookie("lang", next);
    router.refresh();
  }

  const controls = (
    <div className="barra-controles">
      <div className="seletor" role="group" aria-label={t.nav.langSwitchLabel} data-pos={lang === "pt" ? 0 : 1}>
        <button type="button" aria-pressed={lang === "pt"} onClick={() => setLang("pt")} lang="pt-BR">
          PT
        </button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")} lang="en">
          EN
        </button>
      </div>
      <button
        type="button"
        className="tema"
        role="switch"
        aria-checked={dark}
        aria-label={dark ? t.nav.themeLight : t.nav.themeDark}
        onClick={toggleTheme}
      >
        <span className="tema-trilho" aria-hidden="true">
          <span className="tema-bola" />
        </span>
        <span className="tema-nome">{dark ? t.nav.themeDarkShort : t.nav.themeLightShort}</span>
      </button>
    </div>
  );

  return (
    <header className="barra" data-solida={scrolled ? "" : undefined} data-escondida={hidden ? "" : undefined}>
      <Link href="/" className="marca" aria-label={`${t.nav.home} · Guilherme Oliveira`}>
        <span className="marca-rolo" aria-hidden="true">
          <span>Guilherme Oliveira</span>
          <span>Gulliver</span>
        </span>
      </Link>

      <nav className="barra-nav" aria-label={t.nav.menu}>
        <ul className="barra-links" onMouseLeave={() => setHover(null)}>
          {slab && (
            <li
              className="barra-bloco"
              aria-hidden="true"
              style={{ "--x": `${slab.x}px`, "--w": `${slab.w}px` } as React.CSSProperties}
            />
          )}
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                ref={(el) => {
                  links.current[link.href] = el;
                }}
                aria-current={section === link.href ? "true" : undefined}
                data-alvo={target === link.href ? "" : undefined}
                onMouseEnter={() => setHover(link.href)}
                onFocus={() => setHover(link.href)}
                onBlur={() => setHover(null)}
              >
                {link.label}
                {link.href === "/#terminal" && (
                  <kbd className="tecla" title={t.nav.slashHint}>
                    /
                  </kbd>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {controls}

        <Link href="/#contato" className="barra-acao">
          {t.nav.action}
        </Link>

        <details className="barra-menu" ref={menu}>
          <summary>
            <span className="so-fechado">{t.nav.menu}</span>
            <span className="so-aberto">{t.nav.close}</span>
          </summary>
          <div className="folha">
            <ul>
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => menu.current?.removeAttribute("open")}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#contato" onClick={() => menu.current?.removeAttribute("open")}>
                  {t.nav.action}
                </Link>
              </li>
            </ul>
            {controls}
          </div>
        </details>
      </nav>
    </header>
  );
}
