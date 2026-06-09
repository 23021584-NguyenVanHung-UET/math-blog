import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-lg prose-gray max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-gray-950 prose-pre:text-sm">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex as never],
          },
        }}
      />
    </div>
  );
}
