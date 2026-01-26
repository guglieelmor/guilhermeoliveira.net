"use client";

import Container from "@/components/layout/container";
import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  title: string;
  date: string;
  path: string;
  description: string;
  tags: string[];
};

export default function Blog() {
  const [dados, setDados] = useState<{ posts: Post[] } | null>(null);

  useEffect(() => {
    fetch("/_content/posts.json")
      .then((res) => res.json())
      .then((data) => setDados(data));
  }, []);

  if (!dados) return null;

  return (
    <Container>
      <section className="mx-auto text-start max-w-4xl p-10">
        <div>
          <div className="items-start flex flex-col gap-4">
            <h2 className="text-3xl font-bold md:text-4xl text-black dark:text-zinc-100">
              Blog
            </h2>
            <p className="md:text-lg text-zinc-700 dark:text-zinc-200">
              Aqui você irá encontrar artigos legitimamente escritos por mim,
              sem a adição de IA. Com opiniões e insights sobre desenvolvimento
              web, design e tecnologia.
            </p>
          </div>
          <div className="mb-13 my-8 h-px bg-black dark:bg-zinc-700">
            <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
          </div>
          <div className="container">
            {dados.posts
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
              ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
