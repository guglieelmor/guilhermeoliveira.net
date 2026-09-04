import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/container";

const TITLE = "Privacidade e Cookies - Guilherme Oliveira";
const DESCRIPTION =
  "Como este site usa cookies e dados de acesso, e como você pode gerenciar isso.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacidade",
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

export default function Privacidade() {
  return (
    <Container className="max-w-3xl">
      <h1 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
        Privacidade e Cookies
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Este site é simples, e o uso de dados aqui também é. Esta página
        explica o que é coletado e como você pode controlar isso.
      </p>

      <div className="mt-14 flex flex-col gap-10">
        <section>
          <h2 className="font-display text-lg text-foreground">
            O que este site coleta
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Este site usa o <strong className="text-foreground">Google
            Analytics</strong> para entender, de forma agregada, quantas
            pessoas visitam as páginas e quais são mais acessadas. Para isso,
            o Google Analytics grava alguns cookies no seu navegador (como{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              _ga
            </code>{" "}
            e{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              _gid
            </code>
            ), que identificam seu navegador de forma anônima entre visitas.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Não há cookies de marketing, publicidade ou rastreamento
            entre sites — só a analítica descrita acima.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg text-foreground">
            Como gerenciar
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Ao visitar o site, um aviso permite aceitar ou recusar essa
            coleta; sua escolha fica salva no seu navegador. Você também pode
            bloquear cookies de analytics a qualquer momento diretamente nas
            configurações do seu navegador, ou usar o{" "}
            <Link
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
              target="_blank"
            >
              complemento de desativação do Google Analytics
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
