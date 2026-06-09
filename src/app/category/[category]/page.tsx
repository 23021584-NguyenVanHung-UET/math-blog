import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categoryInfo: Record<string, { name: string; icon: string; desc: string; color: string }> = {
  "bai-tap": { name: "Bài tập", icon: "📝", desc: "Giải đề, bài tập có lời giải từng bước", color: "text-emerald-600" },
  "ly-thuyet": { name: "Lý thuyết", icon: "📐", desc: "Định lý, chứng minh, khái niệm nền tảng", color: "text-violet-600" },
  "ai-ml": { name: "AI & ML", icon: "🤖", desc: "Toán đứng sau các thuật toán ML/DL", color: "text-orange-600" },
};

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  return params.then(({ category }) => ({
    title: `${categoryInfo[category]?.name ?? category} | Math Blog`,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const info = categoryInfo[category];

  return (
    <>
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Về trang chủ
          </Link>

          {info && (
            <div className="flex items-center gap-4">
              <span className="text-4xl">{info.icon}</span>
              <div>
                <h1 className="text-2xl font-extrabold text-[var(--text)] sm:text-3xl">{info.name}</h1>
                <p className="text-[var(--text-secondary)]">{info.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">Chưa có bài viết nào trong chủ đề này.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
