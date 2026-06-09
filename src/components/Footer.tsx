import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3 text-sm">
          <div>
            <div className="mb-2 flex items-center gap-1.5 font-bold text-[var(--text)]">
              <span className="font-black text-[var(--link)]">∑</span>
              Math Blog
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed text-xs">
              Toán học cho học sinh, sinh viên — nội dung tiếng Việt, miễn phí.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Chủ đề</h4>
            <ul className="space-y-1.5">
              {[
                { href: "/category/bai-tap",   label: "Bài tập" },
                { href: "/category/ly-thuyet", label: "Lý thuyết" },
                { href: "/category/ai-ml",     label: "Ứng dụng" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[var(--text-secondary)] transition-colors hover:text-[var(--link)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Liên kết</h4>
            <ul className="space-y-1.5">
              {[
                { href: "/about",     label: "Giới thiệu",   external: false },
                { href: "/search",    label: "Tìm kiếm",     external: false },
                { href: "https://github.com/23021584-NguyenVanHung-UET", label: "GitHub", external: true },
                { href: "/rss.xml",   label: "RSS Feed",     external: false },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[var(--text-secondary)] transition-colors hover:text-[var(--link)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} Math Blog
        </div>
      </div>
    </footer>
  );
}
