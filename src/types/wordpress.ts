export type WordPressRawPost = {
  id: number;
  date: string;
  date_gmt: string;
  guid?: { rendered: string };
  modified?: string;
  modified_gmt?: string;
  slug: string;
  status?: string;
  type?: string;
  link: string;
  title?: { rendered: string };
  content?: { rendered: string; protected?: boolean };
  excerpt?: { rendered: string; protected?: boolean };
  author?: number;
  featured_media?: number;
  jetpack_featured_media_url?: string;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      url?: string;
      description?: string;
      link?: string;
      slug?: string;
      avatar_urls?: Record<string, string>;
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text?: string;
      title?: { rendered: string };
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
};

export type WordPressPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  link: string;
};
