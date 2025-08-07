"use client";

import Image from "next/image";

export default function SectionAbout() {
  return (
    <div className="container">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="space-y-4 text-center">
          <span
            data-slot="badge"
            className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground bg-background"
          >
            Sobre
          </span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Experiências
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-border bg-background/80 hover:bg-background backdrop-blur-sm">
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-3xl p-3 bg-muted text-muted-foreground">
                    <Image
                      alt="image"
                      className={
                        "h-full rounded-3xl w-full object-cover scale-[1.11]"
                      }
                      width="20"
                      height="20"
                      src={"/images/brudam.jpeg"}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Brudam</h3>
                    <div className="text-muted-foreground mt-1 text-sm">
                      Tempo integral · 2020 - Presente
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Empresa especializada no desenvolvimento de soluções de software
                para gestão de transporte (TMS – Transport Management System)
                voltadas aos setores aéreo e rodoviário no Brasil.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="relative mb-10 pl-8">
                    <div className="bg-foreground absolute left-0 top-2 flex size-5 items-center justify-center rounded-full">
                      <div className="bg-background size-3 rounded-full"></div>
                    </div>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 mb-4 rounded-xl px-3 py-2 text-sm"
                    >
                      Tech Lead <br />
                    </span>
                    <span className="text-xs pl-2">
                      dez de 2021 - o momento
                    </span>
                    <div
                      data-slot="card"
                      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border my-2 border-none shadow-none"
                    >
                      <div data-slot="card-content" className="px-2">
                        <ul className="flex flex-col gap-1">
                          <li className="flex gap-3">
                            <span className="bg-foreground mt-2 h-2 w-2 flex-none rounded-full"></span>
                            <span className="text-md text-foreground leading-relaxed">
                              Liderar projetos de desenvolvimento de
                              codificação, tomar decisões técnicas de projeto e
                              separar tarefas, se necessário. Envolvimento em
                              todas as etapas da criação e inovação de sistemas.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-10 pl-8">
                    <div className="bg-foreground absolute left-0 top-2 flex size-5 items-center justify-center rounded-full">
                      <div className="bg-background size-3 rounded-full"></div>
                    </div>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 mb-4 rounded-xl px-3 py-2 text-sm"
                    >
                      Full Stack Developer <br />
                    </span>
                    <span className="text-xs pl-2">
                      mar de 2020 - dez de 2021
                    </span>
                    <div
                      data-slot="card"
                      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border my-2 border-none shadow-none"
                    >
                      <div data-slot="card-content" className="px-2">
                        <ul className="flex flex-col gap-1">
                          <li className="flex gap-3">
                            <span className="bg-foreground mt-2 h-2 w-2 flex-none rounded-full"></span>
                            <span className="text-md text-foreground leading-relaxed">
                              Colaborar com tarefas multiplataforma e coordenar
                              novos projetos. Atuar em estratégias, seja no
                              back-end, front-end ou ciência de dados.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="mb-2 text-sm font-medium">Tecnologias</h4>
                  <div className="flex flex-wrap gap-2">
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      JavaScript
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      PHP
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Laravel
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Phalcon
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Docker
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Node
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      MongoDB
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      MySQL
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Linux
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Vue
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      React
                    </span>
                    <span
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 text-xs"
                    >
                      Angular
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
