import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-4xl px-6 pt-28 pb-24 md:px-10 md:pt-36",
        className,
      )}
    >
      {children}
    </main>
  );
}
