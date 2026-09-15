import type { WordPressPost, WordPressRawPost } from "@/types/wordpress";

const PRIMARY_WP_API_URL = "https://public-api.wordpress.com/wp/v2/sites/blog.orbigreentech.wordpress.com/posts?_embed";
const FALLBACK_WP_API_URL = "https://blog.orbigreentech.wordpress.com/wp-json/wp/v2/posts?_embed";

export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

export function stripHtml(html: string): string {
  if (!html) return "";
  const cleaned = html.replace(/<[^>]*>?/gm, "").trim();
  return decodeHtmlEntities(cleaned);
}

function extractFirstImageFromHtml(html?: string): string | undefined {
  if (!html) return undefined;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

export function normalizeWordPressPost(raw: WordPressRawPost): WordPressPost {
  const title = decodeHtmlEntities(raw.title?.rendered ?? "Untitled Post");
  const rawExcerpt = raw.excerpt?.rendered ?? "";
  const excerpt = stripHtml(rawExcerpt) || decodeHtmlEntities(stripHtml(raw.content?.rendered ?? "")).slice(0, 160) + "...";
  const content = raw.content?.rendered ?? "";

  let featuredImage: string | undefined = undefined;
  if (raw._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    featuredImage = raw._embedded["wp:featuredmedia"][0].source_url;
  } else if (raw.jetpack_featured_media_url && raw.jetpack_featured_media_url.trim()) {
    featuredImage = raw.jetpack_featured_media_url;
  } else {
    featuredImage = extractFirstImageFromHtml(content);
  }

  const author = raw._embedded?.author?.[0]?.name
    ? decodeHtmlEntities(raw._embedded.author[0].name)
    : "Orbigreen Editorial";

  const categories: string[] = [];
  const tags: string[] = [];

  if (raw._embedded?.["wp:term"]) {
    for (const termGroup of raw._embedded["wp:term"]) {
      for (const term of termGroup) {
        if (term.taxonomy === "category" && term.name && term.name !== "Uncategorized") {
          categories.push(decodeHtmlEntities(term.name));
        } else if (term.taxonomy === "post_tag" && term.name) {
          tags.push(decodeHtmlEntities(term.name));
        }
      }
    }
  }

  if (categories.length === 0) {
    categories.push("Article");
  }

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    excerpt,
    content,
    date: raw.date,
    author,
    categories,
    tags,
    featuredImage,
    link: raw.link,
  };
}

export async function fetchWordPressPosts(): Promise<WordPressPost[]> {
  try {
    let response: Response | null = null;
    try {
      response = await fetch(PRIMARY_WP_API_URL);
    } catch {
      response = null;
    }

    if (!response || !response.ok) {
      response = await fetch(FALLBACK_WP_API_URL);
    }

    if (!response.ok) {
      throw new Error(`WordPress API returned status ${response.status}`);
    }

    const rawPosts = (await response.json()) as WordPressRawPost[];
    if (!Array.isArray(rawPosts)) return [];

    return rawPosts.map(normalizeWordPressPost);
  } catch (err) {
    console.warn("Failed to fetch WordPress posts:", err);
    return [];
  }
}

export async function fetchWordPressPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await fetchWordPressPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
