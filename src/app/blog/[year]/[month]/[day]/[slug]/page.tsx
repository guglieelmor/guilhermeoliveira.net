import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const POSTS_DIRECTORY = path.join(process.cwd(), "_content");

type BlogProps = {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
};

export default async function Blog({ params }: BlogProps) {
  const { year, month, day, slug } = await params;

  const filePath = path.join(
    POSTS_DIRECTORY,
    year,
    month,
    day,
    slug,
    "index.md"
  );
  if (!fs.existsSync(filePath)) {
    return <div>Post não encontrado</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <article className="min-h-screen mx-auto container">
      <section className="py-32">
        <div>
          <nav aria-label="breadcrumb" data-slot="breadcrumb">
            <ol
              data-slot="breadcrumb-list"
              className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5"
            >
              <li
                data-slot="breadcrumb-item"
                className="inline-flex items-center gap-1.5"
              >
                {/* <a
                  data-slot="breadcrumb-link"
                  className="hover:text-foreground transition-colors"
                  href="/"
                >
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
                    className="lucide lucide-house h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                </a> */}
              </li>
              <li
                data-slot="breadcrumb-separator"
                role="presentation"
                aria-hidden="true"
                className="[&amp;&gt;svg]:size-3.5"
              >
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
                  className="lucide lucide-chevron-right"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li
                data-slot="breadcrumb-item"
                className="inline-flex items-center gap-1.5"
              >
                {/* <a
                  data-slot="breadcrumb-link"
                  className="hover:text-foreground transition-colors"
                  href="/"
                >
                  Components
                </a> */}
              </li>
              <li
                data-slot="breadcrumb-separator"
                role="presentation"
                aria-hidden="true"
                className="[&amp;&gt;svg]:size-3.5"
              >
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
                  className="lucide lucide-chevron-right"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li
                data-slot="breadcrumb-item"
                className="inline-flex items-center gap-1.5"
              >
                <span
                  data-slot="breadcrumb-page"
                  role="link"
                  aria-disabled="true"
                  aria-current="page"
                  className="text-foreground font-normal"
                >
                  Blog
                </span>
              </li>
            </ol>
          </nav>
          <h1 className="mb-6 mt-7 max-w-3xl text-3xl font-semibold md:text-5xl">
            The royal decree that made everyone laugh
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <span
              data-slot="avatar"
              className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8 border"
            ></span>
            <span>
              <a href="#" className="font-medium">
                John Doe
              </a>
              <span className="text-muted-foreground ml-1">
                on September 23, 2024
              </span>
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
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
                className="lucide lucide-clock h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              10 min. read
            </span>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            data-slot="separator-root"
            className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mb-16 mt-8"
          ></div>
          <div className="relative grid grid-cols-12 gap-6 lg:grid">
            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              className="prose col-span-12 lg:col-span-8"
            ></div>
            <div className="sticky top-8 col-span-3 col-start-10 hidden h-fit lg:block">
              <span className="text-lg font-medium">On this page</span>
              <nav className="mt-4 text-sm">
                <ul className="space-y-1">
                  <li>
                    {/* <a
                      href="#section1"
                      className="block py-1 transition-colors duration-200 text-primary"
                    >
                      How Taxes Work and Why They Matter
                    </a> */}
                  </li>
                  <li>
                    {/* <a
                      href="#section2"
                      className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary"
                    >
                      The Great People's Rebellion
                    </a> */}
                  </li>
                  <li>
                    {/* <a
                      href="#section3"
                      className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary"
                    >
                      The King's Plan
                    </a> */}
                  </li>
                </ul>
              </nav>
              <div
                data-orientation="horizontal"
                role="none"
                data-slot="separator-root"
                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-6"
              ></div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Share this article</p>
                <ul className="flex gap-2">
                  <li>
                    {/* <a
                      href="#"
                      className="hover:bg-muted inline-flex rounded-full border p-2 transition-colors"
                    >
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
                        className="lucide lucide-facebook h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a> */}
                  </li>
                  <li>
                    {/* <a
                      href="#"
                      className="hover:bg-muted inline-flex rounded-full border p-2 transition-colors"
                    >
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
                        className="lucide lucide-twitter h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a> */}
                  </li>
                  <li>
                    {/* <a
                      href="#"
                      className="hover:bg-muted inline-flex rounded-full border p-2 transition-colors"
                    >
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
                        className="lucide lucide-linkedin h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a> */}
                  </li>
                  <li>
                    {/* <a
                      href="#"
                      className="hover:bg-muted inline-flex rounded-full border p-2 transition-colors"
                    >
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
                        className="lucide lucide-instagram h-4 w-4"
                        aria-hidden="true"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a> */}
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
                >
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
                    className="lucide lucide-arrow-up h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                  Back to top
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
