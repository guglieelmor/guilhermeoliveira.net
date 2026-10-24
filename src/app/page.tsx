import Ask from "@/components/ask";
import Faq from "@/components/faq";
import Hero from "@/components/hero";
import { FaqSchema } from "@/components/schema";
import { Blog, Contact, Gulliver } from "@/components/sections";
import Letter from "@/components/letter";
import Faixa from "@/components/faixa";
import Study from "@/components/study";
import Trajetoria from "@/components/trajetoria";
import { getDict } from "@/lib/prefs";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const t = await getDict();
  const posts = getAllPosts();
  const latest = posts[0] ? { title: posts[0].title, href: `/blog${posts[0].path}` } : null;

  return (
    <main>
      <FaqSchema items={t.faq.items} />
      <Hero lang={t.lang} />
      <Letter lang={t.lang} />
      <Faixa />
      <Trajetoria lang={t.lang} />
      <Study lang={t.lang} />
      <Gulliver t={t} />
      <Ask lang={t.lang} latestPost={latest} />
      <Blog t={t} posts={posts} />
      <Faq lang={t.lang} />
      <Contact t={t} />
    </main>
  );
}
