import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categoryNames: Record<string, string> = {
  "bai-tap": "Bài tập",
  "ly-thuyet": "Lý thuyết",
  "ai-ml": "AI & ML",
};

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  return params.then(({ category }) => ({
    title: `${categoryNames[category] ?? category} | Math Blog`,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const name = categoryNames[category] ?? category;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        &larr; Về trang chủ
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Chưa có bài viết nào trong chủ đề này.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
