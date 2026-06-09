import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";

const CAT_NAME: Record<string, string> = {
  "bai-tap":   "Bài tập",
  "ly-thuyet": "Lý thuyết",
  "ai-ml":     "Ứng dụng",
};

const CAT_COLOR: Record<string, string> = {
  "bai-tap":   "text-blue-400 dark:text-blue-400",
  "ly-thuyet": "text-violet-400 dark:text-violet-400",
  "ai-ml":     "text-emerald-400 dark:text-emerald-400",
};

export default function Home() {
  const posts      = getAllPosts();
  const categories = getAllCategories();

  const countByCategory = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

      {/* ── Hero glass panel ───────────────────── */}
      <section className="glass mb-6 rounded-2xl px-7 py-7 fade-up">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-[var(--text)]">
          Math Blog
        </h1>
        <p className="mb-5 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
          Toán học cho học sinh, sinh viên — bài giải từng bước, lý thuyết nền tảng,
          ứng dụng thực tiễn. Nội dung tiếng Việt, miễn phí hoàn toàn.
        </p>

        {/* Category quick-links */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(CAT_NAME).map(([slug, name]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className={`flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:border-[var(--border-strong)] ${CAT_COLOR[slug]}`}
            >
              {name}
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
                {countByCategory[slug] ?? 0}
              </span>
            </Link>
          ))}
          <Link
            href="/search"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:text-[var(--link)]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Tìm kiếm
          </Link>
        </div>
      </section>

      {/* ── Bài viết — single glass card ──────── */}
      <section
        className="glass overflow-hidden rounded-2xl fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3.5">
          <h2 className="font-semibold text-[var(--text)]">Bài viết</h2>
          <span className="text-xs text-[var(--text-muted)]">{posts.length} bài</span>
        </div>

        {posts.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-[var(--text-secondary)]">
            Chưa có bài viết nào.
          </div>
        ) : (
          <ul>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className={`group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-white/5 ${
                  i < posts.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                {/* Category color bar */}
                <div
                  className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                    post.category === "bai-tap"
                      ? "bg-blue-400"
                      : post.category === "ly-thuyet"
                      ? "bg-violet-400"
                      : "bg-emerald-400"
                  }`}
                />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-medium text-[var(--text)] transition-colors group-hover:text-[var(--link)]"
                    >
                      {post.title}
                    </Link>
                    <CategoryBadge category={post.category} />
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)] line-clamp-1">
                    {post.summary}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--link)]"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="hidden flex-shrink-0 text-right text-xs text-[var(--text-muted)] sm:block">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("vi-VN", {
                      day: "numeric", month: "short",
                    })}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
