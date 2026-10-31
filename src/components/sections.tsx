import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import type { PostMeta } from "@/lib/posts";
import ContactForm, { Clock } from "./contact-form";
import Titulo from "./titulo";

import imgLilliput from "../../public/img/gulliver-s-travels-by-grandville-107561613.jpg";

// Seções de servidor da home; as interativas (hero, trajetória, terminal, perguntas) ficam em arquivos próprios.

export function Gulliver({ t }: { t: Dict }) {
  return (
    <figure className="gulliver" data-reveal>
      <div className="foto foto-gravura r">
        <Image src={imgLilliput} alt={t.ask.plateAlt} sizes="100vw" placeholder="blur" />
      </div>
      <figcaption className="r" style={{ "--i": 1 } as React.CSSProperties}>
        {t.ask.plateCaption}
      </figcaption>
    </figure>
  );
}

export function Blog({ t, posts }: { t: Dict; posts: PostMeta[] }) {
  const latest = posts[0];
  return (
    <section className="blog" data-reveal aria-labelledby="blog-titulo">
      <div className="blog-texto">
        <Titulo id="blog-titulo" className="r" text={t.blog.title} />
        <p className="r" style={{ "--i": 1 } as React.CSSProperties}>
          {t.blog.text}
        </p>
        <Link href="/blog" className="link-seta r" style={{ "--i": 2 } as React.CSSProperties}>
          {t.blog.all}
        </Link>
      </div>
      {latest ? (
        <Link href={`/blog${latest.path}`} className="blog-post r" style={{ "--i": 2 } as React.CSSProperties}>
          <p className="blog-meta">
            <time dateTime={latest.date}>
              {new Date(latest.date).toLocaleDateString(t.locale, { day: "numeric", month: "long", year: "numeric" })}
            </time>
            {latest.readingMinutes ? ` · ${t.blog.minutes(latest.readingMinutes)}` : ""}
          </p>
          <h3>{latest.title}</h3>
          <p>{latest.description}</p>
          <span className="link-seta">{t.blog.readMore}</span>
        </Link>
      ) : (
        <p className="r">{t.blog.none}</p>
      )}
    </section>
  );
}

// Sem animação de entrada daqui para baixo: o fim da página aparece sempre.
export function Contact({ t }: { t: Dict }) {
  const c = t.contact;
  return (
    <section id="contato" className="contato" aria-labelledby="contato-titulo">
      <h2 id="contato-titulo" className="contato-titulo">
        <span>{c.line1}</span> <span>{c.line2}</span>
      </h2>
      <div className="contato-grade">
        <ContactForm lang={t.lang} />
        <div className="contato-lado">
          <Clock lang={t.lang} />
          <ul className="contato-links">
            {c.rows.map((r) => (
              <li key={r.label}>
                <a href={r.href} {...(r.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
                  <span className="contato-rede">{r.label}</span>
                  <span className="contato-end">{r.value}</span>
                  <span className="contato-seta" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
