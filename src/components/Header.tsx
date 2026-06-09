"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthButton from "./AuthButton";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/category/bai-tap",   label: "Bài tập" },
  { href: "/category/ly-thuyet", label: "Lý thuyết" },
  { href: "/category/ai-ml",     label: "Ứng dụng" },
  { href: "/about",              label: "Giới thiệu" },
];

export default function Header() {
  const pathname  = usePathname();
  const { isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center gap-4 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="mr-2 flex items-center gap-2 py-3 font-bold text-[var(--text)] hover:text-[var(--link)] transition-colors">
          <span className="font-black text-[var(--link)]">∑</span>
          Math Blog
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-3 py-1.5 text-sm transition-colors ${
                pathname.startsWith(item.href)
                  ? "font-medium text-[var(--link)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className={`rounded px-3 py-1.5 text-sm transition-colors ${
              pathname === "/search"
                ? "font-medium text-[var(--link)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text)]"
            }`}
          >
            Tìm kiếm
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={`rounded px-3 py-1.5 text-sm transition-colors ${
                pathname === "/admin"
                  ? "font-medium text-[var(--link)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={toggleDark}
            className="rounded p-1.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            aria-label="Đổi giao diện sáng/tối"
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

          <div className="hidden md:flex">
            <AuthButton />
          </div>

          {/* Mobile hamburger */}
          <button
            className="rounded p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Mở menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--nav-bg)] px-4 pb-3 md:hidden">
          <div className="space-y-0.5 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded px-3 py-2 text-sm ${
                  pathname.startsWith(item.href)
                    ? "font-medium text-[var(--link)]"
                    : "text-[var(--text-secondary)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="block rounded px-3 py-2 text-sm text-[var(--text-secondary)]"
              onClick={() => setMenuOpen(false)}
            >
              Tìm kiếm
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="block rounded px-3 py-2 text-sm text-[var(--text-secondary)]"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="px-1 pt-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
