import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const categoryMeta: Record<string, { name: string; desc: string; color: string; dot: string }> = {
  "bai-tap": {
    name: "Bài tập",
    desc: "Giải đề từng bước, lời giải chi tiết",
    color: "border-emerald-200 hover:border-emerald-400 dark:border-emerald-900 dark:hover:border-emerald-700",
    dot: "bg-emerald-500",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    desc: "Định lý, chứng minh, khái niệm nền tảng",
    color: "border-violet-200 hover:border-violet-400 dark:border-violet-900 dark:hover:border-violet-700",
    dot: "bg-violet-500",
  },
  "ai-ml": {
    name: "AI & ML",
    desc: "Toán học đứng sau Machine Learning",
    color: "border-orange-200 hover:border-orange-400 dark:border-orange-900 dark:hover:border-orange-700",
    dot: "bg-orange-500",
  },
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* Hero — committed navy */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        {/* Decorative ∑ */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 select-none text-[20rem] font-black leading-none text-white/[0.03]"
        >
          ∑
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium tracking-widest text-indigo-400 uppercase">
              Blog Toán Học
            </p>
            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Hiểu sâu,<br />nhớ lâu.
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-400">
              Bài tập có lời giải, lý thuyết nền tảng, và toán học trong AI & Machine Learning — viết bằng tiếng Việt.
            </p>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const meta = categoryMeta[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                  >
                    <span className={`h-2 w-2 rounded-full ${meta?.dot ?? "bg-slate-400"}`} />
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Categories */}
        <section className="py-12">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
            Chủ đề
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {categories.map((cat) => {
              const meta = categoryMeta[cat.slug];
              if (!meta) return null;
              const postCount = getAllPosts().filter((p) => p.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`group flex items-start justify-between rounded-xl border bg-[var(--card-bg)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${meta.color}`}
                >
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                      <h3 className="font-semibold text-[var(--text)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {meta.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{meta.desc}</p>
                  </div>
                  <span className="ml-4 mt-0.5 shrink-0 text-2xl font-black text-[var(--border)]">
                    {postCount}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Posts */}
        <section className="border-t border-[var(--border)] py-12">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
            Bài viết mới nhất
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)]">Chưa có bài viết nào.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
