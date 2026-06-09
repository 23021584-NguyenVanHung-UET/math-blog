"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug, show = true }: { slug: string; show?: boolean }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  if (!show || views === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
      {views.toLocaleString()} lượt xem
    </span>
  );
}

export function ViewCounterCompact({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {views.toLocaleString()}
    </span>
  );
}
