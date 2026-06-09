import { getAllPosts, getPostBySlug } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import MdxContent from "@/components/MdxContent";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ViewCounter from "@/components/ViewCounter";
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
    <>
      <ReadingProgress />

      {/* Post header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-indigo-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Về trang chủ
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
            <CategoryBadge category={frontmatter.category} />
            <span>·</span>
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{readingTime} phút đọc</span>
            <ViewCounter slug={slug} />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[var(--text)] sm:text-4xl">
            {frontmatter.title}
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-[var(--text-secondary)]">{frontmatter.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1 text-xs text-[var(--text-secondary)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article className="min-w-0">
            <MdxContent source={content} />
          </article>
          <TableOfContents />
        </div>
      </div>
    </>
  );
}
