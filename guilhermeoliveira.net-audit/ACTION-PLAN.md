# Plano de Ação — guilhermeoliveira.net

Cada item traz a observação em que se baseia, do que depende/o que desbloqueia, como saber se falhou, e um indicador para acompanhar depois.

## Fase 1: Correções Críticas (Semana 1)

1. **Adicionar `src/app/robots.ts`**
   - Baseado em: `/robots.txt` retorna 404 atualmente — nenhuma diretiva de rastreamento existe.
   - Desbloqueia: descoberta do sitemap (o robots.txt deveria referenciá-lo).
   - Como saber se falhou: `curl -I https://guilhermeoliveira.net/robots.txt` ainda retorna 404 após o deploy.
   - Acompanhar: status do "robots.txt" no Search Console passa a fetched/válido em alguns dias após o próximo rastreamento.

2. **Adicionar `src/app/sitemap.ts`** (cobrindo `/`, `/blog`, `/sobre` e todos os posts a partir de `posts.json`)
   - Baseado em: `/sitemap.xml` retorna 404; não existe lista autoritativa de URLs.
   - Depende de: nada relacionado à Fase 2 — pode ir ao ar de forma independente lendo `posts.json` diretamente.
   - Como saber se falhou: `curl https://guilhermeoliveira.net/sitemap.xml` não retorna XML válido com todas as URLs conhecidas.
   - Acompanhar: relatório "Sitemaps" do Search Console mostra o arquivo descoberto e URLs indexadas.

3. **Resolver a duplicidade de host www vs raiz**
   - Baseado em: ambos os hosts retornam conteúdo idêntico (200) com o mesmo ETag; sem redirect entre eles.
   - Desbloqueia: a tag canonical (item 4) passar a ter sentido real, em vez de brigar contra uma duplicidade de host de fato.
   - Como saber se falhou: `curl -I https://www.guilhermeoliveira.net/` ainda retorna 200 (não um redirect 3xx) para o host escolhido.
   - Acompanhar: relatório de cobertura do Search Console para de mostrar "duplicada sem canonical selecionado pelo usuário" para o host não canônico.

4. **Definir `metadataBase` + tags canonical por rota**
   - Baseado em: nenhum `<link rel="canonical">` existe em lugar nenhum; `metadataBase` não definido no `layout.tsx`.
   - Depende de: item 3 (escolher primeiro o host canônico, depois apontar `metadataBase` para ele).
   - Como saber se falhou: view-source em qualquer rota ainda sem tag canonical.
   - Acompanhar: Inspeção de URL no Search Console mostra "Canonical declarado pelo usuário" batendo com "Canonical selecionado pelo Google".

5. **Metadata única para `/blog` e `/sobre`**
   - Baseado em: ambos herdam atualmente o título/descrição exatos da home (confirmado no `<head>` renderizado).
   - Como saber se falhou: view-source em `/blog` e `/sobre` ainda mostra "Guilherme Oliveira - Tech Lead | Software Engineer | Full Stack | SRE" literalmente.
   - Acompanhar: relatório de Performance do Search Console passa a mostrar impressões/CTR distintos por página, em vez de competirem pelo mesmo conjunto de consultas.

## Fase 2: Melhorias de Alto Impacto (Semanas 2-3)

6. **Adicionar `description:` no frontmatter do post do blog**
   - Baseado em: `generateMetadata()` lê `data.description` do `index.md`, que atualmente não tem esse campo (o texto só existe em `posts.json`, não usado pelo template).
   - Como saber se falhou: view-source no post ainda sem `<meta name="description">`.
   - Acompanhar: o snippet de busca do post no Google passa a mostrar a descrição pretendida, em vez de uma gerada automaticamente.

7. **Mover a listagem de posts do `/blog` para carregamento no servidor**
   - Baseado em: o HTML bruto de `/blog` contém atualmente "Nenhum post encontrado no momento." — nenhum conteúdo de post vai na resposta inicial.
   - Depende de: nada — refatoração direta de `ListPosts` para receber posts via prop, carregados com `fs` no `page.tsx` (já é um arquivo acessível via Node, por estar em `public/_content`).
   - Como saber se falhou: `curl https://guilhermeoliveira.net/blog | grep "Inteligência artificial"` ainda não retorna nada.
   - Acompanhar: `/blog` mostra os títulos dos posts visíveis em qualquer fetch HTTP bruto (não só num navegador com JS).

8. **Corrigir `lang="en"` → `lang="pt-BR"`**
   - Baseado em: `layout.tsx` fixa `lang="en"` enquanto todo o conteúdo visível é português.
   - Como saber se falhou: view-source `<html lang="...">` ainda diz `en`.
   - Acompanhar: sem métrica direta, mas elimina um sinal de descompasso de idioma que pode afetar a distribuição por localidade.

9. **Adicionar JSON-LD de Person (home) e BlogPosting (posts)**
   - Baseado em: `structured_data.block_count: 0` confirmado em todo o site; `profile.ts` já tem todos os campos necessários (name, role, links sameAs, worksFor).
   - Como saber se falhou: o Rich Results Test do Google não detecta dados estruturados na página.
   - Acompanhar: a seção "Aprimoramentos" do Search Console passa a reportar itens válidos de Person/Article.

## Fase 3: Conteúdo e Autoridade (Mês 2)

10. Adicionar metadata de Open Graph e Twitter Card em todo o site (atualmente ausente em todas as páginas amostradas — compartilhamentos no LinkedIn/X não mostram preview).
11. Adicionar `src/app/manifest.ts` (atualmente 404).
12. Adicionar headers de segurança via `next.config.ts` `headers()` (atualmente só HSTS está presente).
13. Continuar publicando — o blog tem um post no momento; é um item de volume/cadência, não um defeito, mas a autoridade temática cresce com mais posts.

## Fase 4: Monitoramento e Iteração (Contínuo)

14. Configurar o Google Search Console para o host canônico escolhido; enviar o novo sitemap.
15. Rodar `/seo audit` novamente após as correções da Fase 1–2 irem ao ar, para confirmar a melhora na nota.
16. Rodar o PageSpeed Insights manualmente (não havia credenciais de API disponíveis neste ambiente) para obter números reais de LCP/INP/CLS em vez da estimativa estrutural usada aqui.
