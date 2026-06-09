"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
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

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("vi-VN");
}

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "users"), orderBy("lastLogin", "desc"));
    getDocs(q)
      .then((snap) => {
        setUsers(snap.docs.map((d) => d.data() as UserRecord));
      })
      .finally(() => setFetching(false));
  }, [isAdmin]);

  async function toggleBan(uid: string, current: boolean) {
    await updateDoc(doc(db, "users", uid), { banned: !current });
    setUsers((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, banned: !current } : u))
    );
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
        <Link href="/" className="text-indigo-600 hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-[var(--text)]">
        <p className="text-4xl">🚫</p>
        <p className="text-lg font-medium">Bạn không có quyền truy cập trang này.</p>
        <Link href="/" className="text-indigo-600 hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  const filtered = users.filter(
    (u) =>
      (u.displayName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[var(--text)]">Quản lý người dùng</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          {users.length} người dùng đã đăng ký
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc email..."
          className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-secondary)] outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {fetching ? (
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          Đang tải...
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                <th className="px-4 py-3">Người dùng</th>
                <th className="hidden px-4 py-3 md:table-cell">Lần đầu đăng nhập</th>
                <th className="hidden px-4 py-3 lg:table-cell">Lần cuối đăng nhập</th>
                <th className="px-4 py-3 text-center">Lượt đăng nhập</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[var(--text-secondary)]">
                    Không tìm thấy người dùng nào.
                  </td>
                </tr>
              )}
              {filtered.map((u) => (
                <tr key={u.uid} className={u.banned ? "opacity-50" : ""}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {u.photoURL ? (
                        <Image
                          src={u.photoURL}
                          alt={u.displayName ?? ""}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                          {(u.displayName ?? u.email ?? "?")[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-[var(--text)]">
                          {u.displayName ?? "Ẩn danh"}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-[var(--text-secondary)] md:table-cell">
                    {formatDate(u.firstLogin)}
                  </td>
                  <td className="hidden px-4 py-3 text-[var(--text-secondary)] lg:table-cell">
                    {formatDate(u.lastLogin)}
                  </td>
                  <td className="px-4 py-3 text-center text-[var(--text)]">
                    {u.loginCount ?? 0}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {u.banned ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        Bị ban
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {u.email === user.email ? (
                      <span className="text-xs text-[var(--text-secondary)]">Bạn</span>
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
      )}
    </div>
  );
}
