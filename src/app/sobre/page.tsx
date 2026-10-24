import type { Metadata } from "next";
import Image from "next/image";
import PrintButton from "@/components/print-button";
import { formatEducationPeriod, formatPeriod, type Dict } from "@/lib/content";
import { getDict } from "@/lib/prefs";
import { CONTACT, SITE } from "@/lib/profile";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDict();
  return {
    title: t.cv.metaTitle,
    description: t.cv.metaDescription,
    alternates: { canonical: "/sobre" },
    openGraph: { title: t.cv.metaTitle, description: t.cv.metaDescription, url: "/sobre", images: ["/opengraph-image"] },
    twitter: { title: t.cv.metaTitle, description: t.cv.metaDescription },
  };
}

// Agrupa cargos seguidos na mesma empresa, como no LinkedIn.
function byCompany(items: Dict["cv"]["experience"]) {
  const groups: { company: string; roles: typeof items }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.company === item.company) last.roles.push(item);
    else groups.push({ company: item.company, roles: [item] });
  }
  return groups;
}

export default async function Sobre() {
  const t = await getDict();
  const cv = t.cv;

  return (
    <main className="pagina">
      <header className="cv-topo">
        <h1>
          Guilherme{" "}
          <Image className="cv-foto" src={SITE.avatar} alt="" width={160} height={160} priority />
          Oliveira
        </h1>
        <div className="cv-topo-info">
          <p className="forte">{cv.role}</p>
          <p>{cv.location}</p>
          <p>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              {CONTACT.linkedinLabel}
            </a>
          </p>
          <p>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              {CONTACT.githubLabel}
            </a>
          </p>
          <p>
            <a href={CONTACT.alura} target="_blank" rel="noopener noreferrer">
              {CONTACT.aluraLabel}
            </a>
          </p>
        </div>
      </header>

      <section className="bloco" aria-labelledby="resumo">
        <h2 id="resumo">{cv.summaryTitle}</h2>
        <div className="bloco-corpo">
          <p>{cv.summary}</p>
          <div>
            <PrintButton label={cv.print} />
          </div>
        </div>
      </section>

      <section className="bloco" aria-labelledby="experiencia">
        <h2 id="experiencia">{cv.experienceTitle}</h2>
        <div className="bloco-corpo">
          {byCompany(cv.experience).map((group) => (
            <article key={group.company} className="cv-item">
              <Image src={group.roles[0].image} alt="" width={48} height={48} />
              <div>
                <p className="cv-empresa">{group.company}</p>
                <p className="nota">{group.roles[0].location}</p>
                <div className="cv-papeis">
                  {group.roles.map((role) => (
                    <div key={role.id} id={role.id} className="cv-item-papel">
                      <h3>{role.role}</h3>
                      <p className="nota">{formatPeriod(t, role.start, role.end)}</p>
                      <p>{role.description}</p>
                      <p className="cv-tags">{role.tags.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bloco" aria-labelledby="formacao">
        <h2 id="formacao">{cv.educationTitle}</h2>
        <div className="bloco-corpo">
          {cv.education.map((item) => (
            <article key={item.id} id={item.id} className="cv-item">
              <Image src={item.image} alt="" width={48} height={48} />
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <p className="nota">{formatEducationPeriod(t, item.start, item.end, item.yearOnly)}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bloco" aria-labelledby="competencias">
        <h2 id="competencias">{cv.skillsTitle}</h2>
        <div className="bloco-corpo">
          <div className="cv-grupos">
            {cv.skillGroups.map((group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.skills.join(" · ")}</p>
              </div>
            ))}
          </div>
          <ul className="cv-lista">
            {cv.languages.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong>, {l.level}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bloco" id="certificacoes" aria-labelledby="certificacoes-titulo">
        <h2 id="certificacoes-titulo">{cv.certsTitle}</h2>
        <div className="bloco-corpo">
          <ul className="cv-lista">
            {cv.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bloco" id="cursos" aria-labelledby="cursos-titulo">
        <h2 id="cursos-titulo">{cv.coursesTitle}</h2>
        <div className="bloco-corpo">
          <ul className="cv-lista">
            {cv.courses.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bloco" aria-labelledby="projetos">
        <h2 id="projetos">{cv.projectsTitle}</h2>
        <div className="bloco-corpo">
          {cv.projects.map((p) => (
            <article key={p.id} id={p.id} className="cv-projeto">
              <h3>{p.name}</h3>
              <p className="nota">{p.tag}</p>
              <p>{p.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
