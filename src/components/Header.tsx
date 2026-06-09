"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthButton from "./AuthButton";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/category/bai-tap", label: "Bài tập" },
  { href: "/category/ly-thuyet", label: "Lý thuyết" },
  { href: "/category/ai-ml", label: "AI & ML" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/search", label: "Tìm kiếm" },
];

export default function Header() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-sm shadow-slate-200/50 dark:shadow-slate-950/50" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a] text-sm font-black text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-indigo-600">
            ∑
          </span>
          <span className="text-base font-bold tracking-tight text-[var(--text)]">Math Blog</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                pathname === "/admin"
                  ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
              }`}
            >
              Admin
            </Link>
          )}

          <div className="mx-2 h-4 w-px bg-[var(--border)]" />

          <AuthButton />

          <div className="mx-1 h-4 w-px bg-[var(--border)]" />

          <button
            onClick={toggleDark}
            className="rounded-lg p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] px-4 pb-4 md:hidden">
          <div className="space-y-0.5 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  pathname === item.href
                    ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="block rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <button
              onClick={toggleDark}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
            >
              {dark ? "Chế độ sáng" : "Chế độ tối"}
            </button>
            <div className="px-1 py-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
