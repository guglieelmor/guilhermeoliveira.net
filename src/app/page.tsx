import Index from "@/components";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return <Index posts={posts} />;
}
