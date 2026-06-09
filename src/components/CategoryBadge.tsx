import Link from "next/link";

const categoryConfig: Record<string, { name: string; className: string }> = {
  "bai-tap": {
    name: "Bài tập",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    className: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  "ai-ml": {
    name: "Ứng dụng",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? {
    name: category,
    className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium transition-opacity hover:opacity-75 ${config.className}`}
    >
      {config.name}
    </Link>
  );
}
