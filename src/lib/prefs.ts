import { cookies } from "next/headers";
import { DICTS, type Lang } from "./content";

// Preferências do visitante vivem em cookies, lidos no servidor para a página
// já chegar no idioma e no tema certos, sem piscar.
export type Theme = "claro" | "escuro" | null;
export type Consent = "essenciais" | "todos" | null;

export async function getPrefs() {
  const store = await cookies();
  const lang: Lang = store.get("lang")?.value === "en" ? "en" : "pt";
  const rawTheme = store.get("tema")?.value;
  const theme: Theme = rawTheme === "claro" || rawTheme === "escuro" ? rawTheme : null;
  const rawConsent = store.get("consentimento")?.value;
  const consent: Consent = rawConsent === "essenciais" || rawConsent === "todos" ? rawConsent : null;
  return { lang, theme, consent, t: DICTS[lang] };
}

export async function getDict() {
  return (await getPrefs()).t;
}
