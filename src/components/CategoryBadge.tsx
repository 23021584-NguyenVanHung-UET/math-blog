import Link from "next/link";

const categoryConfig: Record<string, { name: string; className: string }> = {
  "bai-tap": {
    name: "Bài tập",
    className:
      "bg-blue-500/15 text-blue-300 border border-blue-400/25 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/25",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    className:
      "bg-violet-500/15 text-violet-300 border border-violet-400/25 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/25",
  },
  "ai-ml": {
    name: "Ứng dụng",
    className:
      "bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/25",
  },
};

/* Light mode overrides — higher contrast on light glass */
const lightOverride: Record<string, string> = {
  "bai-tap":   "text-blue-700 dark:text-blue-300",
  "ly-thuyet": "text-violet-700 dark:text-violet-300",
  "ai-ml":     "text-emerald-700 dark:text-emerald-300",
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? {
    name: category,
    className:
      "bg-slate-500/15 text-slate-300 border border-slate-400/25 dark:bg-slate-600/20",
  };

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium backdrop-blur-sm transition-opacity hover:opacity-75 ${config.className} ${lightOverride[category] ?? ""}`}
    >
      {config.name}
    </Link>
  );
}
