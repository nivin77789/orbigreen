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

export function parseLinkedInEmbedHeight(embedCodeOrUrl: string): number {
  const heightMatch = embedCodeOrUrl.match(/height=["'](\d+)["']/i);
  if (heightMatch && heightMatch[1]) {
    const h = parseInt(heightMatch[1], 10);
    if (!isNaN(h) && h > 0) return h;
  }
  return 800;
}

export function getLinkedInDirectUrl(embedCodeOrUrl: string): string {
  const src = parseLinkedInEmbedSrc(embedCodeOrUrl);
  if (src.includes("/embed/feed/update/")) {
    return src.replace("/embed/feed/update/", "/feed/update/");
  }
  return src;
}

function getFallbackImageAndSummary(embedCode: string, title: string): { imageUrl?: string; summary?: string } {
  const code = embedCode.toLowerCase();
  const t = title.toLowerCase();

  if (code.includes("7496526626546147328") || t.includes("reference")) {
    return {
      imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQH836b_AaPTcQ/feedshare-image-high-res/B56aAkDPvAJQAU-/0/1787311226049?e=2147483647&v=beta&t=itax62zW_BgxBdSmEFfNOeDOidS1Op1uQKRNa1bly4g",
      summary: "In a globalized industrial landscape, references are more than just credentials — they are a symbol of trust, consistency, and capability.",
    };
  }
  if (code.includes("7498606741501296640") || t.includes("strategic") || t.includes("rinheat")) {
    return {
      imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQHln8CC_AuDfA/feedshare-shrink_800/B56aBBnGLNJYAc-/0/1787807163333?e=2147483647&v=beta&t=Kef2b8ld9lm1CoMZU-1rH5lDjOjWaGms-YwuejmzxnI",
      summary: "Orbigreen Techsource is pleased to announce its strategic partnership with RINHEAT OY, Finland, bringing together complementary expertise for sustainable thermal solutions.",
    };
  }
  if (code.includes("7497623565618470912") || t.includes("supplier") || t.includes("qualification")) {
    return {
      imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQHJKvu0U8qbcw/feedshare-shrink_800/B56aAzo53yGcAc-/0/1787572756225?e=2147483647&v=beta&t=geWFOaDUCdG84T6s_4HgUGal-VyCIVcvLTHlVf8KgUU",
      summary: "A structured, multi-criteria evaluation framework to qualify manufacturing and industrial partners across technical capability, QA, commercial reliability, and compliance.",
    };
  }

  return {};
}

export async function fetchLinkedInPosts(): Promise<LinkedInPost[]> {
  try {
    const q = query(collection(db, "linkedin_posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const embedCode = String(data.embedCode ?? "");
        const title = String(data.title ?? "");
        const fallback = getFallbackImageAndSummary(embedCode, title);

        return {
          id: docSnap.id,
          title,
          embedCode,
          imageUrl: data.imageUrl ? String(data.imageUrl) : fallback.imageUrl,
          summary: data.summary ? String(data.summary) : fallback.summary,
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

export async function fetchLinkedInPostById(id: string): Promise<LinkedInPost | null> {
  const posts = await fetchLinkedInPosts();
  return posts.find((p) => p.id === id) ?? null;
}

export async function addLinkedInPost(input: LinkedInPostInput): Promise<string> {
  const newRef = doc(collection(db, "linkedin_posts"));
  const payload: Record<string, unknown> = {
    title: input.title.trim(),
    embedCode: input.embedCode.trim(),
    createdAt: serverTimestamp(),
  };

  if (input.imageUrl && input.imageUrl.trim()) {
    payload.imageUrl = input.imageUrl.trim();
  }
  if (input.summary && input.summary.trim()) {
    payload.summary = input.summary.trim();
  }

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
