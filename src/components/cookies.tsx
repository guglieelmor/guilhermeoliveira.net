"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DICTS, type Lang } from "@/lib/content";

export const OPEN_CONSENT_EVENT = "abrir-consentimento";

// O servidor já decide se o aviso aparece, então ele chega pintado no HTML, sem atraso.
export default function Cookies({ lang, initialOpen }: { lang: Lang; initialOpen: boolean }) {
  const t = DICTS[lang].consent;
  const router = useRouter();
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function decide(choice: "essenciais" | "todos") {
    document.cookie = `consentimento=${choice}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setOpen(false);
    // O layout lê o cookie e só então carrega (ou deixa de carregar) o Analytics.
    router.refresh();
  }

  if (!open) return null;

  return (
    <section className="aviso" role="region" aria-label={t.label}>
      <p>
        {t.text} <Link href="/privacidade">{t.more}</Link>.
      </p>
      <div className="aviso-acoes">
        <button type="button" className="botao botao-linha" onClick={() => decide("essenciais")}>
          {t.essential}
        </button>
        <button type="button" className="botao" onClick={() => decide("todos")}>
          {t.all}
        </button>
      </div>
    </section>
  );
}
