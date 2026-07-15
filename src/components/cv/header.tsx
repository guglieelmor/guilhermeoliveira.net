"use client";

import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Header() {
  return (
    <>
      <header className="flex flex-col items-start justify-between lg:flex-row">
        <div>
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
            </div>
          </div>
        </div>
        <div className="mt-10 text-left text-sm leading-relaxed text-muted-foreground lg:mt-0 lg:text-right">
          <p>
            <Link
              href={profile.contact.site}
              target="_blank"
              className="hover:text-violet-600 dark:hover:text-violet-400"
            >
              {profile.contact.siteLabel}
            </Link>
          </p>
          <p>
            <Link
              href={profile.contact.github}
              target="_blank"
              className="hover:text-violet-600 dark:hover:text-violet-400"
            >
              {profile.contact.githubLabel}
            </Link>
          </p>
          <p>
            <Link
              href={profile.contact.linkedin}
              target="_blank"
              className="hover:text-violet-600 dark:hover:text-violet-400"
            >
              {profile.contact.linkedinLabel}
            </Link>
          </p>
          <p>
            <Link
              href={profile.contact.alura}
              target="_blank"
              className="hover:text-violet-600 dark:hover:text-violet-400"
            >
              {profile.contact.auraLabel}
            </Link>
          </p>
        </div>
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
