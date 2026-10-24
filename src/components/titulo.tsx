// Título de seção com as palavras já separadas no servidor, para a entrada
// palavra por palavra sem mexer no DOM depois da hidratação.
export default function Titulo({ text, id, className }: { text: string; id?: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h2 id={id} className={className ? `titulo ${className}` : "titulo"} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="w" style={{ "--w": i } as React.CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
