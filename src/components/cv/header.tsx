"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, GraduationCap, Linkedin, MapPin, Globe } from "lucide-react";
import { profile } from "@/lib/profile";

const contactLinks = [
  { href: profile.contact.site, label: profile.contact.siteLabel, icon: Globe },
  { href: profile.contact.github, label: profile.contact.githubLabel, icon: Github },
  {
    href: profile.contact.linkedin,
    label: profile.contact.linkedinLabel,
    icon: Linkedin,
  },
  {
    href: profile.contact.alura,
    label: profile.contact.auraLabel,
    icon: GraduationCap,
  },
];

export default function Header() {
  return (
    <>
      <header className="flex flex-col items-start justify-between gap-8 lg:flex-row">
        <div className="flex items-center gap-5">
          <Image
            alt={profile.name}
            className="h-20 w-20 scale-[1.11] rounded-full border border-black/10 object-cover dark:border-white/10"
            width="100"
            height="100"
            src={profile.avatar}
          />
          <div>
            <h1 className="font-display text-lg leading-loose text-foreground md:text-xl">
              Guilherme
              <br />
              Oliveira
            </h1>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {profile.role}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} />
              {profile.location}
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-2 text-sm text-muted-foreground lg:items-end">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-400"
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <section className="mt-10">
        <h2 className="mb-3 text-xs font-bold tracking-[0.3em] text-violet-600 uppercase dark:text-violet-400">
          Resumo
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {profile.summary}
        </p>
      </section>
    </>
  );
}
