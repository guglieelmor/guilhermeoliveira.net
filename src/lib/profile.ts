// Fatos que não mudam com o idioma: datas, links e nomes próprios.
// Datas são objetos Date reais; durações são calculadas, nunca digitadas.

export const SITE = {
  url: "https://guilhermeoliveira.net",
  name: "Guilherme Oliveira",
  handle: "Gulliver",
  avatar: "https://avatars.githubusercontent.com/u/52608353?v=5",
  gaId: "G-JTP5KZ6L2C",
};

export const CONTACT = {
  email: "contato@guilmor.com",
  linkedin: "https://www.linkedin.com/in/guglieelmor/",
  linkedinLabel: "linkedin.com/in/guglieelmor",
  github: "https://github.com/guglieelmor",
  githubLabel: "github.com/guglieelmor",
  alura: "https://cursos.alura.com.br/user/guglieelmor",
  aluraLabel: "cursos.alura.com.br/user/guglieelmor",
};

export const TIMELINE = {
  brudamStart: new Date(2020, 2, 1),
  techLeadStart: new Date(2021, 11, 1),
  ifsulTeachingStart: new Date(2026, 2, 1),
};

export const STACK = [
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Vue.js",
  "Node.js",
  "PHP",
  "Laravel",
  "Docker",
  "AWS",
  "Linux",
  "Nginx",
  "Cloudflare",
  "MySQL",
  "MongoDB",
  "Redis",
  "CI/CD",
  "TDD",
  "SEO",
];

export function yearsSince(start: Date, now = new Date()) {
  let years = now.getFullYear() - start.getFullYear();
  if (
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())
  ) {
    years--;
  }
  return years;
}

export function diffYearsAndMonths(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (end.getDate() < start.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months };
}
