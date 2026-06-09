"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const categories = [
  { slug: "bai-tap", name: "Bài tập", icon: "📝" },
  { slug: "ly-thuyet", name: "Lý thuyết", icon: "📐" },
  { slug: "ai-ml", name: "AI & ML", icon: "🤖" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--bg)]/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-[var(--bg)]/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white transition-transform group-hover:scale-110">
            ∑
          </span>
          <span className="text-lg font-bold text-[var(--text)]">Math Blog</span>
        </Link>

        <button
          className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] md:hidden"
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

        <div className="hidden items-center gap-1 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                pathname === `/category/${cat.slug}`
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              pathname === "/about"
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
            }`}
          >
            Giới thiệu
          </Link>

          <div className="ml-2 h-5 w-px bg-[var(--border)]" />

          <button
            onClick={toggleDark}
            className="ml-2 rounded-lg p-2 text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[var(--border)] px-4 pb-4 md:hidden">
          <div className="space-y-1 pt-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === `/category/${cat.slug}`
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              onClick={() => setMenuOpen(false)}
            >
              Giới thiệu
            </Link>
            <button
              onClick={toggleDark}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
            >
              {dark ? "☀️ Chế độ sáng" : "🌙 Chế độ tối"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
