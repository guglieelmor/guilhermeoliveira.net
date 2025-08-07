"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className={cn(
        "shadow-md rounded-full border bg-background/70 backdrop-blur-md fixed top-10 inset-x-0 max-w-2xs mx-auto z-50",
        className
      )}
    >
      <nav className="py-2 relative rounded-full border border-transparent bg-white shadow-input dark:bg-black dark:border-white/20 flex justify-center">
        <div className="flex flex-row gap-6 text-[1em] font-medium text-black dark:text-white">
          <Link
            href="/"
            className="self-center cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className="self-center cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
          >
            Sobre
          </Link>
          <Link
            href="/blog"
            className="self-center cursor-pointer text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-medium tracking-wide"
          >
            Blog
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </div>
  );
}
