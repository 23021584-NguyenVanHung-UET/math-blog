import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

/* Floating math symbols for hero background */
const FLOAT_SYMBOLS = [
  { sym: "∑", x: "7%",  y: "16%", size: "3.8rem", delay: "0s",    dur: "8s",  anim: "math-float" },
  { sym: "∫", x: "88%", y: "10%", size: "5rem",   delay: "1.3s",  dur: "10s", anim: "math-drift" },
  { sym: "π", x: "78%", y: "68%", size: "3.2rem", delay: "2.1s",  dur: "9s",  anim: "math-float" },
  { sym: "∞", x: "16%", y: "75%", size: "2.8rem", delay: "0.7s",  dur: "11s", anim: "math-drift" },
  { sym: "√", x: "53%", y: "84%", size: "2.4rem", delay: "3.2s",  dur: "8s",  anim: "math-float" },
  { sym: "∂", x: "93%", y: "45%", size: "3rem",   delay: "2s",    dur: "9.5s",anim: "math-drift" },
  { sym: "Δ", x: "2%",  y: "50%", size: "2.4rem", delay: "4.5s",  dur: "10s", anim: "math-float" },
  { sym: "θ", x: "44%", y: "6%",  size: "2.2rem", delay: "2.8s",  dur: "7.5s",anim: "math-drift" },
  { sym: "≡", x: "65%", y: "28%", size: "2.2rem", delay: "5s",    dur: "8.5s",anim: "math-float" },
  { sym: "±", x: "30%", y: "90%", size: "2rem",   delay: "3.8s",  dur: "9s",  anim: "math-drift" },
];

const CATEGORY_META: Record<string, {
  name: string; desc: string; sym: string;
  light: string; dark: string; symColor: string; arrow: string;
}> = {
  "bai-tap": {
    name: "Bài tập",
    desc: "Giải đề từng bước, lời giải chi tiết",
    sym: "∫",
    light: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
    dark:  "dark:bg-emerald-950/25 dark:border-emerald-900 dark:hover:border-emerald-700",
    symColor: "text-emerald-300/30 dark:text-emerald-400/20",
    arrow: "text-emerald-600 dark:text-emerald-400",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    desc: "Định lý, chứng minh, khái niệm nền tảng",
    sym: "∑",
    light: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
    dark:  "dark:bg-indigo-950/25 dark:border-indigo-900 dark:hover:border-indigo-700",
    symColor: "text-indigo-300/30 dark:text-indigo-400/20",
    arrow: "text-indigo-600 dark:text-indigo-400",
  },
  "ai-ml": {
    name: "Ứng dụng",
    desc: "Toán học ứng dụng trong thực tiễn",
    sym: "∇",
    light: "bg-violet-50 border-violet-200 hover:border-violet-400",
    dark:  "dark:bg-violet-950/25 dark:border-violet-900 dark:hover:border-violet-700",
    symColor: "text-violet-300/30 dark:text-violet-400/20",
    arrow: "text-violet-600 dark:text-violet-400",
  },
};

export default function Home() {
  const posts      = getAllPosts();
  const categories = getAllCategories();

  const countByCategory = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="relative flex min-h-[78vh] items-center overflow-hidden"
        style={{ background: "linear-gradient(160deg,#04091a 0%,#080f24 55%,#060a1c 100%)" }}
      >
        {/* Dot grid */}
        <div className="hero-dot-grid absolute inset-0 opacity-70" />

        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)" }}
        />

        {/* Floating symbols */}
        {FLOAT_SYMBOLS.map((el, i) => (
          <span
            key={i}
            aria-hidden
            className="hero-symbol pointer-events-none absolute select-none font-black text-indigo-300/10"
            style={{
              left: el.x, top: el.y, fontSize: el.size,
              animationName: el.anim, animationDuration: el.dur,
              animationDelay: el.delay, animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            }}
          >
            {el.sym}
          </span>
        ))}

        {/* Content */}
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
          <div className="max-w-xl">
            <p
              className="hero-reveal mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400"
              style={{ animationDuration: "0.7s", animationFillMode: "both" }}
            >
              Toán học · Học sinh · Sinh viên
            </p>
            <h1
              className="hero-reveal mb-5 text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl"
              style={{ animationDuration: "0.8s", animationDelay: "0.1s", animationFillMode: "both" }}
            >
              Toán học<br />
              <span className="text-indigo-400">đẹp hơn</span><br />
              bạn nghĩ.
            </h1>
            <p
              className="hero-reveal mb-8 max-w-md text-lg leading-relaxed text-slate-400"
              style={{ animationDuration: "0.8s", animationDelay: "0.2s", animationFillMode: "both" }}
            >
              Bài tập có lời giải từng bước, lý thuyết nền tảng — viết bằng tiếng Việt, miễn phí hoàn toàn.
            </p>
            <div
              className="hero-reveal flex flex-wrap gap-3"
              style={{ animationDuration: "0.8s", animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <Link
                href="/category/bai-tap"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                Xem bài tập
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/category/ly-thuyet"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
              >
                Lý thuyết
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Tìm kiếm
              </Link>
            </div>
          </div>

          {/* Hero stat chips */}
          <div
            className="hero-reveal mt-14 flex flex-wrap gap-4"
            style={{ animationDuration: "0.8s", animationDelay: "0.45s", animationFillMode: "both" }}
          >
            {[
              { label: "Bài tập", count: countByCategory["bai-tap"] ?? 0, sym: "∫" },
              { label: "Lý thuyết", count: countByCategory["ly-thuyet"] ?? 0, sym: "∑" },
              { label: "Ứng dụng", count: countByCategory["ai-ml"] ?? 0, sym: "∇" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-1.5">
                <span className="text-base text-indigo-300">{s.sym}</span>
                <span className="text-sm font-semibold text-white">{s.count}</span>
                <span className="text-xs text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="py-14">
          <h2 className="mb-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Chủ đề
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat.slug];
              if (!meta) return null;
              const count = countByCategory[cat.slug] ?? 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${meta.light} ${meta.dark}`}
                >
                  {/* Big decorative symbol */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute right-4 top-2 select-none font-black leading-none ${meta.symColor}`}
                    style={{ fontSize: "5.5rem" }}
                  >
                    {meta.sym}
                  </span>

                  <div className="relative">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                      {count} bài viết
                    </p>
                    <h3 className="mb-1.5 text-xl font-bold text-[var(--text)] transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {meta.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">{meta.desc}</p>

                    <div className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${meta.arrow}`}>
                      Xem tất cả
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Posts ────────────────────────────────── */}
        <section className="border-t border-[var(--border)] py-14">
          <h2 className="mb-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Bài viết mới nhất
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)]">Chưa có bài viết nào.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <div
                  key={post.slug}
                  className="hero-reveal"
                  style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both", animationDuration: "0.6s" }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
