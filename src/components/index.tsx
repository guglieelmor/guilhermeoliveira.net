"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FolderGit2, Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import HeroGlow from "@/components/home/hero-glow";
import ListPosts from "@/components/blog/list-posts";
import { profile } from "@/lib/profile";
import {
  companyTenure,
  diffYearsAndMonths,
  formatPeriod,
  groupByCompany,
} from "@/lib/utils";

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

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden px-6 pt-40 pb-24 md:px-10 md:pt-48"
      >
        <HeroGlow />

        <div className="relative mx-auto max-w-3xl">
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
              <span className="text-muted-foreground">Formo engenheiros.</span>
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
      </section>

      {/* Sobre */}
      <section id="sobre-section" className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <SectionLabel label="Sobre" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {profile.bioHome}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="md:col-start-2">
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-foreground md:text-3xl">
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

          <div className="flex flex-col gap-6">
            {experienceGroups.map((group, index) => (
              <Reveal key={group.company} delay={index * 0.08}>
                <Card>
                  <div className="flex gap-5">
                    <Image
                      src={group.roles[0].image}
                      alt={group.company}
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {group.company} · {group.roles[0].location}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {companyTenure(group.roles)}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-col gap-6 border-l border-border pl-5">
                        {group.roles.map((role) => (
                          <div key={role.role}>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <h3 className="font-display text-sm text-foreground md:text-base">
                                {role.role}
                              </h3>
                              <span
                                className={`font-mono text-[0.6rem] tracking-[0.1em] uppercase ${
                                  role.end
                                    ? "text-muted-foreground/60"
                                    : "text-blue-600 dark:text-blue-400"
                                }`}
                              >
                                {role.end ? "concluído" : "em andamento"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatPeriod(role.start, role.end)}
                            </p>
                            <p className="mt-3 leading-relaxed text-muted-foreground">
                              {role.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {role.tags.slice(0, 6).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
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
              <div className="grid gap-8 sm:grid-cols-2">
                {skillCategories.map((category) => (
                  <div key={category.label}>
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

          <div className="flex flex-col gap-8">
            {profile.projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <FolderGit2
                    size={16}
                    className="mt-1 shrink-0 text-muted-foreground"
                  />
                  <div>
                    <h3 className="font-display text-sm text-foreground md:text-base">
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
    </>
  );
}
