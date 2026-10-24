import type { Dict } from "@/lib/content";
import { CONTACT, SITE, STACK } from "@/lib/profile";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function PersonSchema({ t }: { t: Dict }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": `${SITE.url}/#person`,
            name: SITE.name,
            alternateName: SITE.handle,
            jobTitle: "Tech Lead",
            description: t.meta.description,
            url: SITE.url,
            image: SITE.avatar,
            sameAs: [CONTACT.linkedin, CONTACT.github, CONTACT.alura],
            worksFor: [
              { "@type": "Organization", name: "Brudam" },
              { "@type": "EducationalOrganization", name: "Instituto Federal Sul-rio-grandense (IFSUL)" },
            ],
            alumniOf: [
              { "@type": "EducationalOrganization", name: "Instituto Federal Sul-rio-grandense (IFSUL)" },
              { "@type": "EducationalOrganization", name: "Faculdade Alcance (FAAL)" },
            ],
            homeLocation: { "@type": "Place", name: "Rio Grande do Sul, Brasil" },
            knowsAbout: STACK,
            knowsLanguage: ["pt-BR", "en", "es"],
          },
          {
            "@type": "WebSite",
            "@id": `${SITE.url}/#website`,
            url: SITE.url,
            name: SITE.name,
            inLanguage: ["pt-BR", "en"],
            publisher: { "@id": `${SITE.url}/#person` },
          },
        ],
      }}
    />
  );
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}
