"use client";

import { navLinks } from "@/lib/nav-links";
import { profile } from "@/lib/profile";
import FooterScene from "./footer-scene";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const socials = [
  { href: profile.contact.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: profile.contact.github, label: "GitHub", icon: Github },
  {
    href: "https://www.instagram.com/guilhermegulliver/",
    label: "Instagram",
    icon: Instagram,
  },
  { href: `mailto:${profile.contact.email}`, label: "E-mail", icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="hiddenPrint relative mt-32 overflow-hidden bg-gradient-to-b from-background via-muted/40 to-muted/70">
      <div className="relative z-10 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <FooterScene />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-14 py-20 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              Brasil · {time}
            </div>
            <p className="font-display mt-6 text-sm leading-loose text-foreground">
              Guilherme
              <br />
              Oliveira
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Tech Lead, professor e desenvolvedor full stack construindo
              produtos robustos e escaláveis.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-display text-[0.6rem] tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
              Navegação
            </h3>
            <ul className="mt-6 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="-translate-y-px opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-display text-[0.6rem] tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
              Contato
            </h3>
            <ul className="mt-6 space-y-3 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.label}
                    <ArrowUpRight
                      size={13}
                      className="-translate-y-px opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Voltar ao topo */}
          <div className="flex items-start justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="group relative cursor-pointer border-2 border-foreground/70 bg-background/95 px-4 py-2.5 text-[0.6rem] tracking-[0.15em] uppercase transition-colors hover:text-violet-600 dark:hover:text-violet-400"
              aria-label="Voltar ao topo"
            >
              <span className="absolute -top-[3px] -left-[3px] h-[6px] w-[6px] bg-foreground/70" />
              <span className="absolute -top-[3px] -right-[3px] h-[6px] w-[6px] bg-foreground/70" />
              <span className="absolute -bottom-[3px] -left-[3px] h-[6px] w-[6px] bg-foreground/70" />
              <span className="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px] bg-foreground/70" />
              <span className="font-display flex items-center gap-2">
                <ArrowUp
                  size={12}
                  className="transition-transform group-hover:-translate-y-1"
                />
                Topo
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-black/5 pt-10 pb-8 text-xs text-muted-foreground md:flex-row dark:border-white/5">
          <p>
            © {year} {profile.name}. Todos os direitos reservados.
          </p>

          <ul className="flex items-center gap-5">
            {socials.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  aria-label={social.label}
                  className="inline-block text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-violet-500 dark:hover:text-violet-400"
                >
                  <social.icon size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
