"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="botao nao-imprimir" onClick={() => window.print()}>
      {label}
    </button>
  );
}
