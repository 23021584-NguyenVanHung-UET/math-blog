"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { db, auth, googleProvider, ADMIN_EMAILS } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface Comment {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string | null;
  text: string;
  createdAt: { seconds: number } | null;
}

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return "";
  return new Date(ts.seconds * 1000).toLocaleString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Comments({ slug }: { slug: string }) {
  const { user, isAdmin } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "comments", slug, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment))
      );
    });
    return unsub;
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !text.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "comments", slug, "messages"), {
        uid: user.uid,
        displayName: user.displayName ?? "Ẩn danh",
        photoURL: user.photoURL ?? null,
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
      setText("");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId: string) {
    await deleteDoc(doc(db, "comments", slug, "messages", commentId));
  }

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h3 className="mb-6 text-lg font-bold text-[var(--text)]">
        Bình luận {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Chưa có bình luận nào. Hãy là người đầu tiên!
        </p>
      ) : (
        <div className="mb-8 space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4"
            >
              {c.photoURL ? (
                <Image
                  src={c.photoURL}
                  alt={c.displayName}
                  width={36}
                  height={36}
                  className="h-9 w-9 flex-shrink-0 rounded-full"
                />
              ) : (
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {c.displayName[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    {c.displayName}
                  </span>
                  {c.uid && ADMIN_EMAILS.includes(
                    comments.find((x) => x.id === c.id)?.uid === user?.uid
                      ? user?.email ?? ""
                      : ""
                  ) && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                      Admin
                    </span>
                  )}
                  <span className="text-xs text-[var(--text-secondary)]">
                    {formatDate(c.createdAt)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-[var(--text)]">
                  {c.text}
                </p>
              </div>
              {(user?.uid === c.uid || isAdmin) && (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-shrink-0 self-start rounded-lg p-1 text-[var(--text-secondary)] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  aria-label="Xóa bình luận"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? ""}
              width={36}
              height={36}
              className="h-9 w-9 flex-shrink-0 rounded-full"
            />
          ) : (
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {(user.displayName ?? "U")[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Viết bình luận..."
              rows={3}
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-secondary)] outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!text.trim() || submitting}
                className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {submitting ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
          <p className="flex-1 text-sm text-[var(--text-secondary)]">
            Đăng nhập để bình luận.
          </p>
          <button
            onClick={() => signInWithPopup(auth, googleProvider)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1.5 text-sm font-medium text-[var(--text)] transition-all hover:border-indigo-400 hover:shadow-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Đăng nhập bằng Google
          </button>
        </div>
      )}
    </section>
  );
}
