import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const categoryMeta: Record<string, { icon: string; desc: string; gradient: string }> = {
  "bai-tap": {
    icon: "📝",
    desc: "Giải đề, lời giải chi tiết",
    gradient: "from-emerald-500 to-teal-600",
  },
  "ly-thuyet": {
    icon: "📐",
    desc: "Định lý, chứng minh, khái niệm",
    gradient: "from-violet-500 to-purple-600",
  },
  "ai-ml": {
    icon: "🤖",
    desc: "Toán trong ML/DL",
    gradient: "from-orange-500 to-red-500",
  },
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="animate-fade-in-up mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Khám phá Toán học
          </h1>
          <p className="animate-fade-in-up mx-auto max-w-2xl text-lg leading-relaxed text-white/80" style={{ animationDelay: "0.15s" }}>
            Bài tập có lời giải, lý thuyết nền tảng, và ứng dụng toán học trong AI & Machine Learning.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => {
            const meta = categoryMeta[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="post-card group flex items-center gap-4 rounded-2xl p-5"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} text-2xl text-white shadow-lg`}>
                  {meta.icon}
                </span>
                <div>
                  <h3 className="font-bold text-[var(--text)] group-hover:text-indigo-600">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{meta.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--text)]">Bài viết mới nhất</h2>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)]">Chưa có bài viết nào.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
