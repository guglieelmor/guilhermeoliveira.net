"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

type Post = {
  title: string;
  date: string;
  path: string;
  description: string;
  tags: string[];
};

export default function ListPosts({
  limit = 5,
  compact = false,
}: {
  limit?: number;
  compact?: boolean;
}) {
  const [dados, setDados] = useState<{ posts: Post[] } | null>(null);

  useEffect(() => {
    fetch("/_content/posts.json")
      .then((res) => res.json())
      .then((data) => setDados(data));
  }, []);

  const posts = dados?.posts
    ?.slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (!posts?.length) {
    return (
      <p className="text-muted-foreground">
        Nenhum post encontrado no momento.
      </p>
    );
  }

  return (
    <div>
      {posts.map((post, index) => (
        <Reveal key={post.path} delay={index * 0.05}>
          <Link href={`/blog${post.path}`} className="group block">
            <article
              className={compact ? "mb-10 border-b border-black/5 pb-10 last:border-0 last:pb-0 dark:border-white/5" : "mb-16"}
            >
              <div className="mb-3 flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <h3
                className={
                  compact
                    ? "font-display text-xs leading-relaxed text-foreground transition-colors group-hover:text-violet-500 dark:group-hover:text-violet-400 md:text-sm"
                    : "font-display text-sm leading-relaxed text-foreground transition-colors group-hover:text-violet-500 dark:group-hover:text-violet-400 md:text-base lg:text-lg"
                }
              >
                {post.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {post.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Guilherme Oliveira</span>
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
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
      ))}
    </div>
  );
}
