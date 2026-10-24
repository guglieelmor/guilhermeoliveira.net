import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // taste-skill-ignore: mono só em <pre>/<code>
import Script from "next/script";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cookies from "@/components/cookies";
import Reveal from "@/components/reveal";
import Favicon from "@/components/favicon";
import { PersonSchema } from "@/components/schema";
import { getPrefs } from "@/lib/prefs";
import { SITE } from "@/lib/profile";

// Geist variável (sem pesos fixos) para os controles do hero mexerem no eixo de peso.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" }); // taste-skill-ignore: mono só em <pre>/<code>

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getPrefs();
  return {
    metadataBase: new URL(SITE.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: t.lang === "en" ? "en_US" : "pt_BR",
      url: SITE.url,
      siteName: SITE.name,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang, theme, consent, t } = await getPrefs();

  return (
    <html
      lang={t.locale}
      data-theme={theme ?? undefined}
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Marca que há JS antes da primeira pintura: só então as entradas animadas escondem conteúdo. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <PersonSchema t={t} />
        <a className="pular" href="#conteudo">
          {t.nav.skip}
        </a>
        <Header lang={lang} theme={theme} />
        <div id="conteudo">{children}</div>
        <Footer t={t} />
        <Cookies lang={lang} initialOpen={consent === null} />
        <Reveal />
        <Favicon />
        {consent === "todos" && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
