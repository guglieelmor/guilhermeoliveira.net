"use client";

import { OPEN_CONSENT_EVENT } from "./cookies";

export default function CookiePrefs({ label }: { label: string }) {
  return (
    <button type="button" className="link-texto" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      {label}
    </button>
  );
}
