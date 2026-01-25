"use client";

import { diffYearsAndMonths } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Curriculum() {
  const { years: yearsBrudam, months: monthsBrudam } = diffYearsAndMonths(
    new Date(2020, 1, 16),
    new Date(),
  );

  const { years: yearsBrudamFullStack, months: monthsBrudamFullStack } =
    diffYearsAndMonths(new Date(2020, 1, 16), new Date(2021, 12, 1));

  const { years: yearsBrudamTechLead, months: monthsBrudamTechLead } =
    diffYearsAndMonths(new Date(2021, 12, 1), new Date());

  const { years: yearsGuilmor, months: monthsGuilmor } = diffYearsAndMonths(
    new Date(2025, 8, 15),
    new Date(),
  );

  return (
    <section className="mx-auto max-w-4xl bg-white p-10 text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="flex items-start justify-between">
        <div>
          <div className="flex gap-5 items-center">
            <Image
              alt="image"
              className={"object-cover scale-[1.11] w-25 h-25 rounded-full"}
              width="100"
              height="100"
              src={`https://avatars.githubusercontent.com/u/52608353?v=5`}
            />
            <div>
              <h1 className="text-4xl font-extrabold leading-none tracking-tight">
                GUILHERME
                <br />
                OLIVEIRA
              </h1>
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                Tech Lead | Software Engineer | Full Stack | SRE
              </p>
            </div>
          </div>
        </div>
        <div className="text-right text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
          <p>
            <Link href="https://guilhermeoliveira.net/" target="_blank">
              guilhermeoliveira.net
            </Link>
          </p>
          <p>
            <Link href="https://github.com/guglieelmor" target="_blank">
              github.com/guglieelmor
            </Link>
          </p>
          <p>
            <Link
              href="https://www.linkedin.com/in/guglieelmor/"
              target="_blank"
            >
              linkedin.com/in/guglieelmor/
            </Link>
          </p>
        </div>
      </header>

      <div className="my-8 h-px bg-black dark:bg-zinc-700">
        <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
      </div>

      <section>
        <h2
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          className="mb-3 text-sm font-bold tracking-widest text-black dark:text-zinc-400"
        >
          RESUMO
        </h2>
        <p className="text-sm leading-relaxed text-gray-800 dark:text-zinc-200">
          Atuo como Tech Lead, conduzindo iniciativas técnicas estratégicas e
          garantindo a entrega de soluções robustas, escaláveis e alinhadas às
          necessidades do produto. Além de liderar equipes multidisciplinares e
          definir padrões de arquitetura, mantenho atuação hands-on,
          participando de decisões críticas e contribuindo diretamente no
          desenvolvimento, sempre promovendo boas práticas e a adoção de
          tecnologias modernas. Minha base técnica é fortalecida pela formação
          no Instituto Federal Sul-rio-grandense (IFSUL), onde concluí o Técnico
          em Informática com ênfase em programação e o curso superior de
          Tecnologia em Sistemas para Internet, obtendo uma base sólida em
          desenvolvimento full-stack, engenharia de software, integrações e
          análise de sistemas.
        </p>
      </section>

      <div className="my-8 h-px bg-black dark:bg-zinc-700">
        <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
      </div>

      <section>
        <h2
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          className="mb-3 text-sm font-bold tracking-widest text-black dark:text-zinc-400"
        >
          EXPERIÊNCIA PROFISSIONAL
        </h2>

        <li className="flex gap-4 mb-7">
          <Image
            src="/images/brudam.jpeg"
            alt="Brudam - Software TMS"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold leading-tight">
              Brudam - Software TMS
            </h3>

            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Tempo integral · {yearsBrudam} a {monthsBrudam} m
            </p>

            <div className="relative mt-4 pl-6">
              <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gray-300 dark:bg-zinc-600" />
              <div className="relative pb-8">
                <span className="absolute left-[-23px] top-[6px] h-[10px] w-[10px] rounded-full bg-gray-400 dark:bg-zinc-500" />

                <h4 className="font-semibold">Tech Lead</h4>

                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  dez de 2021 – o momento · {yearsBrudamTechLead} anos{" "}
                  {monthsBrudamTechLead} meses
                </p>

                <p className="text-xs text-gray-600 dark:text-zinc-400">
                  Porto Alegre, Rio Grande do Sul
                </p>

                <p className="mt-2 text-sm leading-relaxed">
                  Atuo como líder técnico e desenvolvedor em projetos
                  estratégicos de desenvolvimento de software, conduzindo
                  decisões arquiteturais e técnicas críticas, organizando as
                  tarefas da equipe e garantindo que as entregas estejam
                  alinhadas aos objetivos do produto.
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-500">◆</span>
                  JavaScript · Laravel · Node.js · Atendimento ao cliente ·
                  Amazon Web Services · Docker · Linux · MySQL · Scrum · Vue.js
                  · PHP · Análise de dados · Habilidades analíticas · MongoDB ·
                  TypeScript · JIRA · JQuery · Next.js · Servidor Linux · TDD ·
                  Otimização para mecanismos de busca (SEO) · Cloudflare · Nginx
                  · Redis · CSS3 · HTML5 · GitHub · Integração e entrega
                  contínuas (CI/CD) · AngularJS · Phalcon
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-[-23px] top-[6px] h-[10px] w-[10px] rounded-full bg-gray-400 dark:bg-zinc-500" />

                <h4 className="font-semibold">Full Stack Developer</h4>

                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  mar de 2020 – dez de 2021 · {yearsBrudamFullStack} ano{" "}
                  {monthsBrudamFullStack} meses
                </p>

                <p className="text-xs text-gray-600 dark:text-zinc-400">
                  Eldorado do Sul, Rio Grande do Sul, Brasil
                </p>

                <p className="mt-2 text-sm leading-relaxed">
                  Fui responsável pelo desenvolvimento de soluções completas,
                  atuando no front-end, no back-end e colaborando em tarefas de
                  ciência de dados.
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-500">◆</span>
                  PHP · Laravel · MySQL · JQuery · Vue.js · AngularJS · Phalcon
                </p>
              </div>
            </div>
          </div>
        </li>

        <li className="flex gap-4 mb-7">
          <Image
            src="/images/guilmor.jpg"
            alt="GUILMOR - Tecnologia, Desenvolvimento e Inovação"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold leading-tight">
              GUILMOR - Tecnologia, Desenvolvimento e Inovação
            </h3>

            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Tempo integral · {yearsGuilmor} a {monthsGuilmor} m
            </p>

            <div className="relative mt-4 pl-6">
              <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gray-300 dark:bg-zinc-600" />
              <div className="relative pb-8">
                <span className="absolute left-[-23px] top-[6px] h-[10px] w-[10px] rounded-full bg-gray-400 dark:bg-zinc-500" />

                <h4 className="font-semibold">Founder & Creator</h4>

                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  ago de 2025 – o momento · {yearsGuilmor} a {monthsGuilmor} m
                </p>

                <p className="text-xs text-gray-600 dark:text-zinc-400">
                  Curitiba, Paraná
                </p>

                <p className="mt-2 text-sm leading-relaxed">
                  Transformo necessidades de negócio em produtos digitais
                  eficientes e escaláveis. Trabalho como desenvolvedor
                  freelance, oferecendo apoio estratégico, visão técnica e
                  execução completa em projetos de software, desde a concepção
                  até a manutenção e evolução contínua das aplicações.
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-500">◆</span>
                  JavaScript · Laravel · Node.js · Atendimento ao cliente ·
                  Amazon Web Services · Docker · Linux · MySQL · Scrum · Vue.js
                  · PHP · Análise de dados · Habilidades analíticas · MongoDB ·
                  TypeScript · JIRA · JQuery · Next.js · Servidor Linux · TDD ·
                  Otimização para mecanismos de busca (SEO) · Cloudflare · Nginx
                  · Redis · CSS3 · HTML5 · GitHub · Integração e entrega
                  contínuas (CI/CD) · AngularJS · Phalcon · Svelte · Next.js ·
                  Node.js
                </p>
              </div>
            </div>
          </div>
        </li>
      </section>

      <div className="my-8 h-px bg-black dark:bg-zinc-700">
        <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
      </div>

      <section>
        <h2
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          className="mb-3 text-sm font-bold tracking-widest text-black dark:text-zinc-400"
        >
          FORMAÇÃO ACADÊMICA
        </h2>

        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <p className="font-semibold">
              IFSUL – Tecnologia em Sistemas para Internet
            </p>
            <p className="text-gray-600 dark:text-zinc-400">2020 – 2025</p>
            <p>
              Formação focada em desenvolvimento full-stack, arquitetura de
              sistemas, bancos de dados, redes, testes e manutenção de sistemas.
            </p>
          </div>

          <div>
            <p className="font-semibold">IFSUL – Técnico em Informática</p>
            <p className="text-gray-600 dark:text-zinc-400">2016 – 2019</p>
            <p>
              Formação prática em suporte técnico, programação, infraestrutura
              de TI e redes locais.
            </p>
          </div>
        </div>
      </section>

      <div className="my-8 h-px bg-black dark:bg-zinc-700">
        <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
      </div>

      <section>
        <h2
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          className="mb-3 text-sm font-bold tracking-widest text-black dark:text-zinc-400"
        >
          CURSOS
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Formação TypeScript</li>
          <li>Formação Vue.js</li>
          <li>Formação SEO</li>
          <li>Formação Tráfego Pago</li>
          <li>AWS Academy Cloud Foundations</li>
          <li>AWS Fundamentals: Going Cloud-Native</li>
          <li>Laravel: crie aplicações web em PHP</li>
          <li>Melhore sua experiência JavaScript com Svelte</li>
        </ul>
      </section>

      <div className="my-8 h-px bg-black dark:bg-zinc-700">
        <div className="h-1.5 w-10 bg-black dark:bg-zinc-700"> &nbsp;</div>
      </div>

      <section>
        <h2
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          className="mb-3 text-sm font-bold tracking-widest text-black dark:text-zinc-400"
        >
          PROJETOS
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>COMOBIS – Ecossistema SaaS para Corretores Imobiliários</li>
          <li>Projeto de Extensão: Automatic Fact Checker</li>
        </ul>
      </section>
    </section>
  );
}
