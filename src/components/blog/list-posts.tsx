"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  title: string;
  date: string;
  path: string;
  description: string;
  tags: string[];
};

export default function ListPosts() {
  const [dados, setDados] = useState<{ posts: Post[] } | null>(null);

  useEffect(() => {
    fetch("/_content/posts.json")
      .then((res) => res.json())
      .then((data) => setDados(data));
  }, []);

  return (
    <>
      <div className="container">
        {dados?.posts?.length
          ? dados.posts
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .slice(0, 5)
              .map((post) => (
                <Link
                  key={post.path}
                  href={`/blog${post.path}`}
                  className="group block"
                >
                  <article className="text-start mb-20 group-hover:underline">
                    <div className="mb-3 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl text-black dark:text-zinc-300">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                      {post.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>Guilherme Oliveira</span>
                      <span>•</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-black dark:text-zinc-200">
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
              ))
          : "Nenhum post encontrado no momento."}
      </div>
    </>
  );
}
