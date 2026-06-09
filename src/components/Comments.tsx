"use client";

import { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector(".giscus")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "23021584-NguyenVanHung-UET/math-blog");
    script.setAttribute("data-repo-id", "R_kgDOS1TYHQ");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOS1TYHc4C-0f_");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "vi");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h3 className="mb-6 text-lg font-bold text-[var(--text)]">Bình luận</h3>
      <div ref={ref} />
    </section>
  );
}
