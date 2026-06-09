import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.tag }));
}

export function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  return params.then(({ tag }) => ({
    title: `#${decodeURIComponent(tag)} | Math Blog`,
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Về trang chủ
      </Link>

      <h1 className="mb-2 text-2xl font-bold text-[var(--text)]">#{decoded}</h1>
      <p className="mb-8 text-[var(--text-secondary)]">{posts.length} bài viết</p>

      <div className="mb-10 flex flex-wrap gap-2">
        {allTags.map((t) => (
          <Link
            key={t.tag}
            href={`/tags/${encodeURIComponent(t.tag)}`}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              t.tag === decoded
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            #{t.tag} <span className="text-xs opacity-60">({t.count})</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
