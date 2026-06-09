import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");
const outDir = path.join(process.cwd(), "public");

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

const posts = files
  .map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const content = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(content);
    if (!data.published) return null;
    return {
      slug,
      title: data.title,
      summary: data.summary,
      category: data.category,
      tags: data.tags,
      date: data.date,
    };
  })
  .filter(Boolean);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "search-index.json"), JSON.stringify(posts, null, 2));
console.log(`Search index generated: ${posts.length} posts`);
