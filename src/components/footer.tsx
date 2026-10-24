import Link from "next/link";
import type { Dict } from "@/lib/content";
import CookiePrefs from "./cookie-prefs";
import Wordmark from "./wordmark";

// O rodapé fecha com o apelido em letra gigante; as letras engordam perto do cursor, como no hero.
export default function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  return (
    <footer className="rodape">
      <div className="rodape-grade">
        <div className="rodape-sobre">
          <p>{f.line}</p>
          <p className="suave">{f.made}</p>
          <a href="#conteudo" className="rodape-topo">
            {f.top}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
        <nav aria-label={f.siteLabel}>
          <h2 className="rodape-rotulo">{f.siteLabel}</h2>
          <ul>
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="rodape-rotulo">{f.elsewhere}</h2>
          <ul>
            {t.contact.rows.map((r) => (
              <li key={r.label}>
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="rodape-rotulo">{f.legal}</h2>
          <ul>
            <li>
              <Link href="/privacidade">{f.privacy}</Link>
            </li>
            <li>
              <CookiePrefs label={f.cookies} />
            </li>
          </ul>
        </div>
      </div>

      <Wordmark text="Gulliver" />

      <div className="rodape-pe">
        <span>{f.rights(new Date().getFullYear())} Guilherme Oliveira</span>
      </div>
    </footer>
  );
}
