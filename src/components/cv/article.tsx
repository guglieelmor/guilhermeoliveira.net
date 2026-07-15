"use client";

import Image from "next/image";
import { useEffect } from "react";
import { profile } from "@/lib/profile";
import { formatPeriod } from "@/lib/utils";
import Divider from "./divider";

export default function Article() {
  const generatePDF = async () => {
    const hiddenPrint = document.getElementsByClassName("hiddenPrint");

    for (const element of hiddenPrint) {
      (element as HTMLElement).style.display = "none";
    }
    window.print();
  };

  useEffect(() => {
    const afterPrint = () => {
      const hiddenPrint = document.getElementsByClassName("hiddenPrint");

      for (const element of hiddenPrint) {
        (element as HTMLElement).style.display = "none";
      }
    };

    window.addEventListener("afterprint", afterPrint);

    return () => {
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return (
    <>
      <section>
        <h2 className="mb-3 text-xs font-bold tracking-[0.3em] text-violet-600 uppercase dark:text-violet-400">
          Experiência Profissional
        </h2>

        <ul>
          {profile.experience.map((item) => (
            <li key={`${item.company}-${item.role}`} className="mb-7 flex gap-4">
              <Image
                src={item.image}
                alt={item.company}
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl border border-black/10 object-cover dark:border-white/10"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {item.role}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.company} · {item.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatPeriod(item.start, item.end)}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-muted-foreground">
                  {item.tags.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      <section>
        <h2 className="mb-3 text-xs font-bold tracking-[0.3em] text-violet-600 uppercase dark:text-violet-400">
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
                className="h-12 w-12 rounded-xl border border-black/10 object-cover dark:border-white/10"
              />
              <div>
                <p className="font-semibold text-foreground">{item.degree}</p>
                <p className="text-muted-foreground">{item.school}</p>
                <p className="text-muted-foreground">{item.period}</p>
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
        <h2 className="mb-3 text-xs font-bold tracking-[0.3em] text-violet-600 uppercase dark:text-violet-400">
          Competências &amp; Idiomas
        </h2>

        <div className="flex flex-wrap gap-2">
          {profile.topSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400"
            >
              {skill}
            </span>
          ))}
          {profile.techSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted-foreground dark:border-white/10"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-muted-foreground">
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
        <h2 className="mb-3 text-xs font-bold tracking-[0.3em] text-violet-600 uppercase dark:text-violet-400">
          Certificações &amp; Cursos
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {profile.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {profile.courses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Divider />

      <section>
        <h2 className="mb-3 text-xs font-bold tracking-[0.3em] text-violet-600 uppercase dark:text-violet-400">
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
          className="mt-10 cursor-pointer rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400"
        >
          Baixar currículo (PDF)
        </button>
      </div>
    </>
  );
}
