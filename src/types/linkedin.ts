export interface LinkedInPost {
  id: string;
  title: string;
  embedCode: string;
  imageUrl?: string;
  summary?: string;
  createdAt?: string;
}

export type LinkedInPostInput = Omit<LinkedInPost, "id" | "createdAt">;
