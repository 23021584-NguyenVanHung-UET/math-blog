import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";

const BOARD_META: Record<string, {
  name: string; desc: string; sym: string;
  symClass: string; bgClass: string; borderClass: string;
}> = {
  "bai-tap": {
    name: "Bài tập",
    desc: "Giải đề từng bước, lời giải chi tiết",
    sym: "∫",
    symClass:    "text-blue-600 dark:text-blue-400",
    bgClass:     "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-900/40",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    desc: "Định lý, chứng minh, khái niệm nền tảng",
    sym: "∑",
    symClass:    "text-violet-600 dark:text-violet-400",
    bgClass:     "bg-violet-50 dark:bg-violet-950/30",
    borderClass: "border-violet-200 dark:border-violet-900/40",
  },
  "ai-ml": {
    name: "Ứng dụng",
    desc: "Toán học trong thực tiễn và kỹ thuật",
    sym: "∇",
    symClass:    "text-emerald-600 dark:text-emerald-400",
    bgClass:     "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-900/40",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function Home() {
  const posts      = getAllPosts();
  const categories = getAllCategories();

  const countByCategory = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      {/* ── Site intro ──────────────────────────── */}
      <section className="mb-7 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-6 py-5">
        <h1 className="mb-1 text-lg font-bold text-[var(--text)]">Math Blog</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Toán học cho học sinh, sinh viên — bài giải từng bước, lý thuyết nền tảng, ứng dụng thực tiễn.
          Nội dung tiếng Việt, miễn phí hoàn toàn.
        </p>
      </section>

      {/* ── Category boards ─────────────────────── */}
      <section className="mb-7">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Chủ đề
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(BOARD_META).map(([slug, meta]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className={`flex items-start gap-3 rounded-lg border p-4 transition-colors hover:border-[var(--border-strong)] ${meta.bgClass} ${meta.borderClass}`}
            >
              <span className={`mt-0.5 flex-shrink-0 text-xl font-black leading-none ${meta.symClass}`}>
                {meta.sym}
              </span>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-semibold ${meta.symClass}`}>{meta.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {countByCategory[slug] ?? 0} bài
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {meta.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent posts ────────────────────────── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Bài viết mới nhất
          </h2>
          <Link href="/search" className="text-xs text-[var(--link)] hover:underline">
            Tất cả bài viết →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8 text-center text-sm text-[var(--text-secondary)]">
            Chưa có bài viết nào.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)]">
            {posts.map((post, i) => {
              const board = BOARD_META[post.category];
              return (
                <div
                  key={post.slug}
                  className={`post-row flex items-start gap-3 px-5 py-4 transition-colors ${
                    i < posts.length - 1 ? "border-b border-[var(--border)]" : ""
                  }`}
                >
                  {/* Category symbol */}
                  <div
                    className={`mt-0.5 h-7 w-7 flex-shrink-0 flex items-center justify-center rounded text-sm font-black
                      ${board?.symClass ?? "text-blue-600"} ${board?.bgClass ?? "bg-blue-50"}`}
                  >
                    {board?.sym ?? "∑"}
                  </div>

                  {/* Post info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="font-medium text-[var(--text)] transition-colors hover:text-[var(--link)]"
                      >
                        {post.title}
                      </Link>
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
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--link)] transition-colors"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="hidden flex-shrink-0 text-right text-xs text-[var(--text-muted)] sm:block">
                    <div className={`mb-0.5 font-medium ${board?.symClass ?? ""}`}>
                      {board?.name ?? post.category}
                    </div>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
