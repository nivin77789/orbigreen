export interface LinkedInPost {
  id: string;
  title: string;
  embedCode: string;
  createdAt?: string;
}

export type LinkedInPostInput = Omit<LinkedInPost, "id" | "createdAt">;
