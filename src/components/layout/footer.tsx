"use client";

import { navLinks } from "@/lib/nav-links";
import { profile } from "@/lib/profile";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";

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

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="hiddenPrint relative mt-32 overflow-hidden border-t border-border">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-14 py-20 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-sm font-medium text-foreground">
              Guilherme Oliveira
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Tech Lead, professor e desenvolvedor full stack construindo
              produtos robustos e escaláveis.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
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
            <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
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
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              aria-label="Voltar ao topo"
            >
              <ArrowUp
                size={12}
                className="transition-transform group-hover:-translate-y-0.5"
              />
              Topo
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-10 pb-8 text-xs text-muted-foreground md:flex-row">
          <p>
            © {year} {profile.name}. Todos os direitos reservados. ·{" "}
            <Link
              href="/privacidade"
              className="transition-colors hover:text-foreground"
            >
              Privacidade
            </Link>
          </p>

          <ul className="flex items-center gap-5">
            {socials.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  aria-label={social.label}
                  className="inline-block text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <social.icon size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.12em] w-full overflow-hidden text-center font-display text-[19vw] leading-none whitespace-nowrap text-foreground/[0.04] select-none"
      >
        GUILHERME
      </p>
    </footer>
  );
}
