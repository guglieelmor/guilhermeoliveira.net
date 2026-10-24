import Link from "next/link";
import { getDict } from "@/lib/prefs";

export default async function NotFound() {
  const t = await getDict();
  return (
    <main className="nao-encontrado">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <div>
        <Link href="/" className="botao">
          {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}
