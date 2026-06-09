import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { ViewCounterCompact } from "./ViewCounter";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post-card group rounded-2xl p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <CategoryBadge category={post.category} />
        <time className="text-sm text-[var(--text-secondary)]" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span className="text-sm text-[var(--text-secondary)]">·</span>
        <span className="text-sm text-[var(--text-secondary)]">{post.readingTime} phút đọc</span>
        <ViewCounterCompact slug={post.slug} />
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-xl font-bold text-[var(--text)] transition-colors group-hover:text-indigo-600">
          {post.title}
        </h2>
      </Link>

      <p className="mb-4 line-clamp-2 text-[var(--text-secondary)]">{post.summary}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
