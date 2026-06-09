import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categoryInfo: Record<string, { name: string; icon: string; desc: string; gradient: string }> = {
  "bai-tap": { name: "Bài tập", icon: "📝", desc: "Giải đề, bài tập có lời giải từng bước", gradient: "from-emerald-500 to-teal-600" },
  "ly-thuyet": { name: "Lý thuyết", icon: "📐", desc: "Định lý, chứng minh, khái niệm nền tảng", gradient: "from-violet-500 to-purple-600" },
  "ai-ml": { name: "AI & ML", icon: "🤖", desc: "Toán đứng sau các thuật toán ML/DL", gradient: "from-orange-500 to-red-500" },
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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Về trang chủ
      </Link>

      {info && (
        <div className="mb-10 flex items-center gap-4">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${info.gradient} text-3xl text-white shadow-lg`}>
            {info.icon}
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text)]">{info.name}</h1>
            <p className="text-[var(--text-secondary)]">{info.desc}</p>
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-12 text-center">
          <p className="text-lg text-[var(--text-secondary)]">Chưa có bài viết nào trong chủ đề này.</p>
        </div>
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
