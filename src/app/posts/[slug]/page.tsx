import { getAllPosts, getPostBySlug, getRelatedPosts, SITE_URL } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import MdxContent from "@/components/MdxContent";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ViewCounter from "@/components/ViewCounter";
import ShareButton from "@/components/ShareButton";
import RelatedPosts from "@/components/RelatedPosts";
import Comments from "@/components/Comments";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);
  const url = `${SITE_URL}/posts/${slug}`;

  return {
    title: `${frontmatter.title} | Math Blog`,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      url,
      siteName: "Math Blog",
      type: "article",
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.summary,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content, readingTime } = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug);

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
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-indigo-300 hover:text-indigo-600"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div className="min-w-0">
            <article>
              <MdxContent source={content} />
            </article>

            <div className="mt-10 border-t border-[var(--border)] pt-6">
              <ShareButton title={frontmatter.title} slug={slug} />
            </div>

            <RelatedPosts posts={relatedPosts} />
            <Comments />
          </div>
          <TableOfContents />
        </div>
      </div>
    </>
  );
}
