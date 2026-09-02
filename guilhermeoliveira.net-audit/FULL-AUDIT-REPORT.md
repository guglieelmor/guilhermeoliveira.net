# Auditoria de SEO — guilhermeoliveira.net

**Data:** 01/09/2026
**Tipo de negócio:** Marca pessoal / portfólio com blog (perfil próximo de publisher)
**Nota de Saúde SEO: 43 / 100**

Metodologia: renderização ao vivo de `/`, `/blog`, `/sobre` e um post do blog, checagens HTTP diretas (robots.txt, sitemap.xml, manifest.json, www/apex, cadeia de redirects, headers de resposta) e leitura do código-fonte do repositório Next.js App Router (`src/app`, `src/lib/profile.ts`, `next.config.ts`) para confirmar causas raiz, não só sintomas. Não havia credenciais de API do Google configuradas neste ambiente, então dados de Core Web Vitals de campo/laboratório **não** foram medidos — sinalizado como Info, não estimado por adivinhação.

## Nota por Categoria

| Categoria | Nota | Peso |
|---|---|---|
| SEO Técnico | 35/100 | 22% |
| Qualidade de Conteúdo | 55/100 | 23% |
| SEO On-Page | 40/100 | 20% |
| Schema / Dados Estruturados | 0/100 | 10% |
| Performance (CWV) | 65/100 | 10% |
| Prontidão para Busca por IA | 40/100 | 10% |
| Imagens | 85/100 | 5% |

## Top 5 Problemas Críticos/Altos

1. **Sem robots.txt nem sitemap.xml** — ambos retornam 404. Não existe `src/app/robots.ts` nem `src/app/sitemap.ts` no repositório.
2. **www e raiz servem conteúdo idêntico, sem canonical, sem redirect** — `https://www.guilhermeoliveira.net/` e `https://guilhermeoliveira.net/` retornam 200 com o mesmo ETag. Duplicidade de conteúdo em nível de host.
3. **Home, /blog e /sobre compartilham o mesmo `<title>` e `<meta description>`** — porque as três rotas são Client Components sem export de metadata, herdando silenciosamente a metadata do layout raiz.
4. **Zero JSON-LD no site inteiro** — confirmado via extração de dados estruturados e grep no código-fonte, apesar de `src/lib/profile.ts` já ter dados de Person limpos e prontos para uso.
5. **O único post do blog está sem meta description** — `generateMetadata()` lê `data.description` do frontmatter do `index.md` do post, mas esse campo está ausente no arquivo (só existe no `posts.json`, que o template do post nunca lê).

## Top 5 Ganhos Rápidos

1. Adicionar `src/app/robots.ts` e `src/app/sitemap.ts` — poucas linhas usando a Metadata Files API do Next.js.
2. Adicionar `description:` no frontmatter `index.md` do post do blog.
3. Definir `metadataBase` no layout raiz + resolver a divisão www/apex — resolve canonical e risco de duplicidade de host juntos.
4. Adicionar JSON-LD de Person a partir dos dados já existentes em `profile.ts` — quase nenhum conteúdo novo a escrever, ganho direto em schema e citabilidade por IA.
5. Corrigir `lang="en"` → `lang="pt-BR"` no layout raiz — mudança de uma linha, sinal de idioma correto para todo o conteúdo em português.

---

## SEO Técnico — 35/100

**O que funciona:** HTTPS + HSTS forçados; http:// e o domínio sem www redirecionam corretamente (308) para o canônico `https://guilhermeoliveira.net/`; páginas pré-renderizadas estaticamente e em cache de borda na Vercel (`x-nextjs-prerender: 1`, `x-vercel-cache: HIT`); nenhum erro de console na renderização.

| Achado | Severidade | Evidência | Correção |
|---|---|---|---|
| robots.txt retorna 404 | Critical | `GET /robots.txt` → 404 (página 404 do Next.js); sem `src/app/robots.ts` | Adicionar `src/app/robots.ts` com diretiva `Sitemap:` |
| sitemap.xml retorna 404 | Critical | `GET /sitemap.xml` → 404; sem `src/app/sitemap.ts` | Adicionar `src/app/sitemap.ts` cobrindo `/`, `/blog`, `/sobre`, todos os posts |
| Duplicidade de host www/apex | Critical | Ambos os hosts retornam conteúdo idêntico (200), mesmo ETag; sem tag canonical em lugar nenhum | Redirecionar um host para o outro nas configurações de domínio da Vercel |
| manifest.json ausente | Low | `GET /manifest.json` → 404 | Adicionar `src/app/manifest.ts` |
| Sem headers de segurança além do HSTS | Low | Headers de resposta sem `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | Adicionar `headers()` em `next.config.ts` |

## SEO On-Page — 40/100

**O que funciona:** As páginas de post usam corretamente `generateMetadata()` para títulos únicos por post; um único H1 bem escrito por página; ordem semântica de headings consistente (H1 → H2 → H3).

| Achado | Severidade | Evidência | Correção |
|---|---|---|---|
| Título/descrição duplicados em `/`, `/blog`, `/sobre` | Critical | As três páginas renderizam exatamente o mesmo `<title>` e `<meta description>` | Dar a `/blog` e `/sobre` metadata própria (server component ou `layout.tsx` adjacente) |
| Post do blog sem meta description | High | `<head>` do post não tem `<meta name="description">`; frontmatter sem o campo | Adicionar `description:` no frontmatter do post |
| `lang="en"` em conteúdo português | Medium | Navegação, rodapé, página 404 e todos os posts estão em pt-BR; `layout.tsx` fixa `lang="en"` | Trocar para `lang="pt-BR"` |
| Nenhuma tag canonical em nenhuma página | High | Confirmado ausente nas 4 páginas amostradas | Definir `metadataBase`, emitir canonical por rota |

## Qualidade de Conteúdo — 55/100

**O que funciona:** Conteúdo genuinamente autoral, com diferencial claro ("sem a adição de IA"), um sinal forte de E-E-A-T/confiança; credenciais reais e específicas no texto (Tech Lead na Brudam, professor no IFSUL); o post amostrado é longo, estruturado e substancial — não é conteúdo raso.

| Achado | Severidade | Evidência | Correção |
|---|---|---|---|
| Listagem do blog não traz conteúdo no server-side | High | O HTML bruto de `/blog` contém literalmente "Nenhum post encontrado no momento." — o título do post nunca aparece no HTML renderizado no servidor, porque `ListPosts` busca `posts.json` no client via `useEffect` | Ler `posts.json` no servidor e passar como prop |
| Apenas um post publicado | Info | `posts.json` tem uma única entrada | Nota de estágio de crescimento, não um defeito |

## Schema / Dados Estruturados — 0/100

| Achado | Severidade | Evidência | Correção |
|---|---|---|---|
| Nenhum JSON-LD em lugar nenhum | High | `structured_data.block_count: 0` na home; confirmado por grep em `src/` | Adicionar JSON-LD de Person (home) e BlogPosting (posts) a partir dos dados já existentes em `profile.ts`. Não adicionar FAQPage — o Google aposentou os rich results de FAQ para todos os sites. |

## Performance (CWV) — 65/100 (estimativa estrutural, não medida)

Pré-renderização estática, cache de borda e imagens pequenas otimizadas apontam para uma boa base, mas não havia credenciais de PageSpeed/CrUX disponíveis neste ambiente para confirmar os números de LCP/INP/CLS. Trate essa nota como direcional; verifique manualmente em https://pagespeed.web.dev/ ou rode novamente com credenciais de API do Google configuradas.

## Prontidão para Busca por IA — 40/100

A postura explícita de autoria sem IA é um diferencial genuíno para engines de resposta de IA. A principal lacuna é a mesma do Schema: falta de dados estruturados de autor/Person para ancorar citações. `llms.txt` está ausente, mas é um item de baixa prioridade e sem benefício confirmado — não vale priorizar.

## Imagens — 85/100

`next/image` usado de forma consistente com texto alternativo significativo em quase todos os casos; um único `alt="image"` genérico em um componente reutilizável de hover (`direction-aware-hover.tsx:91`) é a única lacuna.

---

Veja `ACTION-PLAN.md` para o plano faseado e `audit-data.json` para o envelope estruturado (utilizável para gerar um relatório em PDF via `claude-seo run google_report.py`).
