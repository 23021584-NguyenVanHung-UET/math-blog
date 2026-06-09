import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostFrontmatter, PostMeta } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const frontmatter = data as PostFrontmatter;

      if (!frontmatter.published) return null;

      return {
        slug,
        ...frontmatter,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((post): post is PostMeta => post !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories() {
  return [
    { slug: "bai-tap", name: "Bài tập", color: "emerald" },
    { slug: "ly-thuyet", name: "Lý thuyết", color: "violet" },
    { slug: "ai-ml", name: "AI & ML", color: "orange" },
  ] as const;
}
