interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="bordered-div-padding text-muted-foreground space-x-6 border-x border-b text-sm mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between">
      <div className="container dark:bg-black">
        <section className="py-32">{children}</section>
      </div>
    </main>
  );
}
