"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FolderGit2, Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import HeroGlow from "@/components/home/hero-glow";
import HeroTerminal from "@/components/home/hero-terminal";
import ExperienceTimeline from "@/components/home/experience-timeline";
import ListPosts from "@/components/blog/list-posts";
import { profile } from "@/lib/profile";
import type { PostMeta } from "@/lib/posts";
import { cn, diffYearsAndMonths, groupByCompany } from "@/lib/utils";

const experienceGroups = groupByCompany(profile.experience);
const skillCategories = profile.skillCategories;

function SectionLabel({ label }: { label: string }) {
  return (
    <h2 className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
      {label}
    </h2>
  );
}

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

export default function Index({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden px-6 pt-40 pb-24 md:px-10 md:pt-48"
      >
        <HeroGlow />

        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_480px] lg:items-center">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-blue-600 uppercase dark:text-blue-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
                </span>
                Disponível para novos desafios
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display mt-6 text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Lidero engenharia.
                <br />
                <span className="text-muted-foreground">
                  Formo engenheiros.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-3">
                <Image
                  alt={profile.name}
                  src={profile.avatar}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border border-border object-cover"
                />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {profile.name}
                  </span>{" "}
                  — {profile.headline}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {profile.summaryShort}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/sobre"
                    className="inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                  >
                    Ver currículo
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={profile.contact.linkedin}
                    target="_blank"
                    className="inline-block rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/5"
                  >
                    Fale comigo
                  </Link>
                </motion.div>
                <div className="ml-1 flex items-center gap-4 text-muted-foreground">
                  <Link
                    href={profile.contact.linkedin}
                    target="_blank"
                    aria-label="LinkedIn"
                    className="transition-colors hover:text-foreground"
                  >
                    <Linkedin size={18} />
                  </Link>
                  <Link
                    href={profile.contact.github}
                    target="_blank"
                    aria-label="GitHub"
                    className="transition-colors hover:text-foreground"
                  >
                    <Github size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.5}
            className="justify-self-center lg:justify-self-end"
          >
            <HeroTerminal
              host="gulliver"
              yearsOfExperience={yearsOfExperience}
              stackLines={[
                "TypeScript · Next.js · AWS",
                "Docker · MySQL · Redis",
              ]}
              location={profile.location}
              certifications={profile.certifications.length}
            />
          </Reveal>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre-section" className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <SectionLabel label="Sobre" />
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-[220px_1fr] sm:items-start sm:gap-14">
            <Reveal delay={0.1}>
              <div className="group relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-2xl border border-border transition-colors duration-300 hover:border-blue-500/40 dark:hover:border-blue-400/40">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent px-4 pt-10 pb-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-foreground uppercase">
                    {profile.location}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-8">
              <Reveal delay={0.15}>
                <p className="leading-relaxed text-muted-foreground">
                  {profile.bioHome}
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <dl className="flex flex-col border-t border-border pt-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border/60 py-4 last:border-0"
                    >
                      <dt className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                        {stat.label}
                      </dt>
                      <dd className="font-display text-2xl text-foreground">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-border" />

      {/* Experiência */}
      <section
        id="experiencia-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <SectionLabel label="Experiência" />
          </Reveal>

          <div className="flex flex-col gap-10">
            <ExperienceTimeline groups={experienceGroups} />

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

      <div className="mx-auto h-px max-w-5xl bg-border" />

      {/* Competências */}
      <section
        id="competencias-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <SectionLabel label="Competências" />
          </Reveal>

          <div className="flex min-w-0 flex-col gap-10">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {profile.topSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {skillCategories.map((category) => (
                  <div
                    key={category.label}
                    className={cn(
                      "rounded-lg border border-border p-5 transition-colors hover:border-foreground/20",
                      category.skills.length > 5 && "col-span-2",
                    )}
                  >
                    <h3 className="text-xs font-medium tracking-[0.15em] text-muted-foreground/70 uppercase">
                      {category.label}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="skill-marquee group relative w-full min-w-0 overflow-hidden border-y border-border py-4">
                <div
                  className="flex w-max gap-10 group-hover:[animation-play-state:paused]"
                  style={{ animation: "marquee 26s linear infinite" }}
                >
                  {[...profile.techSkills, ...profile.techSkills].map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="font-mono text-xs tracking-[0.2em] text-muted-foreground/50 uppercase"
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

      <div className="mx-auto h-px max-w-5xl bg-border" />

      {/* Projetos */}
      <section
        id="projetos-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <SectionLabel label="Projetos" />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {profile.projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.1} className="h-full">
                <motion.div whileHover={{ y: -3 }} className="h-full">
                  <Card className="flex h-full flex-col gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <FolderGit2 size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {project.name}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-border" />

      {/* Blog teaser */}
      <section
        id="blog-section"
        className="mx-auto max-w-5xl px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <SectionLabel label="Blog" />
          </Reveal>

          <div>
            <ListPosts posts={posts} limit={3} compact />
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
    </>
  );
}
