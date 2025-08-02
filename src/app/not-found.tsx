export default function NotFound() {
  return (
    <main className="bordered-div-padding text-muted-foreground space-x-6 border-x border-b text-sm mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between">
      <div className="container px-10 pt-45 max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Falta alguma coisa.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Desculpe, não conseguimos encontrar essa página. Você encontrará
                muito para explorar na página inicial.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
