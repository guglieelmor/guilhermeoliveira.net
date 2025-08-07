"use client";

import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";

export default function SectionSocial() {
  return (
    <div className="container">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="group rounded-md border border-border p-6"
            href="https://www.linkedin.com/in/guglieelmor/"
          >
            <div className="flex items-center justify-between gap-4">
              <Linkedin />
              <ArrowUpRight className="lucide lucide-arrow-up-right size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">
                Bora se conectar e trocar ideias sobre tecnologia e
                desenvolvimento!
              </p>
            </div>
          </a>
          <a
            className="group rounded-md border border-border p-6"
            href="https://github.com/guglieelmor"
          >
            <div className="flex items-center justify-between gap-4">
              <Github />
              <ArrowUpRight className="lucide lucide-arrow-up-right size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">GitHub</h3>
              <p className="text-sm text-muted-foreground">
                Bora se conectar e trocar ideias sobre tecnologia e
                desenvolvimento!
              </p>
            </div>
          </a>
          <a
            className="group rounded-md border border-border p-6"
            href="https://www.instagram.com/guilhermegulliver/"
          >
            <div className="flex items-center justify-between gap-4">
              <Instagram />
              <ArrowUpRight className="lucide lucide-arrow-up-right size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">Instagram</h3>
              <p className="text-sm text-muted-foreground">
                Bora se conectar e trocar ideias sobre tecnologia e
                desenvolvimento!
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
