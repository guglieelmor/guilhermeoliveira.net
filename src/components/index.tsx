"use client";

import Header from "@/components/cv/header";
import ListPosts from "./blog/list-posts";

export default function Index() {
  return (
    <section className="mx-auto max-w-4xl p-10">
      <Header></Header>

      <div className="my-8 h-px bg-black dark:bg-zinc-700">
        <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
      </div>

      <ListPosts></ListPosts>
    </section>
  );
}
