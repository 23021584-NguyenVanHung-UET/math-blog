"use client";

import { useEffect, useState } from "react";
import {
  collection, getDocs, doc, updateDoc, deleteDoc,
  orderBy, query, collectionGroup,
} from "firebase/firestore";
import { db, ADMIN_EMAILS } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

interface UserRecord {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  firstLogin: { seconds: number } | null;
  lastLogin: { seconds: number } | null;
  loginCount: number;
  banned: boolean;
}

interface CommentRecord {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string | null;
  text: string;
  createdAt: { seconds: number } | null;
  postSlug: string;
}

type Tab = "stats" | "users" | "comments";

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("vi-VN", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
      <div className="mb-2 text-2xl">{icon}</div>
      <div className="text-2xl font-bold text-[var(--text)]">{value}</div>
      <div className="text-sm text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("stats");
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    setFetching(true);

    Promise.all([
      getDocs(query(collection(db, "users"), orderBy("lastLogin", "desc")))
        .then((snap) => setUsers(snap.docs.map((d) => d.data() as UserRecord))),

      getDocs(query(collectionGroup(db, "messages"), orderBy("createdAt", "desc")))
        .then((snap) =>
          setComments(
            snap.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<CommentRecord, "id" | "postSlug">),
              postSlug: d.ref.parent.parent?.id ?? "",
            }))
          )
        ),
    ]).finally(() => setFetching(false));
  }, [isAdmin]);

  async function toggleBan(uid: string, current: boolean) {
    await updateDoc(doc(db, "users", uid), { banned: !current });
    setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, banned: !current } : u)));
  }

  async function deleteComment(postSlug: string, commentId: string) {
    await deleteDoc(doc(db, "comments", postSlug, "messages", commentId));
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-[var(--text)]">
        <p className="text-lg font-medium">Bạn chưa đăng nhập.</p>
        <Link href="/" className="text-indigo-600 hover:underline">Về trang chủ</Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-[var(--text)]">
        <p className="text-4xl">🚫</p>
        <p className="text-lg font-medium">Bạn không có quyền truy cập trang này.</p>
        <Link href="/" className="text-indigo-600 hover:underline">Về trang chủ</Link>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      (u.displayName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const bannedCount = users.filter((u) => u.banned).length;
  const totalLogins = users.reduce((s, u) => s + (u.loginCount ?? 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text)]">Admin Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 border-b border-[var(--border)]">
        {([
          { key: "stats", label: "Thống kê" },
          { key: "users", label: `Người dùng (${users.length})` },
          { key: "comments", label: `Bình luận (${comments.length})` },
        ] as { key: Tab; label: string }[]).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-[var(--text-secondary)] hover:text-[var(--text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {fetching ? (
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          Đang tải dữ liệu...
        </div>
      ) : (
        <>
          {/* STATS TAB */}
          {tab === "stats" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard label="Tổng người dùng" value={users.length} icon="👥" />
                <StatCard label="Tổng bình luận" value={comments.length} icon="💬" />
                <StatCard label="Tổng lượt đăng nhập" value={totalLogins} icon="🔑" />
                <StatCard label="Tài khoản bị ban" value={bannedCount} icon="🚫" />
              </div>

              {/* Recent users */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
                <h3 className="mb-4 font-semibold text-[var(--text)]">Người dùng mới nhất</h3>
                <div className="space-y-3">
                  {users.slice(0, 5).map((u) => (
                    <div key={u.uid} className="flex items-center gap-3">
                      {u.photoURL ? (
                        <Image src={u.photoURL} alt={u.displayName ?? ""} width={32} height={32} className="rounded-full" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                          {(u.displayName ?? "?")[0].toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text)] truncate">{u.displayName}</p>
                        <p className="text-xs text-[var(--text-secondary)] truncate">{u.email}</p>
                      </div>
                      <span className="text-xs text-[var(--text-secondary)]">{formatDate(u.lastLogin)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent comments */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
                <h3 className="mb-4 font-semibold text-[var(--text)]">Bình luận gần đây</h3>
                <div className="space-y-3">
                  {comments.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--text)]">{c.displayName}</span>
                        <Link href={`/posts/${c.postSlug}`} className="text-xs text-indigo-600 hover:underline">
                          /{c.postSlug}
                        </Link>
                        <span className="ml-auto text-xs text-[var(--text-secondary)]">{formatDate(c.createdAt)}</span>
                      </div>
                      <p className="line-clamp-1 text-sm text-[var(--text-secondary)]">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {tab === "users" && (
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên hoặc email..."
                className="mb-4 w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-secondary)] outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      <th className="px-4 py-3">Người dùng</th>
                      <th className="hidden px-4 py-3 md:table-cell">Đăng nhập đầu</th>
                      <th className="hidden px-4 py-3 lg:table-cell">Đăng nhập cuối</th>
                      <th className="px-4 py-3 text-center">Lượt</th>
                      <th className="px-4 py-3 text-center">Trạng thái</th>
                      <th className="px-4 py-3 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-[var(--text-secondary)]">Không tìm thấy.</td></tr>
                    )}
                    {filteredUsers.map((u) => (
                      <tr key={u.uid} className={u.banned ? "opacity-50" : ""}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {u.photoURL ? (
                              <Image src={u.photoURL} alt={u.displayName ?? ""} width={36} height={36} className="rounded-full" />
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                                {(u.displayName ?? "?")[0].toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-[var(--text)]">{u.displayName ?? "Ẩn danh"}</p>
                              <p className="text-xs text-[var(--text-secondary)]">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 text-[var(--text-secondary)] md:table-cell">{formatDate(u.firstLogin)}</td>
                        <td className="hidden px-4 py-3 text-[var(--text-secondary)] lg:table-cell">{formatDate(u.lastLogin)}</td>
                        <td className="px-4 py-3 text-center text-[var(--text)]">{u.loginCount ?? 0}</td>
                        <td className="px-4 py-3 text-center">
                          {u.banned ? (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">Bị ban</span>
                          ) : (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Hoạt động</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {u.email && ADMIN_EMAILS.includes(u.email) ? (
                            <span className="text-xs text-[var(--text-secondary)]">Admin</span>
                          ) : (
                            <button
                              onClick={() => toggleBan(u.uid, u.banned)}
                              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                                u.banned
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {u.banned ? "Mở ban" : "Ban"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COMMENTS TAB */}
          {tab === "comments" && (
            <div className="space-y-3">
              {comments.length === 0 && (
                <p className="text-sm text-[var(--text-secondary)]">Chưa có bình luận nào.</p>
              )}
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
                  {c.photoURL ? (
                    <Image src={c.photoURL} alt={c.displayName} width={36} height={36} className="h-9 w-9 flex-shrink-0 rounded-full" />
                  ) : (
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      {c.displayName[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--text)]">{c.displayName}</span>
                      <Link href={`/posts/${c.postSlug}`} className="text-xs text-indigo-600 hover:underline">
                        /posts/{c.postSlug}
                      </Link>
                      <span className="text-xs text-[var(--text-secondary)]">{formatDate(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-[var(--text)]">{c.text}</p>
                  </div>
                  <button
                    onClick={() => deleteComment(c.postSlug, c.id)}
                    className="flex-shrink-0 self-start rounded-lg p-1 text-[var(--text-secondary)] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    aria-label="Xóa"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
