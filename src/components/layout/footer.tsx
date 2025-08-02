"use client";
 
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link"; 

export default function Footer() {
  const data = new Date();
  const year = data.getFullYear();

  return (
    <section className="bg-black dark:bg-white dark:text-black light:text-white">
      <div className="container mx-auto">
        <footer>
          <div>
            <div className="h-[10rem] xl:h-[30rem] flex items-center justify-center">
              <TextHoverEffect text="Gulliver" />
            </div>
          </div>
          <div className="sm:px-0 px-10 pb-20 text-muted-foreground mt-24 flex flex-col justify-between sm:gap-4 gap-9 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>© {year} guilhermeoliveira.net. Todos os direitos reservados.</p>
            <ul className="flex gap-4 justify-center">
              <li className="hover:text-primary underline">
                <Link
                  href="https://www.linkedin.com/in/guglieelmor/"
                  className="cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
                >
                  <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                </Link>
              </li>
              <li className="hover:text-primary underline">
                <Link
                  href="https://github.com/guglieelmor"
                  className="cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
                >
                  <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                </Link>
              </li>
              <li className="hover:text-primary underline">
                <Link
                  href="https://www.instagram.com/guilhermegulliver/"
                  className="cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
                >
                  <Instagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
