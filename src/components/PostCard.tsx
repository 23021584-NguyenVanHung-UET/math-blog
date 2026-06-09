import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { ViewCounterCompact } from "./ViewCounter";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/80 dark:hover:border-slate-700 dark:hover:shadow-slate-950/80">
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
        <h2 className="mb-2 text-base font-semibold leading-snug text-[var(--text)] transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
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
