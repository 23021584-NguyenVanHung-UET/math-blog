"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useBookmark } from "@/hooks/useBookmark";

interface Props {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
}

export default function BookmarkButton({ slug, title, date, category, summary }: Props) {
  const { user } = useAuth();
  const { bookmarked, toggle, loading } = useBookmark(slug, { title, date, category, summary });

  if (!user) {
    return (
      <button
        onClick={() => signInWithPopup(auth, googleProvider)}
        className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-indigo-400 hover:text-indigo-600"
        title="Đăng nhập để lưu bài"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Lưu bài
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors disabled:opacity-50 ${
        bookmarked
          ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20"
          : "border-[var(--border)] text-[var(--text-secondary)] hover:border-indigo-400 hover:text-indigo-600"
      }`}
    >
      <svg
        className="h-4 w-4"
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {bookmarked ? "Đã lưu" : "Lưu bài"}
    </button>
  );
}
