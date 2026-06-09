import { getAllPosts, getPostBySlug } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import MdxContent from "@/components/MdxContent";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const { frontmatter } = getPostBySlug(slug);
    return {
      title: `${frontmatter.title} | Math Blog`,
      description: frontmatter.summary,
    };
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content, readingTime } = getPostBySlug(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        &larr; Về trang chủ
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article>
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <CategoryBadge category={frontmatter.category} />
              <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-sm text-gray-400 dark:text-gray-500">{readingTime} phút đọc</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <MdxContent source={content} />
        </article>

        <TableOfContents />
      </div>
    </div>
  );
}
