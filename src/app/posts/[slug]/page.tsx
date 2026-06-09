import { getAllPosts, getPostBySlug, getRelatedPosts, SITE_URL } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import MdxContent from "@/components/MdxContent";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ViewCounter from "@/components/ViewCounter";
import ShareButton from "@/components/ShareButton";
import RelatedPosts from "@/components/RelatedPosts";
import Comments from "@/components/Comments";
import BookmarkButton from "@/components/BookmarkButton";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);
  const url = `${SITE_URL}/posts/${slug}`;
  return {
    title: `${frontmatter.title} | Math Blog`,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title, description: frontmatter.summary,
      url, siteName: "Math Blog", type: "article",
      publishedTime: frontmatter.date, tags: frontmatter.tags,
    },
    twitter: { card: "summary_large_image", title: frontmatter.title, description: frontmatter.summary },
  };
}

const CATEGORY_NAME: Record<string, string> = {
  "bai-tap":   "Bài tập",
  "ly-thuyet": "Lý thuyết",
  "ai-ml":     "Ứng dụng",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content, readingTime } = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug);

  return (
    <>
      <ReadingProgress />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 py-4 text-sm text-[var(--text-muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--link)]">Trang chủ</Link>
          <span>/</span>
          <Link
            href={`/category/${frontmatter.category}`}
            className="transition-colors hover:text-[var(--link)]"
          >
            {CATEGORY_NAME[frontmatter.category] ?? frontmatter.category}
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-[var(--text-secondary)]">{frontmatter.title}</span>
        </nav>

        {/* Post header */}
        <header className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-6 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
            <CategoryBadge category={frontmatter.category} />
            <span>·</span>
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString("vi-VN", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{readingTime} phút đọc</span>
            <ViewCounter slug={slug} />
          </div>

          <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-[var(--text)] sm:text-3xl">
            {frontmatter.title}
          </h1>

          <p className="mb-4 text-[var(--text-secondary)]">{frontmatter.summary}</p>

          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-md border border-[var(--border)] bg-[var(--tag-bg)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--link)]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Content + TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_210px] lg:gap-10">
          <div className="min-w-0">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-8 shadow-sm sm:px-8">
              <article>
                <MdxContent source={content} />
              </article>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ShareButton title={frontmatter.title} slug={slug} />
              <BookmarkButton
                slug={slug}
                title={frontmatter.title}
                date={frontmatter.date}
                category={frontmatter.category}
                summary={frontmatter.summary}
              />
            </div>

            <RelatedPosts posts={relatedPosts} />
            <Comments slug={slug} />
          </div>

          <TableOfContents />
        </div>
      </div>
    </>
  );
}
