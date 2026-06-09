import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h3 className="mb-6 text-lg font-bold text-[var(--text)]">Bài viết liên quan</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-2">
              <CategoryBadge category={post.category} />
            </div>
            <h4 className="mb-1 font-semibold text-[var(--text)] group-hover:text-indigo-600">
              {post.title}
            </h4>
            <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">{post.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
