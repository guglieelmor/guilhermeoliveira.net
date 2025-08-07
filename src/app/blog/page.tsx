export default function Blog() {
  return (
    <main className="bordered-div-padding text-muted-foreground space-x-6 border-x border-b text-sm mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between">
      <div className="container">
        <section className="py-32">
          <div className="container flex flex-col items-center gap-16">
            <div className="text-center">
              <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
                Blog
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                Aqui você irá encontrar artigos legitimamente escritos por mim,
                sem a adição de IA. Com opiniões e insights sobre
                desenvolvimento web, design e tecnologia.
              </p>
            </div>
            {/* <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
              <div
                data-slot="card"
                className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                        <span>Web Design</span>
                        <span>UI Development</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <a
                        href="https://shadcnblocks.com"
                        target="_blank"
                        className="hover:underline"
                      >
                        Building Modern UIs: A Deep Dive into Shadcn and React
                        Components
                      </a>
                    </h3>
                    <p className="mt-4 text-muted-foreground md:mt-5">
                      Join us for an in-depth exploration of building modern
                      user interfaces using shadcn/ui and React. Learn best
                      practices and advanced techniques.
                    </p>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <span className="text-muted-foreground">Sarah Chen</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">15 Feb 2024</span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <a
                        href="https://shadcnblocks.com"
                        target="_blank"
                        className="inline-flex items-center font-semibold hover:underline md:text-base"
                      >
                        <span>Read more</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-arrow-right ml-2 size-4 transition-transform"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="order-first sm:order-last sm:col-span-5">
                    <a
                      href="https://shadcnblocks.com"
                      target="_blank"
                      className="block"
                    >
                      <div className="aspect-16/9 overflow-clip rounded-lg border border-border">
                        <img
                          src="/images/block/placeholder-dark-1.svg"
                          alt="Building Modern UIs: A Deep Dive into Shadcn and React Components"
                          className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                data-slot="card"
                className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                        <span>Web Design</span>
                        <span>CSS</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <a
                        href="https://shadcnblocks.com"
                        target="_blank"
                        className="hover:underline"
                      >
                        Mastering Tailwind CSS: From Basics to Advanced
                        Techniques
                      </a>
                    </h3>
                    <p className="mt-4 text-muted-foreground md:mt-5">
                      Discover how to leverage the full power of Tailwind CSS to
                      create beautiful, responsive websites with clean and
                      maintainable code.
                    </p>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <span className="text-muted-foreground">
                        Michael Park
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">22 Feb 2024</span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <a
                        href="https://shadcnblocks.com"
                        target="_blank"
                        className="inline-flex items-center font-semibold hover:underline md:text-base"
                      >
                        <span>Read more</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-arrow-right ml-2 size-4 transition-transform"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="order-first sm:order-last sm:col-span-5">
                    <a
                      href="https://shadcnblocks.com"
                      target="_blank"
                      className="block"
                    >
                      <div className="aspect-16/9 overflow-clip rounded-lg border border-border">
                        <img
                          src="/images/block/placeholder-dark-1.svg"
                          alt="Mastering Tailwind CSS: From Basics to Advanced Techniques"
                          className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}
