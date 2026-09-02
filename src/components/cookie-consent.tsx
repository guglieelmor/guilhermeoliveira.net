"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage indisponível (modo privado, etc.) — não exibe o banner
    }
  }, []);

  function decide(choice: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignora se não conseguir persistir
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-6 py-5 backdrop-blur md:px-10"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Este site usa cookies do Google Analytics para entender como as
              páginas são acessadas.{" "}
              <Link
                href="/privacidade"
                className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
              >
                Saiba mais
              </Link>
              .
            </p>

            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => decide("declined")}
                className="inline-block rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/5"
              >
                Recusar
              </button>
              <button
                onClick={() => decide("accepted")}
                className="inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
