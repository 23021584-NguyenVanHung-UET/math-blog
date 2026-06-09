"use client";

import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";

interface SearchPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
}

export default function SearchPage() {
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "summary", weight: 1 },
          { name: "tags", weight: 1.5 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : posts;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-[var(--text)]">Tìm kiếm bài viết</h1>

      <div className="relative mb-8">
        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Tìm theo tiêu đề, nội dung, tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card-bg)] py-3 pl-10 pr-4 text-[var(--text)] placeholder-[var(--text-secondary)] outline-none transition-shadow focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          autoFocus
        />
      </div>

      <p className="mb-4 text-sm text-[var(--text-secondary)]">
        {query.trim() ? `${results.length} kết quả cho "${query}"` : `${posts.length} bài viết`}
      </p>

      <div className="space-y-3">
        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group block rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-all hover:shadow-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <CategoryBadge category={post.category} />
              <time className="text-sm text-[var(--text-secondary)]">
                {new Date(post.date).toLocaleDateString("vi-VN")}
              </time>
            </div>
            <h2 className="font-bold text-[var(--text)] group-hover:text-indigo-600">{post.title}</h2>
            <p className="mt-1 line-clamp-1 text-sm text-[var(--text-secondary)]">{post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
