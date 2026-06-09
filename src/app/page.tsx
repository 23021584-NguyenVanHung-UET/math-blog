import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";

const CAT_COLOR_DOT: Record<string, string> = {
  "bai-tap":   "bg-blue-500",
  "ly-thuyet": "bg-violet-500",
  "ai-ml":     "bg-emerald-500",
};

const CAT_LABEL: Record<string, string> = {
  "bai-tap":   "Bài tập",
  "ly-thuyet": "Lý thuyết",
  "ai-ml":     "Ứng dụng",
};

export default function Home() {
  const posts = getAllPosts();

  const countByCategory = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

      {/* ── Site intro ──────────────────────────── */}
      <section className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-6 shadow-sm">
        <h1 className="mb-1.5 text-xl font-bold tracking-tight text-[var(--text)]">Math Blog</h1>
        <p className="mb-5 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
          Toán học cho học sinh, sinh viên — bài giải từng bước, lý thuyết nền tảng,
          ứng dụng thực tiễn. Nội dung tiếng Việt, miễn phí.
        </p>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(CAT_LABEL).map(([slug, name]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            >
              <span className={`h-2 w-2 rounded-full ${CAT_COLOR_DOT[slug]}`} />
              {name}
              <span className="ml-1 rounded bg-[var(--border)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
                {countByCategory[slug] ?? 0}
              </span>
            </Link>
          ))}
          <Link
            href="/search"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Tìm kiếm
          </Link>
        </div>
      </section>

      {/* ── Bài viết panel ──────────────────────── */}
      <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-panel)] px-5 py-3">
          <h2 className="text-sm font-semibold text-[var(--text)]">Bài viết</h2>
          <span className="text-xs text-[var(--text-muted)]">{posts.length} bài</span>
        </div>

        {posts.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-[var(--text-secondary)]">
            Chưa có bài viết nào.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-[var(--bg-panel)]"
              >
                {/* Color dot */}
                <span
                  className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${
                    CAT_COLOR_DOT[post.category] ?? "bg-slate-400"
                  }`}
                />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-medium text-[var(--text)] transition-colors group-hover:text-[var(--link)]"
                    >
                      {post.title}
                    </Link>
                    <CategoryBadge category={post.category} />
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-1">
                    {post.summary}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-x-2.5 gap-y-0.5">
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
                <div className="hidden flex-shrink-0 text-right sm:block">
                  <time
                    dateTime={post.date}
                    className="text-xs text-[var(--text-muted)]"
                  >
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
