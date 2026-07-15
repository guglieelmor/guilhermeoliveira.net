"use client";

import Header from "@/components/cv/header";
import Article from "./article";
import Divider from "./divider";

export default function Curriculum() {
  return (
    <section className="mx-auto max-w-4xl">
      <Header />
      <Divider />
      <Article />
    </section>
  );
}
