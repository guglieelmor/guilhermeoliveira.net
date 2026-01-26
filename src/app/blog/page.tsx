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
      <section>
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl text-black dark:text-zinc-300">
              Blog
            </h2>
            <p className="mx-auto max-w-2xl md:text-lg text-black dark:text-zinc-300">
              Aqui você irá encontrar artigos legitimamente escritos por mim,
              sem a adição de IA. Com opiniões e insights sobre desenvolvimento
              web, design e tecnologia.
            </p>
          </div>

          {dados.posts.map((post) => (
            <Link key={post.path} href={`blog${post.path}`}>
              <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
                <div
                  data-slot="card"
                  className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
                >
                  <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                    <div className="sm:col-span-12 mb-20">
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                          {post.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground md:mt-5">
                        {post.description}
                      </p>
                      <div className="mt-3 flex items-center space-x-4 text-sm md:mt-8">
                        <span className="text-muted-foreground">
                          Guilherme Oliveira
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {new Date(post.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="mt-6 flex items-center space-x-2 md:mt-8">
                        <span>Leia mais</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-arrow-right ml-2 size-4 transition-transform"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
