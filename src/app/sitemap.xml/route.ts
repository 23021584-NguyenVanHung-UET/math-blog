import { getAllPosts, getAllCategories, SITE_URL } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const urls = [
    { loc: SITE_URL, priority: "1.0" },
    { loc: `${SITE_URL}/about`, priority: "0.5" },
    { loc: `${SITE_URL}/search`, priority: "0.5" },
    ...categories.map((c) => ({ loc: `${SITE_URL}/category/${c.slug}`, priority: "0.7" })),
    ...posts.map((p) => ({ loc: `${SITE_URL}/posts/${p.slug}`, priority: "0.8" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
