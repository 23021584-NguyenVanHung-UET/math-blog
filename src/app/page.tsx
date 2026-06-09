import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          <span className="text-blue-600">∑</span> Math Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Blog toán học cá nhân — Bài tập, Lý thuyết, và ứng dụng AI & ML.
          Nơi chia sẻ kiến thức toán học từ cơ bản đến nâng cao.
        </p>
      </section>

      <section className="mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-transform hover:scale-105 ${
              cat.color === "emerald"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                : cat.color === "violet"
                  ? "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Bài viết mới nhất</h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Chưa có bài viết nào.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
