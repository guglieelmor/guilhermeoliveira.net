import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Dict } from "@/lib/content";
import { getDict } from "@/lib/prefs";
import { getAllPosts, type PostMeta } from "@/lib/posts";

const PER_PAGE = 6;

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

// "?pagina=2" vira 2; qualquer coisa fora disso volta para a primeira página.
async function pageFrom(searchParams: Props["searchParams"]) {
  const raw = (await searchParams).pagina;
  const n = Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

const href = (n: number) => (n === 1 ? "/blog" : `/blog?pagina=${n}`);

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const t = await getDict();
  const page = await pageFrom(searchParams);
  const title = page === 1 ? t.blogPage.metaTitle : `${t.blogPage.pageTitle(page)} · ${t.blogPage.metaTitle}`;
  return {
    title,
    description: t.blogPage.metaDescription,
    alternates: { canonical: href(page) },
    openGraph: { title, description: t.blogPage.metaDescription, url: href(page), images: ["/opengraph-image"] },
    twitter: { title, description: t.blogPage.metaDescription },
  };
}

// Os títulos seguem "Assunto - complemento"; o assunto ganha destaque e o resto vira subtítulo.
function splitTitle(title: string) {
  const [main, ...rest] = title.split(" - ");
  return { main, sub: rest.join(" - ") };
}

function Meta({ post, t, month }: { post: PostMeta; t: Dict; month: "long" | "short" }) {
  return (
    <>
      <time dateTime={post.date}>
        {new Date(post.date).toLocaleDateString(t.locale, { day: "numeric", month, year: "numeric" })}
      </time>
      {post.readingMinutes ? ` · ${t.blog.minutes(post.readingMinutes)}` : ""}
    </>
  );
}

export default async function Blog({ searchParams }: Props) {
  const t = await getDict();
  const posts = getAllPosts();
  const page = await pageFrom(searchParams);
  const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  if (page > pages) notFound();

  const slice = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const [featured, ...rest] = page === 1 ? slice : [undefined, ...slice];

  return (
    <main className="pagina">
      <header className="pagina-topo blog-topo">
        <h1>{t.blog.title}</h1>
        <p>{t.blog.text}</p>
        <p className="nota">
          {t.blogPage.count(posts.length)}
          {pages > 1 ? ` · ${t.blogPage.page(page, pages)}` : ""}
        </p>
      </header>

      {posts.length === 0 ? (
        <p>{t.blog.none}</p>
      ) : (
        <>
          {featured && (
            <Link href={`/blog${featured.path}`} className="blog-destaque">
              <span className="blog-destaque-rotulo">{t.blogPage.latest}</span>
              <h2>{splitTitle(featured.title).main}</h2>
              <p className="blog-destaque-sub">{splitTitle(featured.title).sub}</p>
              <p className="blog-destaque-texto">{featured.description}</p>
              <p className="blog-destaque-meta">
                <Meta post={featured} t={t} month="long" />
              </p>
              <span className="blog-seta" aria-hidden="true">
                →
              </span>
            </Link>
          )}

          {rest.length > 0 && (
            <ul className="blog-lista">
              {rest.map((post) => {
                const { main, sub } = splitTitle(post!.title);
                return (
                  <li key={post!.path}>
                    <Link href={`/blog${post!.path}`}>
                      <p className="blog-lista-data">
                        <Meta post={post!} t={t} month="short" />
                      </p>
                      <div className="blog-lista-corpo">
                        <h2>{main}</h2>
                        {sub && <p className="blog-lista-sub">{sub}</p>}
                        <p className="blog-lista-texto">{post!.description}</p>
                        <p className="blog-tags">
                          {post!.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </p>
                      </div>
                      <span className="blog-seta" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {pages > 1 && (
            <nav className="paginacao" aria-label={t.blogPage.pages}>
              {page > 1 ? (
                <Link href={href(page - 1)} rel="prev" className="paginacao-passo">
                  ← {t.blogPage.newer}
                </Link>
              ) : (
                <span className="paginacao-passo" aria-hidden="true" />
              )}
              <ol>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <Link href={href(n)} aria-current={n === page ? "page" : undefined} aria-label={t.blogPage.pageTitle(n)}>
                      {n}
                    </Link>
                  </li>
                ))}
              </ol>
              {page < pages ? (
                <Link href={href(page + 1)} rel="next" className="paginacao-passo">
                  {t.blogPage.older} →
                </Link>
              ) : (
                <span className="paginacao-passo" aria-hidden="true" />
              )}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
