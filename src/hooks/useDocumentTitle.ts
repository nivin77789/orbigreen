import { useEffect } from "react";

const SITE_NAME = "Orbigreen Techsource";

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    if (!description) return;

    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", description);
  }, [title, description]);
}
