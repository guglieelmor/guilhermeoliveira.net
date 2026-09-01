import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/40 p-6 transition-colors duration-200 hover:border-foreground/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
