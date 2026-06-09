import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categoryInfo: Record<string, { name: string; desc: string; color: string; dot: string }> = {
  "bai-tap":   { name: "Bài tập",   desc: "Giải đề, lời giải từng bước chi tiết",       color: "text-blue-600 dark:text-blue-400",    dot: "bg-blue-500" },
  "ly-thuyet": { name: "Lý thuyết", desc: "Định lý, chứng minh, khái niệm nền tảng",   color: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
  "ai-ml":     { name: "Ứng dụng",  desc: "Toán học trong thực tiễn và kỹ thuật",      color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
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
  const info  = categoryInfo[category];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--link)]">Trang chủ</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">{info?.name ?? category}</span>
      </nav>

      {/* Header */}
      <div className="mb-7 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 shadow-sm">
        {info && <span className={`h-3 w-3 rounded-full flex-shrink-0 ${info.dot}`} />}
        <div>
          <h1 className={`text-lg font-bold ${info?.color ?? "text-[var(--text)]"}`}>
            {info?.name ?? category}
          </h1>
          {info?.desc && (
            <p className="text-sm text-[var(--text-secondary)]">{info.desc}</p>
          )}
        </div>
        <span className="ml-auto text-sm text-[var(--text-muted)]">{posts.length} bài viết</span>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-10 text-center text-sm text-[var(--text-secondary)]">
          Chưa có bài viết nào trong chủ đề này.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
