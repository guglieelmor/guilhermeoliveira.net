"use client";

import { useEffect, useState } from "react";
import { DICTS, type Lang } from "@/lib/content";
import { CONTACT } from "@/lib/profile";

// Sem backend: escolhe-se o assunto, escreve-se a mensagem e o programa de e-mail abre com tudo preenchido.
// A mensagem também vai para a área de transferência, caso não haja programa de e-mail configurado.
export default function ContactForm({ lang }: { lang: Lang }) {
  const t = DICTS[lang].contact;
  const [topic, setTopic] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  function choose(i: number) {
    setTopic(i);
    setText(t.topics[i].start);
    setCopied(false);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      try {
        await navigator.clipboard.writeText(text.trim());
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }
    const subject = topic === null ? t.title : t.topics[topic].label;
    const query = new URLSearchParams({ subject, body: text.trim() }).toString().replace(/\+/g, "%20");
    window.location.href = `mailto:${CONTACT.email}?${query}`;
  }

  return (
    <form className="carta-form" data-ui onSubmit={send} action={`mailto:${CONTACT.email}`} method="post" encType="text/plain">
      <div className="assuntos" role="group" aria-label={t.topicLabel}>
        {t.topics.map((tp, i) => (
          <button key={tp.label} type="button" aria-pressed={topic === i} onClick={() => choose(i)}>
            {tp.label}
          </button>
        ))}
      </div>
      <label className="mensagem">
        <span className="oculto">{t.messageLabel}</span>
        <textarea
          name="mensagem"
          value={text}
          rows={5}
          onChange={(e) => {
            setText(e.target.value);
            setCopied(false);
          }}
          placeholder={t.placeholder}
        />
      </label>
      <div className="carta-form-pe">
        <p role="status">{copied ? t.copied : t.note}</p>
        <button type="submit" className="enviar">
          {t.submit}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

// Relógio de Porto Alegre, para quem escreve de outro fuso saber que horas são do lado de cá.
export function Clock({ lang }: { lang: Lang }) {
  const t = DICTS[lang].contact;
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat(t.locale, { timeZone: "America/Sao_Paulo", ...opts }).format(now) : "--";

  return (
    <p className="relogio">
      <span className="relogio-rotulo">{t.clock}</span>
      <span className="relogio-hora">
        {fmt({ hour: "2-digit", minute: "2-digit", hour12: false })}
        <span className="relogio-seg">{fmt({ second: "2-digit" }).padStart(2, "0")}</span>
      </span>
      <span className="relogio-dia">{fmt({ weekday: "long" })}</span>
    </p>
  );
}
