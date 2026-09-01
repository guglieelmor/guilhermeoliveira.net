"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { profile } from "@/lib/profile";
import {
  companyTenure,
  formatEducationPeriod,
  formatPeriod,
  groupByCompany,
} from "@/lib/utils";
import Divider from "./divider";

const experienceGroups = groupByCompany(profile.experience);

export default function Article() {
  const generatePDF = () => window.print();

  return (
    <>
      <section>
        <h2 className="mb-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Experiência Profissional
        </h2>

        <ul>
          {experienceGroups.map((group) => {
            const [primary] = group.roles;
            return (
              <li key={group.company} className="mb-7 flex gap-4">
                <Image
                  src={primary.image}
                  alt={group.company}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-xl border border-border object-cover"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-semibold text-foreground">
                      {group.company} · {primary.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {companyTenure(group.roles)}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-col gap-5 border-l border-border pl-4">
                    {group.roles.map((role) => (
                      <div key={role.role}>
                        <h3 className="font-semibold text-foreground">
                          {role.role}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPeriod(role.start, role.end)}
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {role.description}
                        </p>

                        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-muted-foreground">
                          {role.tags.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <Divider />

      <section>
        <h2 className="mb-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Formação Acadêmica
        </h2>

        <div className="space-y-4 text-sm leading-relaxed">
          {profile.education.map((item) => (
            <div key={`${item.school}-${item.degree}`} className="mb-7 flex gap-4">
              <Image
                src={item.image}
                alt={item.school}
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl border border-border object-cover"
              />
              <div>
                <p className="font-semibold text-foreground">{item.degree}</p>
                <p className="text-muted-foreground">{item.school}</p>
                <p className="text-muted-foreground">
                  {formatEducationPeriod(item.start, item.end, item.yearOnly)}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section>
        <h2 className="mb-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Competências &amp; Idiomas
        </h2>

        <div className="flex flex-wrap gap-2">
          {profile.topSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {profile.skillCategories.map((category) => (
            <div key={category.label}>
              <p className="text-xs font-medium text-muted-foreground/70 uppercase">
                {category.label}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex flex-wrap gap-x-8 gap-y-1 text-sm text-muted-foreground">
          {profile.languages.map((language) => (
            <span key={language.name}>
              <span className="font-medium text-foreground">
                {language.name}
              </span>{" "}
              — {language.level}
            </span>
          ))}
        </p>
      </section>

      <Divider />

      <section>
        <h2 className="mb-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Certificações &amp; Cursos
        </h2>

        <p className="text-xs font-medium text-muted-foreground/70 uppercase">
          Certificações
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {profile.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-5 text-xs font-medium text-muted-foreground/70 uppercase">
          Cursos
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {profile.courses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Divider />

      <section>
        <h2 className="mb-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Projetos
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {profile.projects.map((project) => (
            <li key={project.name}>
              <span className="font-medium text-foreground">
                {project.name}
              </span>
              : {project.description}
            </li>
          ))}
        </ul>
      </section>

      <div className="hiddenPrint flex justify-end">
        <button
          onClick={generatePDF}
          className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          <Download size={16} />
          Baixar currículo (PDF)
        </button>
      </div>
    </>
  );
}
