"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, collectionGroup, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface Bookmark {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  savedAt: { seconds: number } | null;
}

interface Comment {
  id: string;
  text: string;
  createdAt: { seconds: number } | null;
  slug?: string;
}

const categoryLabel: Record<string, string> = {
  "bai-tap": "Bài tập",
  "ly-thuyet": "Lý thuyết",
  "ai-ml": "AI & ML",
};

const categoryColor: Record<string, string> = {
  "bai-tap": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "ly-thuyet": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  "ai-ml": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return "";
  return new Date(ts.seconds * 1000).toLocaleDateString("vi-VN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tab, setTab] = useState<"bookmarks" | "comments">("bookmarks");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;
    setFetching(true);

    Promise.all([
      // Fetch bookmarks
      getDocs(query(collection(db, "bookmarks", user.uid, "posts"), orderBy("savedAt", "desc")))
        .then((snap) => setBookmarks(snap.docs.map((d) => d.data() as Bookmark))),

      // Fetch user's comments via collectionGroup
      getDocs(query(collectionGroup(db, "messages"), where("uid", "==", user.uid)))
        .then((snap) =>
          setComments(
            snap.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<Comment, "id">),
              // Extract slug from path: comments/{slug}/messages/{id}
              slug: d.ref.parent.parent?.id,
            }))
          )
        ),
    ]).finally(() => setFetching(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-[var(--text)]">Bạn chưa đăng nhập.</p>
        <button
          onClick={() => signInWithPopup(auth, googleProvider)}
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-indigo-400"
        >
          Đăng nhập bằng Google
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* User info */}
      <div className="mb-8 flex items-center gap-4">
        {user.photoURL ? (
          <Image src={user.photoURL} alt={user.displayName ?? ""} width={64} height={64} className="rounded-full ring-2 ring-indigo-500/30" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
            {(user.displayName ?? "U")[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-[var(--text)]">{user.displayName}</h1>
          <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-[var(--border)]">
        {(["bookmarks", "comments"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-[var(--text-secondary)] hover:text-[var(--text)]"
            }`}
          >
            {t === "bookmarks" ? `Đã lưu (${bookmarks.length})` : `Bình luận (${comments.length})`}
          </button>
        ))}
      </div>

      {fetching ? (
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          Đang tải...
        </div>
      ) : tab === "bookmarks" ? (
        bookmarks.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">Bạn chưa lưu bài viết nào.</p>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b) => (
              <Link
                key={b.slug}
                href={`/posts/${b.slug}`}
                className="flex flex-col gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor[b.category] ?? ""}`}>
                    {categoryLabel[b.category] ?? b.category}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Lưu lúc {formatDate(b.savedAt)}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--text)]">{b.title}</h3>
                <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">{b.summary}</p>
              </Link>
            ))}
          </div>
        )
      ) : (
        comments.length === 0 ? (
          <p className="text-sm text-[var(--text-secondary)]">Bạn chưa có bình luận nào.</p>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
                {c.slug && (
                  <Link href={`/posts/${c.slug}`} className="mb-1 block text-xs text-indigo-600 hover:underline">
                    /posts/{c.slug}
                  </Link>
                )}
                <p className="text-sm text-[var(--text)]">{c.text}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{formatDate(c.createdAt)}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
