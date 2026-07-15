import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import Container from "@/components/layout/container";

const POSTS_DIRECTORY = path.join(process.cwd(), "/public/_content");

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
    "index.md",
  );
  if (!fs.existsSync(filePath)) {
    return <div>Post não encontrado</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content } = matter(fileContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <Container>
      <article
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        className="prose prose-violet dark:prose-invert max-w-none"
      />
    </Container>
  );
}
