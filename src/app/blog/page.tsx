"use client";

import ListPosts from "@/components/blog/list-posts";
import Container from "@/components/layout/container";
export default function Blog() {
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
          <ListPosts />
        </div>
      </section>
    </Container>
  );
}
