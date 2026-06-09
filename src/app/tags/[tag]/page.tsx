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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--link)] transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">#{decoded}</span>
      </nav>

      {/* Header */}
      <div className="glass mb-6 rounded-2xl px-5 py-5 fade-up">
        <div className="mb-4 flex items-baseline gap-3">
          <h1 className="text-xl font-bold text-[var(--text)]">#{decoded}</h1>
          <span className="text-sm text-[var(--text-muted)]">{posts.length} bài viết</span>
        </div>

        {/* All tags */}
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((t) => (
            <Link
              key={t.tag}
              href={`/tags/${encodeURIComponent(t.tag)}`}
              className={`rounded border px-2.5 py-0.5 text-xs backdrop-blur-sm transition-colors ${
                t.tag === decoded
                  ? "border-[var(--link)]/40 bg-[var(--link)]/10 font-semibold text-[var(--link)]"
                  : "border-[var(--border)] bg-white/5 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--link)]"
              }`}
            >
              #{t.tag} <span className="opacity-60">({t.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-sm text-[var(--text-secondary)]">
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
