# guilhermeoliveira.net

Site pessoal de Guilherme Oliveira — currículo, projetos e blog. Construído com [Next.js](https://nextjs.org) (App Router), [Tailwind CSS v4](https://tailwindcss.com) e [Motion](https://motion.dev).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** + [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography)
- **Motion** para animações
- **next-themes** para o toggle claro/escuro
- Posts do blog em Markdown, processados com `gray-matter` + `remark`

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build   # build de produção
npm run start   # sobe o build de produção
npm run lint    # eslint
```

## Estrutura

```
src/
  app/                  rotas (App Router): home, /blog, /sobre, [year]/[month]/[day]/[slug]
  components/
    home/                seções e efeitos visuais da home
    cv/                  currículo (usado em /sobre)
    blog/                listagem de posts
    layout/              navbar, footer, container
    ui/                  componentes de UI reutilizáveis
  lib/
    profile.ts           todos os dados de currículo (experiência, formação, skills, contato)
    nav-links.ts         links da navegação
    utils.ts             helpers de data/duração (períodos, tempo de casa por empresa)
public/
  _content/
    posts.json           índice dos posts do blog (título, data, tags, tempo de leitura)
    {ano}/{mes}/{dia}/{slug}/index.md   conteúdo de cada post
```

### Dados do currículo

Toda a informação de perfil, experiência, formação e skills vive em `src/lib/profile.ts`. Datas usam objetos `Date` reais — durações e "tempo até o momento" são calculados dinamicamente (`src/lib/utils.ts`), nunca digitados como texto fixo.

### Adicionando um post no blog

1. Crie uma pasta em `public/_content/{ano}/{mes}/{dia}/{slug}/` com um `index.md` (frontmatter: `title`, `date`, `slug`, `tags`).
2. Adicione uma entrada correspondente em `public/_content/posts.json` (`title`, `date`, `path`, `description`, `tags`, `readingMinutes`).

## Deploy

Hospedado na [Vercel](https://vercel.com). Qualquer push para `main` gera um novo deploy.
