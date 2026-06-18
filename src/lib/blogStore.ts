import type { BlogPost, BlogPostInput } from "@/types/blog";

const STORAGE_KEY = "orbigreen_blogs_v1";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function uniqueSlug(base: string, posts: BlogPost[], excludeId?: string): string {
  let slug = base || "post";
  let counter = 1;

  while (posts.some((post) => post.slug === slug && post.id !== excludeId)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

function readStorage(): BlogPost[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStorage(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export async function loadSeedBlogs(): Promise<BlogPost[]> {
  const response = await fetch("/data/blogs.json");
  if (!response.ok) return [];
  return (await response.json()) as BlogPost[];
}

export async function loadBlogs(): Promise<BlogPost[]> {
  const stored = readStorage();
  if (stored) return stored.sort((a, b) => sortByDate(b) - sortByDate(a));

  const seed = await loadSeedBlogs();
  writeStorage(seed);
  return seed.sort((a, b) => sortByDate(b) - sortByDate(a));
}

function sortByDate(post: BlogPost): number {
  const value = post.publishedAt ?? post.updatedAt ?? post.createdAt;
  return new Date(value).getTime();
}

export function getPublishedPosts(posts: BlogPost[]): BlogPost[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => sortByDate(b) - sortByDate(a));
}

export function getPostBySlug(posts: BlogPost[], slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug && post.published);
}

export function createPost(posts: BlogPost[], input: BlogPostInput): BlogPost[] {
  const now = new Date().toISOString();
  const baseSlug = slugify(input.slug?.trim() || input.title);
  const next: BlogPost = {
    id: `blog-${crypto.randomUUID()}`,
    slug: uniqueSlug(baseSlug, posts),
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content.trim(),
    author: input.author.trim(),
    category: input.category.trim(),
    coverImage: input.coverImage?.trim() || undefined,
    tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    published: input.published,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.published ? input.publishedAt ?? now : undefined,
  };

  const updated = [next, ...posts];
  writeStorage(updated);
  return updated;
}

export function updatePost(posts: BlogPost[], id: string, input: BlogPostInput): BlogPost[] {
  const now = new Date().toISOString();
  const updated = posts.map((post) => {
    if (post.id !== id) return post;

    const baseSlug = slugify(input.slug?.trim() || input.title);
    const wasPublished = post.published;
    const isPublished = input.published;

    return {
      ...post,
      slug: uniqueSlug(baseSlug, posts, id),
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      content: input.content.trim(),
      author: input.author.trim(),
      category: input.category.trim(),
      coverImage: input.coverImage?.trim() || undefined,
      tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
      published: isPublished,
      updatedAt: now,
      publishedAt: isPublished ? post.publishedAt ?? input.publishedAt ?? now : undefined,
      ...(wasPublished && !isPublished ? { publishedAt: undefined } : {}),
    };
  });

  writeStorage(updated);
  return updated;
}

export function deletePost(posts: BlogPost[], id: string): BlogPost[] {
  const updated = posts.filter((post) => post.id !== id);
  writeStorage(updated);
  return updated;
}

export function resetBlogsToSeed(seed: BlogPost[]): BlogPost[] {
  writeStorage(seed);
  return seed;
}
