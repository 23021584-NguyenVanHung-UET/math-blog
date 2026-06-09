import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { ViewCounterCompact } from "./ViewCounter";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="glass flex flex-col rounded-2xl p-5 transition-all duration-200 hover:shadow-[0_12px_40px_var(--glass-shadow)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <CategoryBadge category={post.category} />
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("vi-VN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </time>
          <ViewCounterCompact slug={post.slug} />
        </div>
      </div>

      <Link href={`/posts/${post.slug}`} className="mb-2 block flex-1">
        <h2 className="font-semibold leading-snug text-[var(--text)] transition-colors hover:text-[var(--link)]">
          {post.title}
        </h2>
      </Link>

      <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2">
        {post.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded px-1.5 py-0.5 text-xs text-[var(--text-muted)] backdrop-blur-sm transition-colors bg-white/5 border border-white/10 hover:text-[var(--link)] dark:bg-white/5"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
