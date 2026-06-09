import Link from "next/link";

const categoryConfig: Record<string, { name: string; icon: string; className: string }> = {
  "bai-tap": {
    name: "Bài tập",
    icon: "📝",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-400/20",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    icon: "📐",
    className: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-900/30 dark:text-violet-300 dark:ring-violet-400/20",
  },
  "ai-ml": {
    name: "AI & ML",
    icon: "🤖",
    className: "bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-900/30 dark:text-orange-300 dark:ring-orange-400/20",
  },
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? {
    name: category,
    icon: "📌",
    className: "bg-gray-100 text-gray-800 ring-gray-600/20",
  };

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-opacity hover:opacity-80 ${config.className}`}
    >
      <span>{config.icon}</span>
      {config.name}
    </Link>
  );
}
