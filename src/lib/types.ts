export interface PostFrontmatter {
  title: string;
  date: string;
  category: "bai-tap" | "ly-thuyet" | "ai-ml";
  tags: string[];
  summary: string;
  difficulty: string;
  published: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: number;
}
