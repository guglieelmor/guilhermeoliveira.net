// Dados públicos do GitHub, buscados no servidor e guardados em cache por uma hora.
// Sem token, a API permite 60 requisições por hora; com GITHUB_TOKEN no ambiente, o limite sobe.

export const GITHUB_USER = "guglieelmor";

const HOUR = 3600;

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GithubDay = { date: string; level: number; count: number };

export type GithubData = {
  repos: number;
  followers: number;
  since: number;
  languages: { name: string; count: number }[];
  recent: GithubRepo[];
  contributions: { total: number; weeks: GithubDay[][] } | null;
};

type ApiUser = { public_repos: number; followers: number; created_at: string };
type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

async function api<T>(path: string): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: HOUR } });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

// O calendário de contribuições não está na API REST; a página pública dele é um HTML simples.
async function contributions(): Promise<GithubData["contributions"]> {
  const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
    headers: { Accept: "text/html" },
    next: { revalidate: HOUR },
  });
  if (!res.ok) return null;
  const html = await res.text();

  const counts = new Map<string, number>();
  for (const m of html.matchAll(/for="(contribution-day-component-\d+-\d+)"[^>]*>(\d+) contributions?/g)) {
    counts.set(m[1], Number(m[2]));
  }
  const days: GithubDay[] = [];
  for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"\s+id="(contribution-day-component-\d+-\d+)"\s+data-level="([0-4])"/g)) {
    days.push({ date: m[1], level: Number(m[3]), count: counts.get(m[2]) ?? 0 });
  }
  if (days.length === 0) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Agrupa em semanas que começam no domingo, como o calendário do GitHub.
  const weeks: GithubDay[][] = [];
  for (const day of days) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (weekday === 0 || weeks.length === 0) weeks.push([]);
    weeks[weeks.length - 1].push(day);
  }
  const heading = html.match(/([\d,.]+)\s+contributions?\s+in the last year/);
  const total = heading ? Number(heading[1].replace(/[,.]/g, "")) : days.reduce((n, d) => n + d.count, 0);
  return { total, weeks };
}

export async function getGithub(): Promise<GithubData | null> {
  try {
    const [user, repos, contrib] = await Promise.all([
      api<ApiUser>(`/users/${GITHUB_USER}`),
      api<ApiRepo[]>(`/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`),
      contributions().catch(() => null),
    ]);
    // Forks, arquivados e o repositório do README do perfil não contam como projetos.
    const own = repos.filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== GITHUB_USER);

    const byLanguage = new Map<string, number>();
    for (const r of own) if (r.language) byLanguage.set(r.language, (byLanguage.get(r.language) ?? 0) + 1);
    const languages = [...byLanguage]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    const recent = own
      .slice()
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      }));

    return {
      repos: user.public_repos,
      followers: user.followers,
      since: new Date(user.created_at).getFullYear(),
      languages,
      recent,
      contributions: contrib,
    };
  } catch {
    return null;
  }
}
