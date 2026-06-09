import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center gap-3">
        <CategoryBadge category={post.category} />
        <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {post.readingTime} phút đọc
        </span>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {post.title}
        </h2>
      </Link>

      <p className="mb-4 text-gray-600 dark:text-gray-400">{post.summary}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
