import type { Metadata } from "next";
import ListPosts from "@/components/blog/list-posts";
import Container from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/posts";

const TITLE = "Blog - Guilherme Oliveira";
const DESCRIPTION =
  "Artigos legitimamente escritos por mim, sem a adição de IA. Opiniões e insights sobre desenvolvimento web, design e tecnologia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <Container>
      <Reveal>
        <h1 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Artigos legitimamente escritos por mim, sem a adição de IA. Opiniões
          e insights sobre desenvolvimento web, design e tecnologia.
        </p>
      </Reveal>

      <div className="mt-14 mb-14 h-px bg-border" />

      <ListPosts posts={posts} />
    </Container>
  );
}
