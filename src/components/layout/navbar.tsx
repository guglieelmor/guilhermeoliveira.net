"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navLinks as links } from "@/lib/nav-links";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!mounted) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      {/* Desktop: retro game-menu box, centered */}
      <div className="hiddenPrint fixed inset-x-0 top-6 z-50 hidden justify-center md:flex">
        <div className="relative border-2 border-foreground/70 bg-background/95 px-6 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] backdrop-blur-sm dark:shadow-[4px_4px_0_0_rgba(0,0,0,0.6)]">
          <span className="absolute -top-[3px] -left-[3px] h-[6px] w-[6px] bg-foreground/70" />
          <span className="absolute -top-[3px] -right-[3px] h-[6px] w-[6px] bg-foreground/70" />
          <span className="absolute -bottom-[3px] -left-[3px] h-[6px] w-[6px] bg-foreground/70" />
          <span className="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px] bg-foreground/70" />

          <nav className="flex items-center gap-6 font-display text-[0.6rem]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 py-1 pl-4 transition-colors",
                  isActive(link.href)
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-cursor"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute left-0"
                  >
                    &gt;
                  </motion.span>
                )}
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="cursor-pointer border-l border-foreground/20 pl-4 text-muted-foreground transition-colors hover:text-violet-500 dark:hover:text-violet-400"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile trigger */}
      <div className="hiddenPrint fixed inset-x-0 top-0 z-50 flex justify-end px-6 py-6 md:hidden">
        <button
          onClick={() => setOpen((value) => !value)}
          className="cursor-pointer rounded-full border border-black/10 p-2 text-foreground dark:border-white/10"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="hiddenPrint fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-background px-10 md:hidden"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 + index * 0.07,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "font-display flex items-baseline gap-3 text-2xl leading-relaxed",
                    isActive(link.href) ? "text-violet-500" : "text-foreground",
                  )}
                >
                  <span className="text-xs text-violet-500/70">
                    {link.index}
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <button
              onClick={toggleTheme}
              className="mt-4 flex cursor-pointer items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              Alternar tema
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
