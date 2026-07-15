"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FolderGit2, Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Magnetic } from "@/components/ui/magnetic";
import { Counter } from "@/components/ui/counter";
import AuroraBackground from "@/components/home/aurora-background";
import OrbitBadge from "@/components/home/orbit-badge";
import HeroPortrait from "@/components/home/hero-portrait";
import AbstractMark from "@/components/home/abstract-mark";
import ScrollProgress from "@/components/home/scroll-progress";
import SectionNav from "@/components/home/section-nav";
import ListPosts from "@/components/blog/list-posts";
import { profile } from "@/lib/profile";
import { diffYearsAndMonths, formatPeriod, groupByCompany } from "@/lib/utils";

const experienceGroups = groupByCompany(profile.experience);
const skillCategories = profile.skillCategories;

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

const earliestStart = profile.experience.reduce(
  (min, item) => (item.start < min ? item.start : min),
  profile.experience[0].start,
);
const { years: yearsOfExperience } = diffYearsAndMonths(
  earliestStart,
  new Date(),
);

const stats = [
  { label: "Anos de experiência", value: yearsOfExperience, suffix: "+" },
  { label: "Tecnologias", value: profile.techSkills.length, suffix: "+" },
  { label: "Certificações", value: profile.certifications.length, suffix: "" },
];

export default function Index() {
  const scrollToNext = () =>
    document
      .getElementById("sobre-section")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <AuroraBackground />
      <ScrollProgress />
      <SectionNav />

      {/* Hero */}
      <section
        id="hero"
        className="hero-scene relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-24 md:px-10"
      >
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="order-2 lg:order-1">
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
                <Magnetic>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/sobre"
                      className="inline-block rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_0_rgba(139,92,246,0.6)] transition-shadow hover:shadow-[0_0_30px_4px_rgba(139,92,246,0.45)]"
                    >
                      Ver currículo
                    </Link>
                  </motion.div>
                </Magnetic>
                <Magnetic>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={`mailto:${profile.contact.email}`}
                      className="inline-block rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50 hover:text-violet-600 dark:border-white/10 dark:hover:text-violet-400"
                    >
                      Fale comigo
                    </Link>
                  </motion.div>
                </Magnetic>
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

          <Reveal
            direction="right"
            delay={0.3}
            className="order-1 flex justify-center lg:order-2"
          >
            <HeroPortrait />
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
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {profile.bioHome}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="md:col-start-2">
            <div className="grid grid-cols-3 gap-6 border-t border-black/5 pt-10 dark:border-white/5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-violet-600 md:text-3xl dark:text-violet-400">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-black/5 dark:bg-white/5" />

      {/* Experiência */}
      <section
        id="experiencia-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Experiência
            </h2>
          </Reveal>

          <div className="flex flex-col gap-8">
            {experienceGroups.map((group, index) => (
              <Reveal key={group.company} delay={index * 0.1}>
                <SpotlightCard>
                  <div className="flex gap-5">
                    <Image
                      src={group.roles[0].image}
                      alt={group.company}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-xl border border-black/10 object-cover dark:border-white/10"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {group.company} · {group.roles[0].location}
                      </p>

                      <div className="mt-5 flex flex-col gap-6 border-l border-black/10 pl-5 dark:border-white/10">
                        {group.roles.map((role) => (
                          <div key={role.role}>
                            <h3 className="font-display text-sm leading-relaxed text-foreground md:text-base">
                              {role.role}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {formatPeriod(role.start, role.end)}
                            </p>
                            <p className="mt-3 leading-relaxed text-muted-foreground">
                              {role.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {role.tags.slice(0, 6).map((tag) => (
                                <motion.span
                                  key={tag}
                                  whileHover={{ scale: 1.08, y: -2 }}
                                  className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-violet-500/40 hover:text-violet-600 dark:border-white/10 dark:hover:text-violet-400"
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
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
      <section
        id="competencias-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Competências
            </h2>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-10">
            <Reveal>
              <div className="flex flex-wrap gap-3">
                {profile.topSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-600 transition-shadow hover:shadow-[0_0_20px_2px_rgba(139,92,246,0.35)] dark:text-violet-400"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-8 sm:grid-cols-2">
                {skillCategories.map((category) => (
                  <div key={category.label}>
                    <h3 className="text-xs font-medium tracking-[0.15em] text-muted-foreground/70 uppercase">
                      {category.label}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-violet-500/40 hover:text-violet-600 dark:border-white/10 dark:hover:text-violet-400"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="skill-marquee group relative w-full min-w-0 overflow-hidden border-y border-black/5 py-4 dark:border-white/5">
                <div
                  className="flex w-max gap-10 group-hover:[animation-play-state:paused]"
                  style={{ animation: "marquee 26s linear infinite" }}
                >
                  {[...profile.techSkills, ...profile.techSkills].map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="font-display text-xs tracking-[0.2em] text-muted-foreground/50 uppercase"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
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

      {/* Projetos */}
      <section
        id="projetos-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
              Projetos
            </h2>
          </Reveal>

          <div className="flex flex-col gap-8">
            {profile.projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <FolderGit2
                    size={16}
                    className="mt-1 shrink-0 text-violet-500 dark:text-violet-400"
                  />
                  <div>
                    <h3 className="font-display text-sm leading-relaxed text-foreground md:text-base">
                      {project.name}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-black/5 dark:bg-white/5" />

      {/* Blog teaser */}
      <section
        id="blog-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
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

      {/* Encerramento */}
      <section className="relative w-full py-8">
        <AbstractMark />
      </section>
    </>
  );
}
