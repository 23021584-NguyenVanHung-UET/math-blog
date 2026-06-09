import Link from "next/link";

export const metadata = {
  title: "Giới thiệu | Math Blog",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--link)] transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">Giới thiệu</span>
      </nav>

      <h1 className="mb-6 text-xl font-bold text-[var(--text)]">Giới thiệu</h1>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-8">
        <div className="prose prose-sm max-w-none text-[var(--text-secondary)] prose-headings:text-[var(--text)] prose-headings:font-semibold prose-strong:text-[var(--text)] prose-a:text-[var(--link)] prose-a:no-underline hover:prose-a:underline">
          <p>
            Chào mừng đến với <strong>Math Blog</strong> — nơi chia sẻ kiến thức toán học
            từ cơ bản đến nâng cao, viết bằng tiếng Việt, miễn phí hoàn toàn.
          </p>

          <h2>3 chủ đề chính</h2>
          <ul>
            <li>
              <strong>Bài tập:</strong> Giải đề chi tiết từng bước, có lý giải rõ ràng —
              thích hợp cho học sinh luyện thi và sinh viên ôn tập.
            </li>
            <li>
              <strong>Lý thuyết:</strong> Định lý, chứng minh, khái niệm nền tảng —
              xây dựng hiểu biết vững chắc từ gốc rễ.
            </li>
            <li>
              <strong>Ứng dụng:</strong> Toán học trong thực tiễn, lập trình, kỹ thuật và khoa học.
            </li>
          </ul>

          <h2>Công nghệ</h2>
          <p>
            Blog được xây dựng với <strong>Next.js</strong>, nội dung viết bằng <strong>MDX</strong>,
            công thức toán hiển thị qua <strong>KaTeX</strong>.
            Deploy trên <strong>Cloudflare Pages</strong>, bình luận qua <strong>Firestore</strong>.
          </p>

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
