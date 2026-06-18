export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type BlogPostInput = Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt"> & {
  slug?: string;
};
