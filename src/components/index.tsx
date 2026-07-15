"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import AuroraBackground from "@/components/home/aurora-background";
import OrbitBadge from "@/components/home/orbit-badge";
import ListPosts from "@/components/blog/list-posts";
import { profile } from "@/lib/profile";
import { formatPeriod } from "@/lib/utils";

const nameWords = ["Guilherme", "Oliveira"];

const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const nameWord = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Index() {
  const scrollToNext = () =>
    document
      .getElementById("sobre-section")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Hero */}
      <section className="hero-scene relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-24 md:px-10">
        <AuroraBackground />

        <div className="relative mx-auto w-full max-w-4xl">
          <Reveal>
            <p className="font-display flex items-center gap-2 text-[0.65rem] text-violet-600 md:text-xs dark:text-violet-400">
              &gt; disponível para novos desafios
              <span
                className="inline-block h-3 w-[2px] bg-violet-500"
                style={{ animation: "blink-caret 1s steps(2) infinite" }}
              />
            </p>
          </Reveal>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={nameContainer}
            className="mt-6 text-6xl leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {nameWords.map((word) => (
              <motion.span key={word} variants={nameWord} className="block">
                <span className="gradient-text">{word}</span>
              </motion.span>
            ))}
          </motion.h1>

          <Reveal delay={0.5}>
            <p className="mt-6 text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase md:text-base">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {profile.summaryShort}
            </p>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/sobre"
                  className="inline-block rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_0_rgba(139,92,246,0.6)] transition-shadow hover:shadow-[0_0_30px_4px_rgba(139,92,246,0.45)]"
                >
                  Ver currículo
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`mailto:${profile.contact.email}`}
                  className="inline-block rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50 hover:text-violet-600 dark:border-white/10 dark:hover:text-violet-400"
                >
                  Fale comigo
                </Link>
              </motion.div>
              <div className="flex items-center gap-3 pl-2 text-muted-foreground">
                <Link
                  href={profile.contact.linkedin}
                  target="_blank"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-violet-500 dark:hover:text-violet-400"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href={profile.contact.github}
                  target="_blank"
                  aria-label="GitHub"
                  className="transition-colors hover:text-violet-500 dark:hover:text-violet-400"
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10">
          <OrbitBadge onClick={scrollToNext} />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre-section" className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Sobre
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 md:flex-row md:gap-10">
              <Image
                alt={profile.name}
                width={112}
                height={112}
                className="h-24 w-24 shrink-0 rounded-full border border-black/10 object-cover dark:border-white/10"
                src={profile.avatar}
              />
              <p className="text-lg leading-relaxed text-muted-foreground">
                {profile.summary}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-black/5 dark:bg-white/5" />

      {/* Experiência */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Experiência
            </h2>
          </Reveal>

          <div className="flex flex-col gap-14">
            {profile.experience.map((item, index) => (
              <Reveal key={`${item.company}-${item.role}`} delay={index * 0.1}>
                <div className="flex gap-5">
                  <Image
                    src={item.image}
                    alt={item.company}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-xl border border-black/10 object-cover dark:border-white/10"
                  />
                  <div>
                    <h3 className="font-display text-sm leading-relaxed text-foreground md:text-base">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.company} · {item.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPeriod(item.start, item.end)}
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted-foreground dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                Ver currículo completo
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-black/5 dark:bg-white/5" />

      {/* Competências */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Competências
            </h2>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="flex flex-wrap gap-3">
                {profile.topSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-2">
                {profile.techSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted-foreground dark:border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-x-10 gap-y-2 text-sm text-muted-foreground">
                {profile.languages.map((language) => (
                  <p key={language.name}>
                    <span className="font-medium text-foreground">
                      {language.name}
                    </span>{" "}
                    — {language.level}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-black/5 dark:bg-white/5" />

      {/* Blog teaser */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Blog
            </h2>
          </Reveal>

          <div>
            <ListPosts limit={3} compact />
            <Reveal>
              <Link
                href="/blog"
                className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                Ver todos os posts
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="mx-auto max-w-5xl px-6 py-32 md:px-10">
        <Reveal>
          <h2 className="font-display text-xl leading-relaxed text-foreground sm:text-2xl md:text-3xl">
            Vamos construir
            <br />
            algo juntos?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400"
            >
              <Mail size={16} />
              {profile.contact.email}
            </Link>
            <Link
              href={profile.contact.linkedin}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50 hover:text-violet-600 dark:border-white/10 dark:hover:text-violet-400"
            >
              <Linkedin size={16} />
              {profile.contact.linkedinLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
