"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.includes("blog");

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "hiddenPrint shadow-md rounded-full border bg-background/70 backdrop-blur-md fixed top-3 inset-x-0 w-54 mx-auto z-50",
        className,
      )}
    >
      <nav className="py-1.5 container relative rounded-full border border-transparent bg-white shadow-input dark:bg-black dark:border-white/20 flex justify-center">
        <div className="flex flex-row gap-6 text-[1em] font-medium text-black dark:text-white">
          <Link
            href="/"
            className={`self-center cursor-pointer transition-colors font-medium tracking-wide
              ${
                isHome
                  ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  : "text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
          >
            /index
          </Link>
          <Link
            href="/blog"
            className={`self-center cursor-pointer transition-colors font-medium tracking-wide
              ${
                isBlog
                  ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  : "text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
          >
            /blog
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
