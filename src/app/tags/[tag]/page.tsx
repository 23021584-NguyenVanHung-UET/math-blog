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
  const { tag }   = await params;
  const decoded   = decodeURIComponent(tag);
  const posts     = getPostsByTag(decoded);
  const allTags   = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--link)] transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">#{decoded}</span>
      </nav>

      <div className="mb-6 flex items-baseline gap-3">
        <h1 className="text-xl font-bold text-[var(--text)]">#{decoded}</h1>
        <span className="text-sm text-[var(--text-muted)]">{posts.length} bài viết</span>
      </div>

      {/* All tags */}
      <div className="mb-7 flex flex-wrap gap-1.5">
        {allTags.map((t) => (
          <Link
            key={t.tag}
            href={`/tags/${encodeURIComponent(t.tag)}`}
            className={`rounded border px-2.5 py-0.5 text-xs transition-colors ${
              t.tag === decoded
                ? "border-[var(--link)] bg-[var(--accent-bg)] text-[var(--link)] font-medium"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--link)]"
            }`}
          >
            #{t.tag} <span className="opacity-60">({t.count})</span>
          </Link>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8 text-center text-sm text-[var(--text-secondary)]">
          Không có bài viết nào với tag này.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
