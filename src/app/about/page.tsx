export const metadata = {
  title: "Giới thiệu | Math Blog",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Giới thiệu</h1>
      <div className="prose prose-lg prose-gray dark:prose-invert">
        <p>
          Chào mừng bạn đến với <strong>Math Blog</strong> — nơi chia sẻ kiến thức toán học
          từ cơ bản đến nâng cao, bao gồm bài tập có lời giải, lý thuyết nền tảng,
          và ứng dụng toán học trong AI & Machine Learning.
        </p>
        <h2>3 chủ đề chính</h2>
        <ul>
          <li><strong>Bài tập:</strong> Giải đề, bài tập có lời giải từng bước</li>
          <li><strong>Lý thuyết:</strong> Định lý, chứng minh, khái niệm nền tảng</li>
          <li><strong>AI & ML:</strong> Toán đứng sau các thuật toán ML/DL</li>
        </ul>
        <p>
          Blog sử dụng KaTeX để hiển thị công thức toán học đẹp và nhanh.
          Nội dung được viết bằng MDX, cho phép kết hợp Markdown với các component React.
        </p>
      </div>
    </div>
  );
}
