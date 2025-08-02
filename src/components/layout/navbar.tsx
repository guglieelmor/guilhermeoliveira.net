"use client";

// import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  // const { setTheme } = useTheme();
  return (
    <div
      className={cn(
        "shadow-md rounded-full border bg-background/70 backdrop-blur-md fixed top-10 inset-x-0 max-w-2xs mx-auto z-50",
        className
      )}
    >
      <nav className="relative rounded-full border border-transparent bg-white shadow-input dark:bg-black dark:border-white/20 px-8 py-4 flex justify-center">
        <div className="flex flex-row gap-6 text-[1em] font-medium text-black dark:text-white">
          <Link
            href="/"
            className="cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className="cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
          >
            Sobre
          </Link>
          <Link
            href="/blog"
            className="cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
          >
            Blog
          </Link>
        </div>
      </nav>
    </div>
  );
}
