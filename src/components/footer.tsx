import Link from "next/link";
import type { Dict } from "@/lib/content";
import CookiePrefs from "./cookie-prefs";

// Uma linha só: o convite já foi feito na página.
export default function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  return (
    <footer className="rodape">
      <p className="suave">{f.line}</p>
      <ul>
        {t.nav.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <p className="rodape-direita">
        <span className="suave">{f.rights(new Date().getFullYear())}</span>
        <Link href="/privacidade">{f.privacy}</Link>
        <CookiePrefs label={f.cookies} />
      </p>
      <p className="rodape-creditos suave">{f.credits}</p>
    </footer>
  );
}
