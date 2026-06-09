import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeShiki from "@shikijs/rehype";

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-pre:rounded-xl prose-pre:border prose-pre:border-[var(--border)] prose-pre:bg-[#0d1117] prose-pre:text-sm prose-code:before:content-none prose-code:after:content-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [
              rehypeKatex as never,
              [rehypeShiki as never, { theme: "github-dark" }],
            ],
          },
        }}
      />
    </div>
  );
}
