import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { ViewCounterCompact } from "./ViewCounter";

/* Space-separated RGB for use in rgb(var(--glow) / alpha) */
const glowRgb: Record<string, string> = {
  "bai-tap":   "16 185 129",
  "ly-thuyet": "99 102 241",
  "ai-ml":     "139 92 246",
};

export default function PostCard({ post }: { post: PostMeta }) {
  const glow = glowRgb[post.category] ?? "99 102 241";

  return (
    <article
      className="post-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ "--post-glow": glow } as React.CSSProperties}
    >
      {/* Shine sweep on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <CategoryBadge category={post.category} />
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("vi-VN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <ViewCounterCompact slug={post.slug} />
        </div>
      </div>

      <Link href={`/posts/${post.slug}`} className="flex-1">
        <h2 className="mb-2.5 text-base font-semibold leading-snug text-[var(--text)] transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {post.title}
        </h2>
      </Link>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {post.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-md bg-[var(--bg-secondary)] px-2 py-0.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
