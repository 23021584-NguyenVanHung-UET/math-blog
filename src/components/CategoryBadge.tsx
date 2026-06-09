import Link from "next/link";

const categoryConfig: Record<string, { name: string; dot: string; className: string }> = {
  "bai-tap": {
    name: "Bài tập",
    dot: "bg-emerald-500",
    className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    dot: "bg-violet-500",
    className: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  },
  "ai-ml": {
    name: "AI & ML",
    dot: "bg-orange-500",
    className: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  },
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? {
    name: category,
    dot: "bg-slate-400",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-opacity hover:opacity-75 ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.name}
    </Link>
  );
}
