"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const categories = [
  { slug: "bai-tap", name: "Bài tập" },
  { slug: "ly-thuyet", name: "Lý thuyết" },
  { slug: "ai-ml", name: "AI & ML" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          <span className="text-blue-600">∑</span> Math Blog
        </Link>

        <button
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === `/category/${cat.slug}`
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === "/about"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Giới thiệu
            </Link>
          </li>
        </ul>
      </nav>

      {menuOpen && (
        <ul className="border-t border-gray-200 px-4 pb-4 md:hidden dark:border-gray-800">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              Giới thiệu
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
