import Link from "next/link";

const categoryConfig: Record<string, { name: string; className: string }> = {
  "bai-tap": {
    name: "Bài tập",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  "ly-thuyet": {
    name: "Lý thuyết",
    className: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  },
  "ai-ml": {
    name: "AI & ML",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
};

export default function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? {
    name: category,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${config.className} transition-opacity hover:opacity-80`}
    >
      {config.name}
    </Link>
  );
}
