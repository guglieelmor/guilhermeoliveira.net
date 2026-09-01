"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { navLinks as links } from "@/lib/nav-links";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const activeHref = links.find((link) => isActive(link.href))?.href ?? links[0].href;
  const highlighted = hovered ?? activeHref;

  return (
    <header className="hiddenPrint fixed inset-x-0 bottom-5 z-50 flex justify-center px-6 md:top-6 md:bottom-auto">
      <nav
        onMouseLeave={() => setHovered(null)}
        className="flex items-center gap-0.5 rounded-full border border-border bg-background/80 p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-10px_rgba(0,0,0,0.3)] backdrop-blur-md"
      >
        <span className="flex items-center pr-2.5 pl-2" aria-hidden="true">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
          </span>
        </span>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
              isActive(link.href)
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {highlighted === link.href && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-full bg-foreground/[0.06]"
              />
            )}
            <span className="relative">{link.label}</span>
          </Link>
        ))}

        <span className="mx-1.5 h-4 w-px bg-border" />

        <button
          onClick={toggleTheme}
          onMouseEnter={() => setHovered(null)}
          className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>
    </header>
  );
}
