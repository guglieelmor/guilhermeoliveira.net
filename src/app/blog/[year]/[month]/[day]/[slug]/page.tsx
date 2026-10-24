import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { getDict } from "@/lib/prefs";
import { getAllPosts } from "@/lib/posts";
import { CONTACT, SITE } from "@/lib/profile";

const POSTS_DIRECTORY = path.join(process.cwd(), "public", "_content");

type BlogProps = {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
};

function readPost(year: string, month: string, day: string, slug: string) {
  const filePath = path.join(POSTS_DIRECTORY, year, month, day, slug, "index.md");
  if (!fs.existsSync(filePath)) return null;
  return matter(fs.readFileSync(filePath, "utf8"));
}

function readingTimeFor(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

export async function generateMetadata({ params }: BlogProps): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = readPost(year, month, day, slug);
  if (!post) return {};
  const { data } = post;
  const canonical = `/blog/${year}/${month}/${day}/${slug}`;
  return {
    title: `${data.title} · ${SITE.name}`,
    description: data.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: data.title,
      description: data.description,
      publishedTime: data.date,
      authors: [SITE.name],
      images: ["/opengraph-image"],
    },
    twitter: { title: data.title, description: data.description },
  };
}

export default async function Post({ params }: BlogProps) {
  const { year, month, day, slug } = await params;
  const post = readPost(year, month, day, slug);
  if (!post) notFound();

  const t = await getDict();
  const { content, data } = post;
  const contentHtml = (await remark().use(remarkGfm).use(html).process(content)).toString();
  const currentPath = `/${year}/${month}/${day}/${slug}`;
  const canonicalUrl = `${SITE.url}/blog${currentPath}`;
  const date = new Date(data.date).toLocaleDateString(t.locale, { day: "numeric", month: "long", year: "numeric" });
  const related = getAllPosts()
    .filter((p) => p.path !== currentPath)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    inLanguage: "pt-BR",
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    keywords: (data.tags ?? []).join(", "),
    author: { "@type": "Person", "@id": `${SITE.url}/#person`, name: SITE.name, url: SITE.url },
  };

  return (
    <main className="pagina">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/blog" className="voltar">
        ← {t.blogPage.back}
      </Link>

      <article lang="pt-BR">
        <header className="post-topo">
          <h1>{data.title}</h1>
          <p className="post-autor">
            <Image src={SITE.avatar} alt="" width={32} height={32} />
            <span>{SITE.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={data.date}>{date}</time>
            <span aria-hidden="true">·</span>
            <span>{t.blog.minutes(readingTimeFor(content))}</span>
          </p>
          {t.blogPage.langNote && (
            <p className="nota" lang="en">
              {t.blogPage.langNote}
            </p>
          )}
        </header>

        <div className="prosa" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>

      <div className="post-fim">
        <div className="cartao-autor">
          <Image src={SITE.avatar} alt={SITE.name} width={56} height={56} />
          <div>
            <p>
              {t.blogPage.by} <strong>{SITE.name}</strong>
            </p>
            <p className="nota">{t.cv.role}</p>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="link-seta">
              {t.blogPage.profile}
            </a>
          </div>
        </div>

      </div>

      {related.length > 0 && (
        <section className="continue" aria-labelledby="mais-posts">
          <h2 id="mais-posts" className="titulo">
            {t.blogPage.more}
          </h2>
          <ul className="continue-lista">
            {related.map((p, i) => (
              <li key={p.path} style={{ "--i": i } as React.CSSProperties}>
                <Link href={`/blog${p.path}`}>
                  <span className="continue-meta">
                    {new Date(p.date).toLocaleDateString(t.locale, { day: "numeric", month: "short", year: "numeric" })}
                    {p.readingMinutes ? ` · ${t.blog.minutes(p.readingMinutes)}` : ""}
                  </span>
                  <h3>{p.title.split(" - ")[0]}</h3>
                  <span className="continue-sub">{p.title.split(" - ").slice(1).join(" - ")}</span>
                  <span className="continue-seta" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
