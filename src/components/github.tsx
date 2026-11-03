import type { Dict } from "@/lib/content";
import { getGithub } from "@/lib/github";
import { CONTACT } from "@/lib/profile";

// Seção do GitHub na home. Roda no servidor; se o GitHub não responder, a seção não aparece.
export default async function Github({ t }: { t: Dict }) {
  const data = await getGithub();
  if (!data) return null;
  const g = t.github;
  const dayLabel = (d: string) =>
    new Date(`${d}T12:00:00Z`).toLocaleDateString(t.locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const shortDate = (d: string) =>
    new Date(d).toLocaleDateString(t.locale, { day: "numeric", month: "short", year: "numeric" });
  const maxLang = Math.max(1, ...data.languages.map((l) => l.count));

  return (
    <section id="github" className="github" aria-labelledby="github-titulo">
      <div className="github-topo">
        <h2 id="github-titulo" className="titulo">
          {g.title}
        </h2>
        <p className="github-lead">{g.lead}</p>
      </div>

      <dl className="github-numeros">
        {data.contributions && (
          <div>
            <dt>{g.contributions}</dt>
            <dd>{data.contributions.total}</dd>
          </div>
        )}
        <div>
          <dt>{g.repos}</dt>
          <dd>{data.repos}</dd>
        </div>
        <div>
          <dt>{g.followers}</dt>
          <dd>{data.followers}</dd>
        </div>
        <div>
          <dt>{g.since}</dt>
          <dd>{data.since}</dd>
        </div>
      </dl>

      {data.contributions && (
        <figure className="github-calendario" data-ui>
          <div className="github-semanas" role="img" aria-label={`${g.calendar}: ${data.contributions.total} ${g.contributions}`}>
            {data.contributions.weeks.map((week, i) => (
              <div
                key={week[0]?.date ?? i}
                className="github-semana"
                style={i === 0 ? { justifyContent: "flex-end" } : undefined}
              >
                {week.map((day) => (
                  <span key={day.date} data-nivel={day.level} title={g.day(day.count, dayLabel(day.date))} />
                ))}
              </div>
            ))}
          </div>
          <figcaption className="github-legenda" aria-hidden="true">
            <span>{g.less}</span>
            {[0, 1, 2, 3, 4].map((n) => (
              <span key={n} className="github-quadro" data-nivel={n} />
            ))}
            <span>{g.more}</span>
          </figcaption>
        </figure>
      )}

      <div className="github-lados">
        {data.languages.length > 0 && (
          <div>
            <h3 className="grupo">{g.languages}</h3>
            <ul className="github-linguagens">
              {data.languages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span className="nota">{l.count}</span>
                  <span className="medidor" aria-hidden="true">
                    <span style={{ "--v": (l.count / maxLang) * 100 } as React.CSSProperties} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h3 className="grupo">{g.recent}</h3>
          <ul className="github-repos">
            {data.recent.map((r) => (
              <li key={r.name}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="github-repo">
                  <strong>{r.name}</strong>
                  <span className="github-repo-texto">{r.description ?? g.noDescription}</span>
                  <span className="nota">
                    {[r.language, r.stars ? `★ ${r.stars}` : null, g.updated(shortDate(r.pushedAt))].filter(Boolean).join(" · ")}
                  </span>
                </a>
                {r.homepage && (
                  <a href={r.homepage} target="_blank" rel="noopener noreferrer" className="github-site">
                    {g.site} ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="link-seta">
        {g.profile}
      </a>
    </section>
  );
}
