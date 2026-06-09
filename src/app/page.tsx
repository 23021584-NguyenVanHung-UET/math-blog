import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const categoryMeta: Record<string, { icon: string; desc: string; bg: string; border: string }> = {
  "bai-tap": {
    icon: "📝",
    desc: "Giải đề, lời giải chi tiết",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  "ly-thuyet": {
    icon: "📐",
    desc: "Định lý, chứng minh, khái niệm",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
  },
  "ai-ml": {
    icon: "🤖",
    desc: "Toán trong ML/DL",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
  },
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
              Blog toán học cá nhân
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">
              Khám phá{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Toán học
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Bài tập có lời giải, lý thuyết nền tảng, và ứng dụng toán học trong AI & Machine Learning.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Categories */}
        <section className="py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((cat) => {
              const meta = categoryMeta[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`group flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-md ${meta.bg} ${meta.border}`}
                >
                  <span className="text-3xl">{meta.icon}</span>
                  <div>
                    <h3 className="font-bold text-[var(--text)] group-hover:text-indigo-600">{cat.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{meta.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Posts */}
        <section className="border-t border-[var(--border)] py-10">
          <h2 className="mb-6 text-xl font-bold text-[var(--text)]">Bài viết mới nhất</h2>
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)]">Chưa có bài viết nào.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
