import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/prefs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDict();
  return {
    title: t.privacy.metaTitle,
    description: t.privacy.metaDescription,
    alternates: { canonical: "/privacidade" },
    openGraph: { title: t.privacy.metaTitle, description: t.privacy.metaDescription, url: "/privacidade", images: ["/opengraph-image"] },
    twitter: { title: t.privacy.metaTitle, description: t.privacy.metaDescription },
  };
}

export default async function Privacidade() {
  const t = await getDict();
  return (
    <main className="pagina">
      <header className="pagina-topo">
        <h1>{t.privacy.title}</h1>
        {t.privacy.notice && <p lang="en">{t.privacy.notice}</p>}
      </header>
      <div className="prosa" lang="pt-BR">
      <p>
        Este site é simples, e o uso de dados aqui também é. Esta página
        explica o que é coletado e como você pode controlar isso.
      </p>

      <div>
        <section>
          <h2>
            O que este site coleta
          </h2>
          <p>
            Este site usa o <strong>Google
            Analytics</strong> para entender, de forma agregada, quantas
            pessoas visitam as páginas e quais são mais acessadas. Para isso,
            o Google Analytics grava alguns cookies no seu navegador (como{" "}
            <code>
              _ga
            </code>{" "}
            e{" "}
            <code>
              _gid
            </code>
            ), que identificam seu navegador de forma anônima entre visitas.
          </p>
          <p>
            Não há cookies de marketing, publicidade ou rastreamento
            entre sites — só a analítica descrita acima.
          </p>
        </section>

        <section>
          <h2>
            Como gerenciar
          </h2>
          <p>
            Ao visitar o site, um aviso permite aceitar ou recusar essa
            coleta; sua escolha fica salva no seu navegador. Você também pode
            bloquear cookies de analytics a qualquer momento diretamente nas
            configurações do seu navegador, ou usar o{" "}
            <Link
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
            >
              complemento de desativação do Google Analytics
            </Link>
            .
          </p>
        </section>
      </div>
      </div>
    </main>
  );
}
