import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIRECTORY = path.join(process.cwd(), "_content");

export default async function Page({
  params,
}: {
  params: { year: string; month: string; day: string; slug: string };
}) {
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

  const processedContent = await remark().use(html).process(content);

  const contentHtml = processedContent.toString();

  return (
    <article className="prose prose-lg mx-auto py-10">
      <h1>{data.title}</h1>
      <p>
        <em>{data.date}</em>
      </p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
