import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { ViewCounterCompact } from "./ViewCounter";

const accentColors: Record<string, string> = {
  "bai-tap": "border-l-emerald-500",
  "ly-thuyet": "border-l-violet-500",
  "ai-ml": "border-l-orange-500",
};

export default function PostCard({ post }: { post: PostMeta }) {
  const accent = accentColors[post.category] ?? "border-l-gray-400";

  return (
    <article
      className={`group rounded-xl border border-[var(--border)] border-l-4 ${accent} bg-[var(--card-bg)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
        <CategoryBadge category={post.category} />
        <span>·</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        <ViewCounterCompact slug={post.slug} />
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-lg font-bold text-[var(--text)] transition-colors group-hover:text-indigo-600">
          {post.title}
        </h2>
      </Link>

      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {post.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-md bg-[var(--bg-secondary)] px-2 py-0.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
