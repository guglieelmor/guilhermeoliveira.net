// Todo o texto do site, em português e inglês. Trocar de cliente começa por aqui.
import { CONTACT, STACK, TIMELINE, yearsSince } from "./profile";

export type Lang = "pt" | "en";

// Trecho do parágrafo de abertura; os objetos recebem marca-texto.
export type Seg = string | { mark: string; tone: 1 | 2 | 3 };

const brudamYears = yearsSince(TIMELINE.brudamStart);

const pt = {
  lang: "pt" as Lang,
  locale: "pt-BR",
  meta: {
    title: "Guilherme Oliveira · Tech Lead, professor e engenheiro",
    description:
      "Tech Lead na Brudam, software TMS para logística em Porto Alegre, e professor substituto no IFSUL Charqueadas. Currículo, projetos e um blog sobre engenharia de software.",
    ogAlt: "Guilherme Oliveira: lidero engenharia, formo engenheiros.",
  },
  nav: {
    skip: "Pular para o conteúdo",
    home: "Início",
    links: [
      { href: "/#trajetoria", label: "Trajetória" },
      { href: "/#terminal", label: "Terminal" },
      { href: "/blog", label: "Blog" },
      { href: "/sobre", label: "Currículo" },
    ],
    action: "Fale comigo",
    menu: "Menu",
    langSwitch: "English",
    langSwitchLabel: "Ver o site em inglês",
    themeLight: "Tema claro",
    themeDark: "Tema escuro",
    themeLightShort: "Claro",
    themeDarkShort: "Escuro",
    slashHint: "Aperte / em qualquer lugar para abrir o terminal",
    close: "Fechar",
  },
  hero: {
    lines: ["Lidero engenharia.", "Formo engenheiros."] as [string, string],
    sub: "Guilherme Oliveira, Tech Lead na Brudam, em Porto Alegre, e professor substituto no IFSUL Charqueadas.",
    weight: "Peso",
    spacing: "Espaço",
    caps: "Caixa alta",
    on: "sim",
    off: "não",
    size: "Tamanho",
    slant: "Inclinação",
    leading: "Entrelinha",
    align: "Alinhamento",
    alignLeft: "Esq.",
    alignCenter: "Centro",
    alignRight: "Dir.",
    wave: "Onda",
    paint: "Cor",
    paintInk: "Tinta",
    paintAccent: "Mostarda",
    paintOutline: "Contorno",
    shuffle: "Embaralhar",
    copy: "Copiar CSS",
    copied: "CSS copiado",
    reset: "Restaurar",
  },
  letter: {
    title: "Uma carta curta",
    paragraphs: [
      ["Oi, eu sou o Guilherme. No terminal e no GitHub, assino Gulliver."],
      [
        `Há ${brudamYears} anos trabalho na Brudam, que faz software TMS para transporte e logística dentro do Instituto Caldeira, em Porto Alegre. Entrei como desenvolvedor full stack e, desde dezembro de 2021, sou o Tech Lead: conduzo as decisões de arquitetura e organizo o trabalho do time.`,
      ],
      [
        "Em 2026 voltei ao IFSUL, onde me formei técnico e tecnólogo, agora ",
        { mark: "do outro lado da mesa", tone: 1 },
        ", como professor substituto no campus Charqueadas.",
      ],
      [
        "Gosto de sistemas que aguentam o dia a dia, de turmas que fazem perguntas difíceis e de textos escritos sem pressa. No blog aqui embaixo, escrevo sobre o que aprendo no trabalho e em sala.",
      ],
      ["Se você tem um projeto, uma vaga ou uma turma em mente, me escreva."],
    ] as Seg[][],
    sign: "Guilherme Oliveira",
    role: "Tech Lead · Professor · Full Stack",
  },
  work: {
    title: "Trajetória em commits",
    stackLabel: "stack",
    authorLine: "Author: Guilherme Oliveira <gulliver>",
    dateLabel: "Date:",
  },
  list: {
    title: "Formação e estudo",
    groups: { study: "Formação", certs: "Certificações", courses: "Cursos", langs: "Idiomas" },
    hours: (year: number) => `horas de cursos desde ${year}, fora a graduação`,
  },
  ask: {
    title: "Pergunte ao terminal",
    lead: "Ele conversa sozinho até você assumir. Clique na janela e digite um comando, ou escolha um aqui.",
    script: ["whoami", "stack", "aulas", "projetos", "trajetoria", "gato", "contato"],
    examples: ["whoami", "aulas", "projetos", "stack", "gato", "ajuda"],
    inputLabel: "Digite um comando",
    placeholder: "digite um comando",
    send: "Enviar",
    auto: "rodando sozinho",
    resume: "Voltar à demo",
    note: "Também vale trajetoria, blog, contato e limpar.",
    plateAlt:
      "Gravura de Grandville: Gulliver deitado e amarrado ao chão enquanto dezenas de liliputianos sobem nele com cordas e arcos.",
    plateCaption: "Gulliver em Lilliput, gravura de J. J. Grandville, 1838.",
  },
  terminal: {
    aulas: [
      "Técnico   Desenvolvimento de Aplicações",
      "Técnico   Construção de Páginas Web",
      "Técnico   Programação Orientada a Objetos",
      "Superior  Introdução à Informática",
      "Superior  Interfaces Gráficas",
      "Superior  Desenvolvimento Front-end",
      "Superior  Engenharia de Software",
      "Superior  Metodologia Científica",
    ],
    unknown: (cmd: string) => `comando não encontrado: ${cmd}. Tente ajuda.`,
    help: [
      "whoami       quem sou eu",
      "stack        com o que trabalho",
      "aulas        o que ensino no IFSUL",
      "trajetoria   onde trabalhei e estudei",
      "projetos     projetos paralelos",
      "blog         último post",
      "contato      onde me encontrar",
      "gato         o mascote",
      "limpar       limpa a tela",
    ],
    whoami: [
      "Guilherme Oliveira, Gulliver no terminal",
      `Tech Lead na Brudam há ${yearsSince(TIMELINE.techLeadStart)} anos, ${brudamYears} anos de casa`,
      "Professor substituto no IFSUL Charqueadas",
    ],
    stack: [STACK.slice(0, 7).join(" · "), STACK.slice(7, 12).join(" · "), STACK.slice(12).join(" · ")],
    trajetoria: [
      "2026–hoje   Professor substituto · IFSUL Charqueadas",
      "2021–hoje   Tech Lead · Brudam",
      "2020–2021   Full Stack Developer · Brudam",
      "2026        Pós em Arquitetura e Infraestrutura de TI · FAAL",
      "2020–2025   Tecnólogo em Sistemas para Internet · IFSUL",
      "2016–2019   Técnico em Informática · IFSUL",
    ],
    projetos: [
      "Guilmor: empresa que fundei, de agentes de IA e automação",
      "Comobis: SaaS com perfis e imóveis para corretores",
      "Automatic Fact Checker: checagem automática de informações",
    ],
    contato: [`LinkedIn  ${CONTACT.linkedinLabel}`, `GitHub    ${CONTACT.githubLabel}`],
    cat: ["miau. bora trabalhar juntos?"],
  },
  blog: {
    title: "Blog",
    text: "Artigos sobre engenharia de software, tecnologia e o que aprendo em sala.",
    readMore: "Ler o post",
    all: "Todos os posts",
    minutes: (n: number) => `${n} min de leitura`,
    none: "Nenhum post publicado ainda.",
  },
  faq: {
    title: "Perguntas frequentes",
    count: (n: number) => `${n} perguntas que costumam me fazer. Toque numa para abrir.`,
    items: [
      {
        q: "O que faz um Tech Lead na Brudam?",
        a: "Conduzo as decisões de arquitetura e as escolhas técnicas críticas do produto TMS, organizo as tarefas do time de desenvolvimento e acompanho cada entrega para que ela esteja alinhada aos objetivos do produto. Também sigo escrevendo código nos projetos estratégicos, do back-end à infraestrutura.",
      },
      {
        q: "O que é a Brudam?",
        a: "A Brudam é uma empresa de software TMS, sistema de gestão de transportes, voltada para transportadoras e operações de logística. Fica no Instituto Caldeira, em Porto Alegre. Trabalho lá desde março de 2020, primeiro como desenvolvedor full stack e, desde dezembro de 2021, como Tech Lead.",
      },
      {
        q: "Onde e o que você ensina?",
        a: "Sou professor substituto no IFSUL, campus Charqueadas, desde março de 2026. No ensino técnico, dou Desenvolvimento de Aplicações, Construção de Páginas Web e Programação Orientada a Objetos. No superior, Introdução à Informática, Interfaces Gráficas, Front-end, Engenharia de Software e Metodologia Científica.",
      },
      {
        q: "Qual é a sua formação?",
        a: "Sou técnico em Informática e tecnólogo em Sistemas para Internet, os dois pelo IFSUL, e pós-graduado em Arquitetura e Infraestrutura de TI pela Faculdade Alcance. Tenho ainda certificações da AWS Academy e formações da Alura em Laravel, Vue.js, TypeScript, SEO, DevOps e gestão de infraestrutura.",
      },
      {
        q: "Com que tecnologias você trabalha?",
        a: "No dia a dia, TypeScript, JavaScript, Next.js, Vue.js, Node.js, PHP e Laravel. Na infraestrutura, Docker, AWS, Linux, Nginx e Cloudflare. Nos dados, MySQL, MongoDB e Redis. Como prática, CI/CD, testes com TDD e SEO técnico, que aplico também neste site.",
      },
      {
        q: "Sobre o que você escreve no blog?",
        a: "Sobre engenharia de software, segurança, inteligência artificial e temas que aparecem em sala de aula, sempre com um olhar prático: o que muda para quem desenvolve e como aplicar no dia a dia. Os posts ficam em português, mesmo quando o resto do site está em inglês.",
      },
      {
        q: "Por que Gulliver?",
        a: "É o nome que uso no terminal, no GitHub e nas redes. As gravuras desta página vêm de As Viagens de Gulliver, ilustrado por J. J. Grandville em 1838, hoje em domínio público. O livro ainda deu à computação os termos big-endian e little-endian.",
      },
      {
        q: "Como posso falar com você?",
        a: "O melhor caminho é uma mensagem no LinkedIn, em linkedin.com/in/guglieelmor, contando o projeto, a vaga ou a turma que você tem em mente. Meu código e meus experimentos ficam públicos no GitHub, em github.com/guglieelmor.",
      },
    ],
  },
  contact: {
    title: "Contato",
    line1: "Projeto, vaga ou turma?",
    line2: "Vamos conversar.",
    topicLabel: "Assunto",
    topics: [
      { label: "Projeto", start: "Oi, Guilherme! Tenho um projeto e queria conversar com você sobre " },
      { label: "Vaga", start: "Oi, Guilherme! Tenho uma vaga que pode combinar com você: " },
      { label: "Turma ou palestra", start: "Oi, Guilherme! Queria te convidar para uma turma ou palestra sobre " },
      { label: "Só um oi", start: "Oi, Guilherme! Vi seu site e " },
    ],
    messageLabel: "Sua mensagem",
    placeholder: "Escolha um assunto acima ou escreva do zero.",
    submit: "Copiar e abrir o LinkedIn",
    note: "A mensagem é copiada e meu LinkedIn abre numa aba nova para você colar.",
    clock: "Agora em Porto Alegre",
    locale: "pt-BR",
    copied: "Mensagem copiada. Cole na conversa do LinkedIn.",
    rows: [
      { label: "LinkedIn", value: CONTACT.linkedinLabel, href: CONTACT.linkedin },
      { label: "GitHub", value: CONTACT.githubLabel, href: CONTACT.github },
      { label: "Alura", value: CONTACT.aluraLabel, href: CONTACT.alura },
    ],
  },
  footer: {
    line: "Site pessoal de Guilherme Oliveira, Tech Lead e professor.",
    made: "Feito no Rio Grande do Sul, com Next.js.",
    top: "Voltar ao topo",
    siteLabel: "Site",
    elsewhere: "Em outros lugares",
    legal: "Privacidade e cookies",
    privacy: "Privacidade",
    cookies: "Preferências de cookies",
    rights: (y: number) => `© ${y}`,
  },
  consent: {
    text: "Este site usa cookies do Google Analytics para entender, de forma agregada, como as páginas são lidas.",
    more: "Saiba mais",
    essential: "Só os essenciais",
    all: "Aceitar todos",
    label: "Aviso de cookies",
  },
  cv: {
    metaTitle: "Currículo · Guilherme Oliveira",
    metaDescription:
      "Currículo de Guilherme Oliveira: Tech Lead na Brudam, professor substituto no IFSUL e pós-graduado em Arquitetura e Infraestrutura de TI.",
    role: "Tech Lead · Software Engineer · Full Stack · SRE",
    location: "Rio Grande do Sul, Brasil",
    summaryTitle: "Resumo",
    summary:
      "Como Tech Lead na Brudam, lidero as decisões de arquitetura e a execução técnica de sistemas para o setor de transporte e logística, atuando de ponta a ponta, da concepção à implementação. Sou Tecnólogo em Sistemas para Internet pelo Instituto Federal Sul-rio-grandense, com pós-graduação em Arquitetura e Infraestrutura de TI, e transito entre back-end, front-end e ciência de dados. Também sou professor substituto no IFSUL, campus Charqueadas, formando novos desenvolvedores em disciplinas de engenharia e desenvolvimento de software.",
    experienceTitle: "Experiência",
    educationTitle: "Formação",
    skillsTitle: "Competências e idiomas",
    certsTitle: "Certificações",
    coursesTitle: "Cursos",
    projectsTitle: "Projetos",
    print: "Baixar currículo em PDF",
    now: "o momento",
    months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    duration: (y: number, m: number) =>
      `${y > 0 ? `${y} ano${y > 1 ? "s" : ""} ` : ""}${m} ${m === 1 ? "mês" : "meses"}`,
    of: "de",
    experience: [
      {
        id: "ifsul-professor",
        company: "IFSUL · Instituto Federal Sul-rio-grandense",
        image: "/images/ifsul.jpeg",
        role: "Professor Substituto",
        start: new Date(2026, 2, 1),
        end: null as Date | null,
        location: "Charqueadas, RS",
        description:
          "Docência no ensino técnico e superior em Tecnologia da Informação. No técnico, Desenvolvimento de Aplicações, Construção de Páginas Web e Programação Orientada a Objetos. No superior, Introdução à Informática, Desenvolvimento de Interfaces Gráficas, Desenvolvimento Front-end, Engenharia de Software e Metodologia da Pesquisa Científica.",
        tags: ["Docência", "Engenharia de Software", "Front-end", "POO"],
      },
      {
        id: "brudam-tech-lead",
        company: "Brudam · Software TMS",
        image: "/images/brudam.jpeg",
        role: "Tech Lead",
        start: new Date(2021, 11, 1),
        end: null as Date | null,
        location: "Instituto Caldeira, Porto Alegre",
        description:
          "Líder técnico e desenvolvedor em projetos estratégicos, conduzindo decisões arquiteturais e técnicas críticas, organizando as tarefas da equipe e garantindo que as entregas estejam alinhadas aos objetivos do produto para o setor de transporte e logística.",
        tags: ["Laravel", "Node.js", "AWS", "Docker", "Vue.js", "Next.js", "TypeScript", "MySQL", "Redis", "CI/CD"],
      },
      {
        id: "brudam-full-stack",
        company: "Brudam · Software TMS",
        image: "/images/brudam.jpeg",
        role: "Full Stack Developer",
        start: new Date(2020, 2, 1),
        end: new Date(2021, 11, 1) as Date | null,
        location: "Instituto Caldeira, Porto Alegre",
        description:
          "Desenvolvimento de soluções completas no front-end e no back-end, com colaboração em tarefas de ciência de dados. Participei da coordenação de novos projetos e da integração de sistemas multiplataforma, com foco em estratégia, performance e boa experiência para o usuário.",
        tags: ["PHP", "Laravel", "MySQL", "jQuery", "Vue.js", "AngularJS", "Phalcon"],
      },
    ],
    education: [
      {
        id: "faal-pos",
        school: "FAAL · Faculdade Alcance",
        image: "/images/faal.jpeg",
        degree: "Pós-graduação em Arquitetura e Infraestrutura de TI",
        start: new Date(2026, 2, 1),
        end: new Date(2026, 8, 1) as Date | null,
        yearOnly: false,
        description:
          "Especialização com foco em sistemas distribuídos, escalabilidade e boas práticas de engenharia de software.",
      },
      {
        id: "ifsul-tsi",
        school: "IFSUL · Instituto Federal Sul-rio-grandense",
        image: "/images/ifsul.jpeg",
        degree: "Tecnólogo em Sistemas para Internet",
        start: new Date(2020, 0, 1),
        end: new Date(2025, 6, 1) as Date | null,
        yearOnly: false,
        description:
          "Desenvolvimento full stack, arquitetura de sistemas, bancos de dados, redes, testes e manutenção de sistemas.",
      },
      {
        id: "ifsul-tecnico",
        school: "IFSUL · Instituto Federal Sul-rio-grandense",
        image: "/images/ifsul.jpeg",
        degree: "Técnico em Informática",
        start: new Date(2016, 0, 1),
        end: new Date(2019, 11, 1) as Date | null,
        yearOnly: true,
        description: "Suporte técnico, programação, infraestrutura de TI e redes locais.",
      },
    ],
    skillGroups: [
      { label: "Linguagens e frameworks", skills: ["TypeScript", "JavaScript", "Next.js", "Vue.js", "Node.js", "PHP", "Laravel"] },
      { label: "Infraestrutura e cloud", skills: ["Docker", "AWS", "Linux", "Nginx", "Cloudflare"] },
      { label: "Dados", skills: ["MySQL", "MongoDB", "Redis"] },
      { label: "Práticas", skills: ["CI/CD", "SEO", "Scrum", "TDD"] },
    ],
    languages: [
      { name: "Português", level: "nativo" },
      { name: "Inglês", level: "profissional" },
      { name: "Espanhol", level: "básico" },
    ],
    certifications: [
      "Formação Laravel: crie aplicações web em PHP",
      "Formação Gestão da biblioteca de infraestrutura de TI",
      "AWS Academy Graduate · AWS Academy Cloud Foundations",
      "Formação SEO",
      "Technical Support Fundamentals",
    ],
    courses: [
      "Formação Vue.js · 2021 (52h)",
      "Formação Vue.js 2 · 2021 (49h)",
      "Formação TypeScript · 2022 (31h)",
      "Formação SEO · 2024 (36h)",
      "Formação Gestão da biblioteca de infraestrutura de TI · 2024 (43h)",
      "Formação Tráfego Pago · 2024 (63h)",
      "Formação Laravel · 2024 (40h)",
      "Formação Svelte · 2025 (27h)",
      "Formação Começando em DevOps · 2026 (33h)",
      "AWS Academy Cloud Foundations · 2023",
      "AWS Fundamentals: Going Cloud-Native · 2021",
    ],
    projects: [
      {
        id: "guilmor",
        name: "Guilmor",
        role: "fundador",
        tag: "Empresa de tecnologia · Fundador",
        description:
          "Empresa que fundei para levar IA e automação a outras empresas: agentes de IA, automação de processos, sites, SaaS, aplicativos, integrações e painéis de dados, além de consultoria em segurança. Atende de forma remota em todo o Brasil.",
      },
      {
        id: "comobis",
        name: "Comobis",
        role: "projeto paralelo",
        tag: "SaaS · Mercado imobiliário",
        description:
          "Plataforma online que cria perfis para profissionais do mercado imobiliário. Cada corretor tem um endereço próprio no sistema, onde apresenta seus dados e imóveis.",
      },
      {
        id: "fact-checker",
        name: "Automatic Fact Checker",
        role: "projeto de extensão",
        tag: "Projeto de extensão",
        description:
          "Projeto de extensão acadêmica que desenvolve uma solução capaz de analisar automaticamente a veracidade de informações, ajudando a combater a desinformação em ambientes digitais.",
      },
    ],
  },
  blogPage: {
    metaTitle: "Blog · Guilherme Oliveira",
    metaDescription:
      "Artigos sobre engenharia de software, tecnologia e sala de aula, por Guilherme Oliveira.",
    title: "Blog",
    back: "Voltar para o blog",
    by: "Escrito por",
    profile: "Ver perfil no LinkedIn",
    more: "Continue lendo",
    langNote: "",
    notFound: "Post não encontrado.",
  },
  privacy: {
    metaTitle: "Privacidade · Guilherme Oliveira",
    metaDescription: "Como este site usa cookies e dados de acesso, e como você pode gerenciar isso.",
    title: "Privacidade e cookies",
    notice: "",
  },
  notFound: {
    title: "Esta página não existe",
    text: "O endereço pode ter mudado. A página inicial tem tudo o que este site oferece.",
    back: "Voltar para o início",
  },
};

export type Dict = typeof pt;

const en: Dict = {
  lang: "en",
  locale: "en-US",
  meta: {
    title: "Guilherme Oliveira · Tech Lead, teacher and engineer",
    description:
      "Tech Lead at Brudam, TMS logistics software in Porto Alegre, Brazil, and substitute professor at IFSUL Charqueadas. CV, projects and a blog on software engineering.",
    ogAlt: "Guilherme Oliveira: I lead engineering, I teach engineers.",
  },
  nav: {
    skip: "Skip to content",
    home: "Home",
    links: [
      { href: "/#trajetoria", label: "Career" },
      { href: "/#terminal", label: "Terminal" },
      { href: "/blog", label: "Blog" },
      { href: "/sobre", label: "CV" },
    ],
    action: "Get in touch",
    menu: "Menu",
    langSwitch: "Português",
    langSwitchLabel: "Ver o site em português",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    themeLightShort: "Light",
    themeDarkShort: "Dark",
    slashHint: "Press / anywhere to open the terminal",
    close: "Close",
  },
  hero: {
    lines: ["I lead engineering.", "I teach engineers."],
    sub: "Guilherme Oliveira, Tech Lead at Brudam in Porto Alegre and substitute professor at IFSUL Charqueadas, Brazil.",
    weight: "Weight",
    spacing: "Spacing",
    caps: "Capitals",
    on: "on",
    off: "off",
    size: "Size",
    slant: "Slant",
    leading: "Leading",
    align: "Alignment",
    alignLeft: "Left",
    alignCenter: "Centre",
    alignRight: "Right",
    wave: "Wave",
    paint: "Colour",
    paintInk: "Ink",
    paintAccent: "Mustard",
    paintOutline: "Outline",
    shuffle: "Shuffle",
    copy: "Copy CSS",
    copied: "CSS copied",
    reset: "Reset",
  },
  letter: {
    title: "A short letter",
    paragraphs: [
      ["Hi, I'm Guilherme. In the terminal and on GitHub, I sign as Gulliver."],
      [
        `For ${brudamYears} years I have worked at Brudam, which builds TMS software for transport and logistics from Instituto Caldeira in Porto Alegre. I joined as a full stack developer and, since December 2021, I have been the Tech Lead: I drive the architecture decisions and organise the team's work.`,
      ],
      [
        "In 2026 I went back to IFSUL, where I trained as a technician and graduated, this time ",
        { mark: "on the other side of the desk", tone: 1 },
        ", as a substitute professor at the Charqueadas campus.",
      ],
      [
        "I like systems that hold up day to day, classes that ask hard questions and writing done without hurry. On the blog below, I write about what I learn at work and in class.",
      ],
      ["If you have a project, a role or a class in mind, write to me."],
    ],
    sign: "Guilherme Oliveira",
    role: "Tech Lead · Professor · Full Stack",
  },
  work: {
    title: "A career in commits",
    stackLabel: "stack",
    authorLine: "Author: Guilherme Oliveira <gulliver>",
    dateLabel: "Date:",
  },
  list: {
    title: "Education and study",
    groups: { study: "Education", certs: "Certifications", courses: "Courses", langs: "Languages" },
    hours: (year: number) => `hours of courses since ${year}, on top of the degrees`,
  },
  ask: {
    title: "Ask the terminal",
    lead: "It talks to itself until you take over. Click the window and type a command, or pick one here.",
    script: ["whoami", "stack", "classes", "projects", "career", "cat", "contact"],
    examples: ["whoami", "classes", "projects", "stack", "cat", "help"],
    inputLabel: "Type a command",
    placeholder: "type a command",
    send: "Send",
    auto: "running on its own",
    resume: "Back to the demo",
    note: "Career, blog, contact and clear work too.",
    plateAlt:
      "Engraving by Grandville: Gulliver lies tied to the ground while dozens of Lilliputians climb over him with ropes and bows.",
    plateCaption: "Gulliver in Lilliput, engraving by J. J. Grandville, 1838.",
  },
  terminal: {
    aulas: [
      "Technical  Application Development",
      "Technical  Building Web Pages",
      "Technical  Object-Oriented Programming",
      "Degree     Introduction to Computing",
      "Degree     Graphical Interfaces",
      "Degree     Front-end Development",
      "Degree     Software Engineering",
      "Degree     Research Methods",
    ],
    unknown: (cmd: string) => `command not found: ${cmd}. Try help.`,
    help: [
      "whoami       who I am",
      "stack        what I work with",
      "classes      what I teach at IFSUL",
      "career       where I worked and studied",
      "projects     side projects",
      "blog         latest post",
      "contact      where to find me",
      "cat          the mascot",
      "clear        clears the screen",
    ],
    whoami: [
      "Guilherme Oliveira, Gulliver in the terminal",
      `Tech Lead at Brudam for ${yearsSince(TIMELINE.techLeadStart)} years, ${brudamYears} years at the company`,
      "Substitute professor at IFSUL Charqueadas",
    ],
    stack: pt.terminal.stack,
    trajetoria: [
      "2026–now    Substitute professor · IFSUL Charqueadas",
      "2021–now    Tech Lead · Brudam",
      "2020–2021   Full Stack Developer · Brudam",
      "2026        Postgrad, IT Architecture and Infrastructure · FAAL",
      "2020–2025   Internet Systems degree · IFSUL",
      "2016–2019   IT technician · IFSUL",
    ],
    projetos: [
      "Guilmor: the company I founded, AI agents and automation",
      "Comobis: SaaS with profiles and listings for real estate agents",
      "Automatic Fact Checker: automatic checking of information",
    ],
    contato: pt.terminal.contato,
    cat: ["meow. shall we work together?"],
  },
  blog: {
    title: "Blog",
    text: "Articles on software engineering, technology and what I learn in class. Posts are in Portuguese.",
    readMore: "Read the post",
    all: "All posts",
    minutes: (n: number) => `${n} min read`,
    none: "No posts published yet.",
  },
  faq: {
    title: "Questions",
    count: (n: number) => `${n} questions people often ask me. Tap one to open it.`,
    items: [
      {
        q: "What does a Tech Lead do at Brudam?",
        a: "I drive the architecture decisions and the critical technical choices for the TMS product, organise the development team's work and follow each delivery so it matches the product's goals. I also keep writing code on the strategic projects, from the back end to the infrastructure.",
      },
      {
        q: "What is Brudam?",
        a: "Brudam is a TMS software company, a transport management system for carriers and logistics operations. It is based at Instituto Caldeira in Porto Alegre, Brazil. I have worked there since March 2020, first as a full stack developer and, since December 2021, as Tech Lead.",
      },
      {
        q: "Where and what do you teach?",
        a: "I have been a substitute professor at IFSUL, Charqueadas campus, since March 2026. On the technical course I teach Application Development, Building Web Pages and Object-Oriented Programming. On the degree, Introduction to Computing, Graphical Interfaces, Front end, Software Engineering and Research Methods.",
      },
      {
        q: "What is your education?",
        a: "I am an IT technician and hold a degree in Internet Systems, both from IFSUL, plus a postgraduate degree in IT Architecture and Infrastructure from Faculdade Alcance. I also hold AWS Academy certificates and Alura tracks in Laravel, Vue.js, TypeScript, SEO, DevOps and infrastructure management.",
      },
      {
        q: "Which technologies do you use?",
        a: "Day to day, TypeScript, JavaScript, Next.js, Vue.js, Node.js, PHP and Laravel. For infrastructure, Docker, AWS, Linux, Nginx and Cloudflare. For data, MySQL, MongoDB and Redis. As practice, CI/CD, test-driven development and technical SEO, which this site applies too.",
      },
      {
        q: "What do you write about on the blog?",
        a: "Software engineering, security, artificial intelligence and topics that come up in class, always from a practical angle: what changes for developers and how to apply it day to day. The posts are in Portuguese, even when the rest of the site is shown in English.",
      },
      {
        q: "Why Gulliver?",
        a: "It is the name I use in the terminal, on GitHub and on social media. The engravings on this page come from Gulliver's Travels as illustrated by J. J. Grandville in 1838, now in the public domain. The book also gave computing the terms big-endian and little-endian.",
      },
      {
        q: "How can I reach you?",
        a: "The best way is a message on LinkedIn, at linkedin.com/in/guglieelmor, telling me about the project, the role or the class you have in mind. My code and experiments are public on GitHub, at github.com/guglieelmor.",
      },
    ],
  },
  contact: {
    title: "Contact",
    line1: "A project, a role or a class?",
    line2: "Let's talk.",
    topicLabel: "Topic",
    topics: [
      { label: "Project", start: "Hi Guilherme! I have a project and would like to talk to you about " },
      { label: "Role", start: "Hi Guilherme! I have a role that might suit you: " },
      { label: "Class or talk", start: "Hi Guilherme! I'd like to invite you to a class or talk about " },
      { label: "Just saying hi", start: "Hi Guilherme! I saw your site and " },
    ],
    messageLabel: "Your message",
    placeholder: "Pick a topic above or start from scratch.",
    submit: "Copy and open LinkedIn",
    note: "Your message is copied and my LinkedIn opens in a new tab for you to paste it.",
    clock: "Right now in Porto Alegre",
    locale: "en-GB",
    copied: "Message copied. Paste it into the LinkedIn chat.",
    rows: pt.contact.rows,
  },
  footer: {
    line: "Personal site of Guilherme Oliveira, Tech Lead and teacher.",
    made: "Made in Rio Grande do Sul, Brazil, with Next.js.",
    top: "Back to top",
    siteLabel: "Site",
    elsewhere: "Elsewhere",
    legal: "Privacy and cookies",
    privacy: "Privacy",
    cookies: "Cookie preferences",
    rights: (y: number) => `© ${y}`,
  },
  consent: {
    text: "This site uses Google Analytics cookies to understand, in aggregate, how its pages are read.",
    more: "Learn more",
    essential: "Essential only",
    all: "Accept all",
    label: "Cookie notice",
  },
  cv: {
    ...pt.cv,
    metaTitle: "CV · Guilherme Oliveira",
    metaDescription:
      "CV of Guilherme Oliveira: Tech Lead at Brudam, substitute professor at IFSUL and postgraduate in IT Architecture and Infrastructure.",
    location: "Rio Grande do Sul, Brazil",
    summaryTitle: "Summary",
    summary:
      "As Tech Lead at Brudam, I lead architecture decisions and the technical delivery of systems for the transport and logistics sector, end to end, from conception to implementation. I hold a degree in Internet Systems from the Instituto Federal Sul-rio-grandense and a postgraduate degree in IT Architecture and Infrastructure, and I work across back end, front end and data science. I am also a substitute professor at IFSUL, Charqueadas campus, training new developers in software engineering and development courses.",
    experienceTitle: "Experience",
    educationTitle: "Education",
    skillsTitle: "Skills and languages",
    certsTitle: "Certifications",
    coursesTitle: "Courses",
    projectsTitle: "Projects",
    print: "Download CV as PDF",
    now: "present",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    duration: (y: number, m: number) =>
      `${y > 0 ? `${y} yr${y > 1 ? "s" : ""} ` : ""}${m} mo${m === 1 ? "" : "s"}`,
    of: "",
    experience: [
      {
        ...pt.cv.experience[0],
        role: "Substitute Professor",
        description:
          "Teaching technical and degree courses in Information Technology. On the technical course, Application Development, Building Web Pages and Object-Oriented Programming. On the degree, Introduction to Computing, Graphical Interface Development, Front-end Development, Software Engineering and Research Methods.",
        tags: ["Teaching", "Software Engineering", "Front end", "OOP"],
      },
      {
        ...pt.cv.experience[1],
        description:
          "Technical lead and developer on strategic projects, driving critical architecture and technical decisions, organising the team's work and making sure deliveries match the product's goals for the transport and logistics sector.",
      },
      {
        ...pt.cv.experience[2],
        description:
          "Built complete solutions across front end and back end, and collaborated on data science work. Helped coordinate new projects and integrate multi-platform systems, focused on strategy, performance and a good user experience.",
      },
    ],
    education: [
      {
        ...pt.cv.education[0],
        degree: "Postgraduate degree in IT Architecture and Infrastructure",
        description:
          "Specialisation focused on distributed systems, scalability and good software engineering practice.",
      },
      {
        ...pt.cv.education[1],
        degree: "Degree in Internet Systems",
        description:
          "Full stack development, systems architecture, databases, networks, testing and systems maintenance.",
      },
      {
        ...pt.cv.education[2],
        degree: "IT Technician",
        description: "Technical support, programming, IT infrastructure and local networks.",
      },
    ],
    skillGroups: [
      { label: "Languages and frameworks", skills: pt.cv.skillGroups[0].skills },
      { label: "Infrastructure and cloud", skills: pt.cv.skillGroups[1].skills },
      { label: "Data", skills: pt.cv.skillGroups[2].skills },
      { label: "Practices", skills: pt.cv.skillGroups[3].skills },
    ],
    languages: [
      { name: "Portuguese", level: "native" },
      { name: "English", level: "professional working" },
      { name: "Spanish", level: "elementary" },
    ],
    projects: [
      {
        ...pt.cv.projects[0],
        role: "founder",
        tag: "Technology company · Founder",
        description:
          "The company I founded to bring AI and automation to other businesses: AI agents, process automation, websites, SaaS, apps, integrations and data dashboards, plus security consulting. It works remotely across Brazil.",
      },
      {
        ...pt.cv.projects[1],
        role: "side project",
        tag: "SaaS · Real estate",
        description:
          "Online platform that creates profiles for real estate professionals. Each agent gets their own address in the system to present their details and listings.",
      },
      {
        ...pt.cv.projects[2],
        role: "extension project",
        tag: "Extension project",
        description:
          "Academic extension project building a tool that automatically checks whether information is true, helping fight misinformation online.",
      },
    ],
  },
  blogPage: {
    metaTitle: "Blog · Guilherme Oliveira",
    metaDescription:
      "Articles on software engineering, technology and teaching, by Guilherme Oliveira. Posts in Portuguese.",
    title: "Blog",
    back: "Back to the blog",
    by: "Written by",
    profile: "See LinkedIn profile",
    more: "Keep reading",
    langNote: "This post is written in Portuguese.",
    notFound: "Post not found.",
  },
  privacy: {
    metaTitle: "Privacy · Guilherme Oliveira",
    metaDescription: "How this site uses cookies and visit data, and how you can manage it.",
    title: "Privacy and cookies",
    notice: "This policy is published in Portuguese only. In short: the site uses Google Analytics cookies only if you accept them.",
  },
  notFound: {
    title: "This page does not exist",
    text: "The address may have changed. The home page has everything this site offers.",
    back: "Back to the home page",
  },
};

export const DICTS: Record<Lang, Dict> = { pt, en };

export function formatPeriod(t: Dict, start: Date, end: Date | null) {
  const now = new Date();
  const e = end ?? now;
  let years = e.getFullYear() - start.getFullYear();
  let months = e.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  const label = (d: Date) => `${t.cv.months[d.getMonth()]}${t.cv.of ? ` ${t.cv.of}` : ""} ${d.getFullYear()}`;
  return `${label(start)} – ${end ? label(end) : t.cv.now} · ${t.cv.duration(years, months)}`;
}

export function formatEducationPeriod(t: Dict, start: Date, end: Date | null, yearOnly: boolean) {
  if (yearOnly) return `${start.getFullYear()} – ${end ? end.getFullYear() : t.cv.now}`;
  const label = (d: Date) => `${t.cv.months[d.getMonth()]}${t.cv.of ? ` ${t.cv.of}` : ""} ${d.getFullYear()}`;
  return `${label(start)} – ${end ? label(end) : t.cv.now}`;
}
