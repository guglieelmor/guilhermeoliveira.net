import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-5xl leading-tight text-foreground md:text-7xl">
        404
      </h1>
      <p className="mt-8 font-display text-sm leading-loose text-foreground md:text-base">
        Falta alguma coisa.
      </p>
      <p className="mt-4 max-w-md text-muted-foreground">
        Desculpe, não conseguimos encontrar essa página. Você encontrará muito
        para explorar na página inicial.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
