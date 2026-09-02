import fs from "fs";
import path from "path";

const POSTS_DIRECTORY = path.join(process.cwd(), "public", "_content");

export type PostMeta = {
  title: string;
  date: string;
  path: string;
  description: string;
  tags: string[];
  readingMinutes?: number;
};

export function getAllPosts(): PostMeta[] {
  const indexPath = path.join(POSTS_DIRECTORY, "posts.json");
  if (!fs.existsSync(indexPath)) return [];
  const raw = fs.readFileSync(indexPath, "utf8");
  const posts: PostMeta[] = JSON.parse(raw).posts ?? [];
  return posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
