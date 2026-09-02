"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import type { PostMeta } from "@/lib/posts";

function formatLongDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ListPosts({
  posts: allPosts,
  limit = 5,
  compact = false,
}: {
  posts: PostMeta[];
  limit?: number;
  compact?: boolean;
}) {
  const posts = allPosts.slice(0, limit);

  if (!posts?.length) {
    return (
      <p className="text-muted-foreground">
        Nenhum post encontrado no momento.
      </p>
    );
  }

  return (
    <div>
      {posts.map((post, index) => {
        const [category] = post.tags;
        return (
          <Reveal key={post.path} delay={index * 0.05}>
            <Link href={`/blog${post.path}`} className="group block">
              <article
                className={
                  compact
                    ? "mb-10 border-b border-border pb-10 last:border-0 last:pb-0"
                    : "mb-16"
                }
              >
                {category && (
                  <span className="mb-3 inline-block rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium tracking-wide text-blue-700 uppercase dark:text-blue-400">
                    {category}
                  </span>
                )}

                <h3
                  className={
                    compact
                      ? "font-display text-lg text-foreground transition-colors group-hover:text-muted-foreground md:text-xl"
                      : "font-display text-2xl text-foreground transition-colors group-hover:text-muted-foreground md:text-3xl"
                  }
                >
                  {post.title}
                </h3>

                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Guilherme Oliveira</span>
                  <span>·</span>
                  <span>{formatLongDate(post.date)}</span>
                  {post.readingMinutes && (
                    <>
                      <span>·</span>
                      <span>{post.readingMinutes} min de leitura</span>
                    </>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground">
                  <span>Leia mais</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </article>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
