// Gerado a partir dos certificados públicos em cursos.alura.com.br/user/guglieelmor (conferido em 3 nov. 2026).
// Cada curso aparece uma vez só; as formações apontam para os cursos que as compõem.

export type AluraCourse = { slug: string; title: string; hours: number; date: string; paths: string[] };
export type AluraPath = { id: string; name: string; certificate: string };

export const ALURA_PATHS: AluraPath[] = [
  { id: "vuejs", name: "Vue.js", certificate: "degree-vuejs-v188677-188677" },
  { id: "vuejs-2", name: "Vue.js 2", certificate: "degree-vuejs-305889" },
  { id: "typescript", name: "TypeScript", certificate: "degree-typescript-v309729-309729" },
  { id: "seo", name: "SEO", certificate: "degree-seo-685603" },
  { id: "itil", name: "Gestão da biblioteca de infraestrutura de TI", certificate: "degree-certificacao-itil-4-foundation-125217" },
  { id: "trafego-pago", name: "Tráfego Pago", certificate: "degree-trafego-pago-811695" },
  { id: "laravel", name: "Laravel", certificate: "degree-laravel-461900" },
  { id: "svelte", name: "Svelte", certificate: "degree-svelte-422767" },
  { id: "devops", name: "Começando em DevOps", certificate: "degree-primeiros-passos-devops-715314" },
];

export const ALURA_COURSES: AluraCourse[] = [
  { slug: "javascript-introducao", title: "JavaScript: explorando a linguagem", hours: 10, date: "2021-05-29", paths: [] },
  { slug: "otimizacao-performance-web", title: "Performance Web I: otimizando o front-end", hours: 20, date: "2021-05-30", paths: [] },
  { slug: "http-fundamentos", title: "HTTP: Entendendo a web por baixo dos panos", hours: 14, date: "2021-06-03", paths: [] },
  { slug: "git-github-controle-de-versao", title: "Git e Github: controle e compartilhe seu código", hours: 6, date: "2021-06-08", paths: [] },
  { slug: "linux-essentials-1", title: "Certificação Linux LPI Essentials parte 1: Evolution and Distributions", hours: 8, date: "2021-06-12", paths: [] },
  { slug: "amazon-ec2-disponibilidade-escalabilidade", title: "Deploy no Amazon EC2: alta disponibilidade e escalabilidade de uma aplicação", hours: 10, date: "2021-07-20", paths: [] },
  { slug: "arquitetura-css", title: "Arquitetura CSS: descomplicando os problemas", hours: 8, date: "2021-07-29", paths: [] },
  { slug: "laravel-produtividade-desenvolvimento-web", title: "Laravel parte 1: produtividade no desenvolvimento web", hours: 6, date: "2021-07-29", paths: [] },
  { slug: "jquery-a-biblioteca-do-mercado", title: "jQuery: domine a biblioteca mais popular do mercado parte 1", hours: 12, date: "2021-07-29", paths: [] },
  { slug: "css-grid-layout", title: "CSS Grid: simplificando layouts", hours: 8, date: "2021-08-09", paths: [] },
  { slug: "primeira-lideranca-aprendendo-liderar-pessoas", title: "Liderança: aprendendo sobre a missão e propósito de liderar pessoas", hours: 6, date: "2021-08-09", paths: [] },
  { slug: "email-marketing-responsivo-parte-2", title: "Email Marketing Responsivo parte 2: testando suas newsletters", hours: 6, date: "2021-08-14", paths: [] },
  { slug: "posicione-elementos-com-flexbox", title: "Flexbox: posicione elementos na tela", hours: 9, date: "2021-08-14", paths: [] },
  { slug: "seguranca-web-vulnerabilidades-do-seu-sistema", title: "Segurança Web: vulnerabilidades do seu sistema e OWASP", hours: 12, date: "2021-08-31", paths: [] },
  { slug: "fundamentos-ux-entendendo-experiencia-usuario", title: "UX: entenda a experiência de usuário", hours: 8, date: "2021-09-06", paths: [] },
  { slug: "vue-parte1", title: "Vue.js parte 1: construindo Single Page Applications", hours: 16, date: "2021-09-18", paths: ["vuejs-2", "vuejs"] },
  { slug: "vue-parte2", title: "Vue.js parte 2: construindo Single Page Applications", hours: 16, date: "2021-09-19", paths: ["vuejs-2", "vuejs"] },
  { slug: "vuejs-protegendo-recursos-com-autenticacao-e-vuex", title: "Vue.js: protegendo recursos com autenticação e VueX", hours: 8, date: "2021-09-23", paths: ["vuejs-2", "vuejs"] },
  { slug: "vuejs-testes-unitarios-automatizados-jest", title: "Vue.js: testes unitários automatizados com Jest", hours: 6, date: "2021-09-25", paths: ["vuejs-2", "vuejs"] },
  { slug: "ux-strategy", title: "UX Strategy: divergindo e afunilando ideias", hours: 12, date: "2021-11-29", paths: [] },
  { slug: "node-rest-api", title: "Rest com NodeJS: API com Express e MySQL", hours: 8, date: "2021-12-03", paths: [] },
  { slug: "flutter-crie-primeiro-app", title: "Flutter: criando um app", hours: 15, date: "2022-03-13", paths: [] },
  { slug: "chrome-devtools", title: "Chrome DevTools: analise, inspecione e depure suas páginas Web", hours: 9, date: "2022-05-16", paths: [] },
  { slug: "ux-usabilidade", title: "UX Usability: facilite a vida do seu usuário no mobile", hours: 10, date: "2022-05-17", paths: [] },
  { slug: "typescript-evoluindo-javascript", title: "TypeScript Part 1: Evolving Your JavaScript", hours: 10, date: "2022-05-18", paths: ["typescript"] },
  { slug: "typescript-avancando-linguagem", title: "TypeScript parte 2: avançando na linguagem", hours: 10, date: "2022-05-19", paths: ["typescript"] },
  { slug: "typescript-tecnicas-boas-praticas", title: "Typescript parte 3: mais técnicas e boas práticas", hours: 10, date: "2022-05-25", paths: ["typescript"] },
  { slug: "python-introducao-a-linguagem", title: "Python: começando com a linguagem", hours: 12, date: "2023-04-02", paths: [] },
  { slug: "python-3-avancando-na-linguagem", title: "Python: avançando na linguagem", hours: 12, date: "2023-04-07", paths: [] },
  { slug: "python-3-intro-orientacao-objetos", title: "Python: entendendo a Orientação a Objetos", hours: 12, date: "2023-04-07", paths: [] },
  { slug: "angular-explorando-framework", title: "Angular 14: aplique os conceitos e desenvolva seu primeiro CRUD", hours: 10, date: "2023-04-08", paths: [] },
  { slug: "angular-evoluindo-aplicacao", title: "Angular 14: evoluindo a aplicação", hours: 8, date: "2023-04-08", paths: [] },
  { slug: "laravel-criando-aplicacao-mvc", title: "Laravel: criando uma aplicação com MVC", hours: 8, date: "2023-05-07", paths: ["laravel"] },
  { slug: "laravel-formularios-sessoes-relacionamentos", title: "Laravel: validando formulários, usando sessões e definindo relacionamentos", hours: 8, date: "2023-05-07", paths: ["laravel"] },
  { slug: "tailwind-css-estilizando-pagina-classes-utilitarias", title: "Tailwind CSS: estilizando a sua página com classes utilitárias", hours: 8, date: "2023-05-08", paths: [] },
  { slug: "laravel-transacoes-service-container-autenticacao", title: "Laravel: transações, service container e autenticação", hours: 8, date: "2023-07-24", paths: ["laravel"] },
  { slug: "amazon-lightsail-descomplicando-nuvem", title: "Amazon Lightsail: descomplicando a nuvem", hours: 8, date: "2023-09-20", paths: [] },
  { slug: "amazon-vpc-configurando-redes-aws", title: "Amazon VPC: configurando redes na AWS", hours: 8, date: "2023-09-21", paths: [] },
  { slug: "seo-otimizacao-de-sites", title: "SEO: otimização de sites", hours: 8, date: "2024-01-29", paths: ["seo"] },
  { slug: "google-analytics-implementacao-relatorios", title: "Google Analytics 4: implementação e relatórios", hours: 10, date: "2024-01-30", paths: ["seo"] },
  { slug: "introducao-postgresql-primeiros-passos", title: "PostgreSQL", hours: 8, date: "2024-01-30", paths: [] },
  { slug: "seo-estrategias-ferramentas-aumento-conversoes", title: "SEO: dominando estratégias e ferramentas para aumento de conversões", hours: 6, date: "2024-01-30", paths: ["seo"] },
  { slug: "seo-plataformas-cms", title: "SEO: plataformas CMS", hours: 8, date: "2024-01-30", paths: ["seo"] },
  { slug: "next-js-iniciando-framework", title: "Next.js: explorando o framework", hours: 8, date: "2024-02-04", paths: [] },
  { slug: "simulado-certificacao-itil-4-foundation", title: "Avalie seus conhecimentos: simulado geral", hours: 6, date: "2024-02-07", paths: ["itil"] },
  { slug: "certificacao-itil-4-cadeia-valor-quatro-dimensoes", title: "Cadeia de valor de serviços: conhecendo as 4 dimensões", hours: 6, date: "2024-02-07", paths: ["itil"] },
  { slug: "certificacao-itil-4-conceitos-chave-gerenciamento-servicos", title: "Criação de valor: conhecendo os conceitos-chave para gerenciamento de serviços", hours: 8, date: "2024-02-07", paths: ["itil"] },
  { slug: "certificacao-itil-4-sistema-valores-servico", title: "Demandas de gerenciamento: apresentando o sistema de valores de serviço", hours: 8, date: "2024-02-07", paths: ["itil"] },
  { slug: "certificacao-itil-4-praticas-gerenciamento-servicos", title: "Práticas gerais: descobrindo as práticas de gerenciamento de serviços", hours: 14, date: "2024-02-07", paths: ["itil"] },
  { slug: "startupismo-comece-jeito-certo", title: "Startupismo: comece do jeito certo", hours: 6, date: "2024-02-26", paths: [] },
  { slug: "gestao-produtos-digitais-produto-vs-projeto", title: "Gestão de produtos digitais: Produto vs. Projeto", hours: 6, date: "2024-11-25", paths: [] },
  { slug: "introducao-growth-hacking", title: "Growth Hacking: crescimento para negócios digitais", hours: 8, date: "2024-11-28", paths: ["trafego-pago"] },
  { slug: "trafego-pago-estrategias-aplicacoes", title: "Tráfego pago: estratégias e aplicações", hours: 8, date: "2024-11-28", paths: ["trafego-pago"] },
  { slug: "laravel-e-mails-eventos-uploads-testes", title: "Laravel: e-mails, eventos assíncronos, uploads e testes", hours: 8, date: "2024-12-01", paths: ["laravel"] },
  { slug: "facebook-ads-crie-primeiras-campanhas", title: "Facebook Ads: criando campanhas de sucesso", hours: 8, date: "2024-12-08", paths: ["trafego-pago"] },
  { slug: "google-ads-criando-uma-campanha", title: "Google Ads: criando uma campanha", hours: 8, date: "2024-12-08", paths: ["trafego-pago"] },
  { slug: "linkedin-ads-crie-primeira-campanha", title: "LinkedIn Ads: criando uma campanha", hours: 8, date: "2024-12-09", paths: ["trafego-pago"] },
  { slug: "tiktok-ads-funcionalidades-configuracoes-campanhas", title: "TikTok Ads: funcionalidades e configurações para criar campanhas", hours: 8, date: "2024-12-09", paths: ["trafego-pago"] },
  { slug: "twitter-ads-primeiras-campanhas", title: "Twitter Ads: criando campanhas", hours: 8, date: "2024-12-09", paths: ["trafego-pago"] },
  { slug: "laravel-construindo-apis", title: "Laravel: construindo APIs", hours: 8, date: "2024-12-10", paths: ["laravel"] },
  { slug: "kubernetes-microsservicos-subindo-gerenciando-aplicacao", title: "Kubernetes com microsserviços: subindo e gerenciando uma aplicação", hours: 8, date: "2025-08-05", paths: [] },
  { slug: "react-criando-design-system-tailwind", title: "React: criando um Design System com TailwindCSS", hours: 12, date: "2025-08-05", paths: [] },
  { slug: "http-entendendo-web-por-baixo-dos-panos", title: "HTTP: entendendo a web por baixo dos panos", hours: 10, date: "2025-08-18", paths: [] },
  { slug: "svelte-typescript-conhecendo-compilador", title: "Svelte: diretivas e componentes com TypeScript", hours: 10, date: "2025-08-18", paths: ["svelte"] },
  { slug: "sveltekit-criando-spa", title: "SvelteKit: criando uma SPA", hours: 6, date: "2025-08-18", paths: ["svelte"] },
  { slug: "sveltekit-trabalhando-store", title: "SvelteKit: trabalhando com store", hours: 8, date: "2025-08-18", paths: ["svelte"] },
  { slug: "git-github-compartilhando-colaborando-projetos", title: "Git e GitHub: compartilhando e colaborando em projetos", hours: 8, date: "2026-01-07", paths: [] },
  { slug: "carreira-sre-boas-vindas", title: "Carreira SRE: Boas-vindas e primeiros passos", hours: 2, date: "2026-01-12", paths: [] },
  { slug: "devops-conceitos-comandos-scripts-linux-cli", title: "DevOps: explorando conceitos, comandos e scripts no Linux CLI", hours: 8, date: "2026-01-12", paths: ["devops"] },
  { slug: "devops-trabalhando-repositorios-github", title: "DevOps: trabalhando com repositórios no GitHub", hours: 8, date: "2026-01-12", paths: ["devops"] },
  { slug: "devops-trafego-seguro-comunicacoes-web", title: "DevOps: trabalhando com tráfego seguro em comunicações web", hours: 6, date: "2026-01-12", paths: ["devops"] },
  { slug: "git-github-dominando-controle-versao-codigo", title: "Git e GitHub: dominando controle de versão de código", hours: 8, date: "2026-01-12", paths: [] },
  { slug: "linux-onboarding-informacoes-sistema", title: "Linux Onboarding: obtendo e tratando informações do sistema", hours: 8, date: "2026-01-12", paths: [] },
  { slug: "linux-onboarding-usuarios-permissoes-dispositivos", title: "Linux Onboarding: trabalhe com usuários, permissões e dispositivos", hours: 8, date: "2026-01-12", paths: [] },
  { slug: "linux-gerenciando-diretorios-arquivos-permissoes-processos", title: "Linux: gerenciando diretórios, arquivos, permissões e processos", hours: 8, date: "2026-01-12", paths: [] },
  { slug: "shift-left-devops-otimizando-ciclo-desenvolvimento-software", title: "Shift Left e DevOps: otimizando o ciclo de desenvolvimento de software", hours: 2, date: "2026-01-12", paths: [] },
  { slug: "terminal-comandos-executar-tarefas", title: "Terminal: aprenda comandos para executar tarefas", hours: 10, date: "2026-01-12", paths: [] },
  { slug: "devops-construindo-gerindo-containers-docker", title: "DevOps: construindo e gerindo containers com o Docker", hours: 8, date: "2026-01-13", paths: ["devops"] },
  { slug: "entrega-continua-confiabilidade-qualidade", title: "Entrega Contínua: confiabilidade e qualidade na implantação de software", hours: 8, date: "2026-01-13", paths: [] },
  { slug: "github-actions-integrando-entregando-codigo-seguranca", title: "GitHub Actions: integrando e entregando código com segurança", hours: 8, date: "2026-01-13", paths: [] },
  { slug: "integracao-continua-pipeline-docker-github-actions", title: "Integração Contínua: Pipeline Docker no Github Actions", hours: 8, date: "2026-01-13", paths: [] },
  { slug: "integracao-continua-pipeline-entrega-implementacao-continua-ec2", title: "Integração Contínua: Pipeline de entrega e implementação contínua na EC2", hours: 8, date: "2026-01-13", paths: [] },
  { slug: "sre-entenda-confiabilidade-sistemas", title: "SRE: entenda a confiabilidade dos sistemas", hours: 8, date: "2026-01-13", paths: [] },
  { slug: "docker-criando-gerenciando-containers", title: "Docker: criando e gerenciando containers", hours: 10, date: "2026-01-22", paths: [] },
  { slug: "integracao-continua-rollback-teste-carga", title: "Integração Contínua: Rollback e teste de carga", hours: 8, date: "2026-01-22", paths: [] },
  { slug: "redes-projeto-vlans-politicas-acesso-conexao-internet", title: "Redes: construindo um projeto com VLANs, políticas de acesso e conexão com internet", hours: 8, date: "2026-01-25", paths: [] },
  { slug: "redes-conceitos-iniciais-criacao-intranet", title: "Redes: dos conceitos iniciais à criação de uma intranet", hours: 12, date: "2026-01-25", paths: [] },
  { slug: "computacao-fundamentos-computacao-pensamento-computacional", title: "Pensamento computacional: fundamentos da computação e lógica de programação", hours: 8, date: "2026-07-13", paths: [] },
  { slug: "python-ia-aplicada", title: "Python: Inteligência Artificial Aplicada", hours: 12, date: "2026-07-18", paths: [] },
];

// Exercícios resolvidos, como aparece no perfil (não há como derivar dos certificados).
export const ALURA_EXERCISES = 1928;

export const aluraYear = (c: AluraCourse) => Number(c.date.slice(0, 4));

export function pathCourses(id: string) {
  return ALURA_COURSES.filter((c) => c.paths.includes(id));
}

export function pathCertificate(p: AluraPath) {
  return `https://cursos.alura.com.br/user/guglieelmor/${p.certificate}/certificate`;
}
