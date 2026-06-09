import Link from "next/link";

export const metadata = { title: "Giới thiệu | Math Blog" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--link)]">Trang chủ</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">Giới thiệu</span>
      </nav>

      <h1 className="mb-6 text-xl font-bold text-[var(--text)]">Giới thiệu</h1>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
        <div className="prose prose-sm max-w-none text-[var(--text-secondary)] prose-headings:text-[var(--text)] prose-headings:font-semibold prose-strong:text-[var(--text)] prose-a:text-[var(--link)] prose-a:no-underline hover:prose-a:underline">
          <p>
            Chào mừng đến với <strong>Math Blog</strong> — nơi chia sẻ kiến thức toán học
            từ cơ bản đến nâng cao, viết bằng tiếng Việt, miễn phí hoàn toàn.
          </p>
          <h2>3 chủ đề chính</h2>
          <ul>
            <li><strong>Bài tập:</strong> Giải đề chi tiết từng bước, có lý giải rõ ràng.</li>
            <li><strong>Lý thuyết:</strong> Định lý, chứng minh, khái niệm nền tảng.</li>
            <li><strong>Ứng dụng:</strong> Toán học trong thực tiễn, lập trình và kỹ thuật.</li>
          </ul>
          <h2>Công nghệ</h2>
          <p>Next.js · Tailwind CSS · MDX · KaTeX · Firebase · Cloudflare Pages</p>
          <h2>Liên hệ</h2>
          <p>
            Mã nguồn trên{" "}
            <a href="https://github.com/23021584-NguyenVanHung-UET" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
