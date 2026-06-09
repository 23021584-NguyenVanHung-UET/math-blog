"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    const items = elements.map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "",
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));

    elements.forEach((el, i) => {
      if (!el.id) el.id = items[i].id;
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-24">
        <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Mục lục</h4>
        <ul className="space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
          {headings.map((heading) => (
            <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12 + 12}px` }}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm leading-relaxed transition-colors ${
                  activeId === heading.id
                    ? "font-medium text-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
