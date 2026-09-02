import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Container from "@/components/layout/container";
import { profile } from "@/lib/profile";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

const POSTS_DIRECTORY = path.join(process.cwd(), "/public/_content");

type BlogProps = {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
};

function readingTimeFor(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function formatLongDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const filePath = path.join(POSTS_DIRECTORY, year, month, day, slug, "index.md");
  if (!fs.existsSync(filePath)) return {};
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  const title = `${data.title} - Guilherme Oliveira`;
  const canonicalPath = `/blog/${year}/${month}/${day}/${slug}`;
  return {
    title,
    description: data.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title,
      description: data.description,
      publishedTime: data.date,
      authors: [profile.name],
      images: [profile.avatar],
    },
    twitter: {
      title,
      description: data.description,
      images: [profile.avatar],
    },
  };
}

export default async function Blog({ params }: BlogProps) {
  const { year, month, day, slug } = await params;

  const filePath = path.join(
    POSTS_DIRECTORY,
    year,
    month,
    day,
    slug,
    "index.md",
  );
  if (!fs.existsSync(filePath)) {
    return <div>Post não encontrado</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();
  const minutes = readingTimeFor(content);
  const currentPath = `/${year}/${month}/${day}/${slug}`;
  const tags: string[] = data.tags ?? [];
  const [category, ...restTags] = tags;

  const relatedPosts = getAllPosts()
    .filter((post) => post.path !== currentPath)
    .slice(0, 3);

  const canonicalUrl = `${SITE_URL}/blog${currentPath}`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
  };

  return (
    <Container className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Voltar para o blog
      </Link>

      <article>
        <header className="mt-8">
          {category && (
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-700 uppercase tracking-wide dark:text-blue-400">
              {category}
            </span>
          )}

          <h1 className="font-display mt-5 text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            {data.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Image
              alt={profile.name}
              src={profile.avatar}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full border border-border object-cover"
            />
            <span className="font-medium text-foreground">{profile.name}</span>
            <span>·</span>
            <span>{formatLongDate(data.date)}</span>
            <span>·</span>
            <span>{minutes} min de leitura</span>
          </div>

          {restTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {restTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mt-10 h-px w-full bg-border" />

        <div
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="prose prose-blue dark:prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-blockquote:border-l-blue-500/50 prose-blockquote:font-normal prose-blockquote:not-italic prose-code:before:content-none prose-code:after:content-none"
        />
      </article>

      <div className="mt-16 h-px w-full bg-border" />

      <div className="mt-10 flex items-center gap-4 rounded-lg border border-border p-6">
        <Image
          alt={profile.name}
          src={profile.avatar}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
        />
        <div>
          <p className="font-medium text-foreground">Escrito por {profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.headline}</p>
          <Link
            href={profile.contact.linkedin}
            target="_blank"
            className="group mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver perfil
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
            Mais posts
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                key={post.path}
                href={`/blog${post.path}`}
                className="group block rounded-lg border border-border p-5 transition-colors hover:border-foreground/20"
              >
                <p className="font-display text-sm text-foreground transition-colors group-hover:text-muted-foreground">
                  {post.title}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatLongDate(post.date)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
