import { db } from "@/lib/firebase";
import type { LinkedInPost, LinkedInPostInput } from "@/types/linkedin";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export function parseLinkedInEmbedSrc(embedCodeOrUrl: string): string {
  const trimmed = embedCodeOrUrl.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  return trimmed;
}

export async function fetchLinkedInPosts(): Promise<LinkedInPost[]> {
  try {
    const q = query(collection(db, "linkedin_posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: String(data.title ?? ""),
          embedCode: String(data.embedCode ?? ""),
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        } as LinkedInPost;
      });
    }

    return [];
  } catch (err) {
    console.warn("Failed to fetch LinkedIn posts from Firestore:", err);
    return [];
  }
}

export async function addLinkedInPost(input: LinkedInPostInput): Promise<string> {
  const newRef = doc(collection(db, "linkedin_posts"));
  const payload = {
    title: input.title.trim(),
    embedCode: input.embedCode.trim(),
    createdAt: serverTimestamp(),
  };

  await setDoc(newRef, payload);
  return newRef.id;
}

export async function deleteLinkedInPost(id: string): Promise<void> {
  try {
    const postRef = doc(db, "linkedin_posts", id);
    await deleteDoc(postRef);
  } catch (err) {
    console.warn(`Could not delete LinkedIn post ${id}:`, err);
  }
}
