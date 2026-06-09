import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                ∑
              </span>
              <span className="text-lg font-bold text-[var(--text)]">Math Blog</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Chia sẻ kiến thức toán học từ cơ bản đến nâng cao, ứng dụng trong AI & Machine Learning.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--text)]">Chủ đề</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/bai-tap" className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600">
                  📝 Bài tập
                </Link>
              </li>
              <li>
                <Link href="/category/ly-thuyet" className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600">
                  📐 Lý thuyết
                </Link>
              </li>
              <li>
                <Link href="/category/ai-ml" className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600">
                  🤖 AI & ML
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-[var(--text)]">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/23021584-NguyenVanHung-UET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
                >
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} Math Blog. Tất cả nội dung được chia sẻ miễn phí.
        </div>
      </div>
    </footer>
  );
}
