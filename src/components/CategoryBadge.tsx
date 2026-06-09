import Link from "next/link";

const categoryConfig: Record<string, { name: string; className: string }> = {
  "bai-tap": {
    name: "Bài tập",
    className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-800/50",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    className: "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-800/50",
  },
  "ai-ml": {
    name: "Ứng dụng",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800/50",
  },
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? {
    name: category,
    className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium transition-opacity hover:opacity-75 ${config.className}`}
    >
      {config.name}
    </Link>
  );
}
