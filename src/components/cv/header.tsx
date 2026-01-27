"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex lg:flex-row flex-col items-start justify-between">
        <div>
          <div className="flex gap-5 items-center">
            <Image
              alt="image"
              className={
                "object-cover scale-[1.11] w-20 h-20 rounded-full border border-zinc-700 dark:border-zinc-300"
              }
              width="100"
              height="100"
              src={`https://avatars.githubusercontent.com/u/52608353?v=5`}
            />
            <div>
              <h1 className="text-4xl font-extrabold leading-none tracking-tight text-black dark:text-zinc-300">
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
        <div className="lg:text-right text-left mt-10 lg:mt-0 text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
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
          <p>
            <Link
              href="https://cursos.alura.com.br/user/guglieelmor"
              target="_blank"
            >
              cursos.alura.com.br/user/guglieelmor
            </Link>
          </p>
        </div>
      </header>
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
    </>
  );
}
