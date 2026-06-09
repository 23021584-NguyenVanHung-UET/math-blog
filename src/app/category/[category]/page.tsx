import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categoryInfo: Record<string, { name: string; desc: string; color: string }> = {
  "bai-tap":   { name: "Bài tập",   desc: "Giải đề, bài tập có lời giải từng bước", color: "text-blue-400" },
  "ly-thuyet": { name: "Lý thuyết", desc: "Định lý, chứng minh, khái niệm nền tảng", color: "text-violet-400" },
  "ai-ml":     { name: "Ứng dụng",  desc: "Toán học trong thực tiễn và kỹ thuật",    color: "text-emerald-400" },
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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--link)] transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className={`font-medium ${info?.color ?? ""}`}>{info?.name ?? category}</span>
      </nav>

      {/* Header glass */}
      <div className="glass mb-7 rounded-2xl px-6 py-5 fade-up">
        <h1 className={`text-xl font-bold ${info?.color ?? "text-[var(--text)]"}`}>
          {info?.name ?? category}
        </h1>
        {info?.desc && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{info.desc}</p>
        )}
        <p className="mt-2 text-xs text-[var(--text-muted)]">{posts.length} bài viết</p>
      </div>

      {posts.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-sm text-[var(--text-secondary)]">
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
