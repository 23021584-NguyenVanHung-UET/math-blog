"use client";

import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";

interface SearchPost {
  slug: string; title: string; summary: string;
  category: string; tags: string[]; date: string;
}

export default function SearchPage() {
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/search-index.json").then((r) => r.json()).then(setPosts).catch(() => {});
  }, []);

  const fuse = useMemo(
    () => new Fuse(posts, {
      keys: [
        { name: "title",   weight: 2 },
        { name: "summary", weight: 1 },
        { name: "tags",    weight: 1.5 },
      ],
      threshold: 0.3,
      includeScore: true,
    }),
    [posts],
  );

  const results = query.trim() ? fuse.search(query).map((r) => r.item) : posts;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--link)]">Trang chủ</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">Tìm kiếm</span>
      </nav>

      <h1 className="mb-5 text-xl font-bold text-[var(--text)]">Tìm kiếm bài viết</h1>

      {/* Search box */}
      <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-sm">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, nội dung, tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] py-2.5 pl-10 pr-4 text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--link)]/15"
            autoFocus
          />
        </div>
        <p className="mt-2.5 text-xs text-[var(--text-muted)]">
          {query.trim()
            ? `${results.length} kết quả cho "${query}"`
            : `${posts.length} bài viết`}
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-10 text-center text-sm text-[var(--text-secondary)]">
          Không tìm thấy bài viết phù hợp.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
          {results.map((post, i) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={`flex items-start gap-3 px-5 py-4 transition-colors hover:bg-[var(--bg-panel)] ${
                i < results.length - 1 ? "border-b border-[var(--border)]" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <CategoryBadge category={post.category} />
                  <time className="text-xs text-[var(--text-muted)]">
                    {new Date(post.date).toLocaleDateString("vi-VN")}
                  </time>
                </div>
                <div className="font-medium text-[var(--text)] transition-colors hover:text-[var(--link)]">
                  {post.title}
                </div>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)] line-clamp-1">{post.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
