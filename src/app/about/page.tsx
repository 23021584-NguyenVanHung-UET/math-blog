export const metadata = {
  title: "Giới thiệu | Math Blog",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--text)]">Giới thiệu</h1>
      <p className="mb-8 text-[var(--text-secondary)]">Về Math Blog và người đứng sau nó.</p>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-8">
        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-headings:text-[var(--text)] prose-strong:text-[var(--text)] prose-a:text-indigo-600">
          <p>
            Chào mừng bạn đến với <strong>Math Blog</strong> — nơi chia sẻ kiến thức toán học
            từ cơ bản đến nâng cao, bao gồm bài tập có lời giải, lý thuyết nền tảng,
            và ứng dụng toán học trong AI & Machine Learning.
          </p>
          <h2>3 chủ đề chính</h2>
          <ul>
            <li><strong>📝 Bài tập:</strong> Giải đề, bài tập có lời giải từng bước</li>
            <li><strong>📐 Lý thuyết:</strong> Định lý, chứng minh, khái niệm nền tảng</li>
            <li><strong>🤖 AI & ML:</strong> Toán đứng sau các thuật toán ML/DL</li>
          </ul>
          <p>
            Blog sử dụng <strong>KaTeX</strong> để hiển thị công thức toán học đẹp và nhanh.
            Nội dung được viết bằng MDX, cho phép kết hợp Markdown với các component React.
          </p>
          <h2>Công nghệ</h2>
          <p>
            Next.js · Tailwind CSS · MDX · KaTeX · Cloudflare Pages
          </p>
        </div>
      </div>
    </div>
  );
}
