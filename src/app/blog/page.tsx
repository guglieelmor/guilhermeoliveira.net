import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/prefs";
import { getAllPosts } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDict();
  return {
    title: t.blogPage.metaTitle,
    description: t.blogPage.metaDescription,
    alternates: { canonical: "/blog" },
    openGraph: { title: t.blogPage.metaTitle, description: t.blogPage.metaDescription, url: "/blog", images: ["/opengraph-image"] },
    twitter: { title: t.blogPage.metaTitle, description: t.blogPage.metaDescription },
  };
}

export default async function Blog() {
  const t = await getDict();
  const posts = getAllPosts();

  return (
    <main className="pagina">
      <header className="pagina-topo">
        <h1>{t.blog.title}</h1>
        <p>{t.blog.text}</p>
      </header>

      {posts.length === 0 ? (
        <p>{t.blog.none}</p>
      ) : (
        <ul className="lista-posts">
          {posts.map((post) => (
            <li key={post.path}>
              <Link href={`/blog${post.path}`}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <p className="nota">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(t.locale, { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  {post.readingMinutes ? ` · ${t.blog.minutes(post.readingMinutes)}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
