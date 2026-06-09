import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <Link href="/" className="mb-3 inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a] text-sm font-black text-white dark:bg-indigo-600">
                ∑
              </span>
              <span className="text-base font-bold tracking-tight text-[var(--text)]">Math Blog</span>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Kiến thức toán học từ cơ bản đến nâng cao, ứng dụng trong AI & Machine Learning.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Chủ đề</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/category/bai-tap", label: "Bài tập" },
                { href: "/category/ly-thuyet", label: "Lý thuyết" },
                { href: "/category/ai-ml", label: "AI & ML" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Liên kết</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about", label: "Giới thiệu", external: false },
                { href: "https://github.com/23021584-NguyenVanHung-UET", label: "GitHub", external: true },
                { href: "/rss.xml", label: "RSS Feed", external: false },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} Math Blog — Tất cả nội dung được chia sẻ miễn phí.
        </div>
      </div>
    </footer>
  );
}
