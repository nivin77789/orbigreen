import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LinkedInPost } from "@/types/linkedin";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function LinkedInPostCard({ post, index = 0 }: { post: LinkedInPost; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
      className="product-grid-card group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm hover:shadow-md transition-all"
    >
      <Link to={`/blog/post/${post.id}`} className="flex flex-1 flex-col h-full cursor-pointer">
        {post.imageUrl ? (
          <div className="relative overflow-hidden bg-slate-50/70 p-3 border-b border-primary/10 flex items-center justify-center">
            <img
              src={post.imageUrl}
              alt={post.title}
              loading="lazy"
              className="w-full h-auto max-h-[520px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <span className="absolute left-4 top-4 rounded-full bg-blue-600/95 backdrop-blur-md px-3 py-1 text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-xs">
              LinkedIn
            </span>
          </div>
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/15 flex items-center justify-center p-6 text-center border-b border-primary/10">
            <span className="text-sm font-semibold text-primary/40 uppercase tracking-widest">
              LinkedIn Update
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-blue-600/95 backdrop-blur-md px-3 py-1 text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-xs">
              LinkedIn
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.16em] text-primary/45">
            {post.createdAt ? `${formatDate(post.createdAt)} · ` : ""}LinkedIn Update
          </p>
          <h3 className="mt-2 text-[18px] lg:text-[20px] font-semibold leading-snug tracking-tight text-primary transition-colors group-hover:text-secondary">
            {post.title}
          </h3>
          {post.summary ? (
            <p className="mt-3 line-clamp-3 flex-1 text-[14px] lg:text-[15px] leading-relaxed text-primary/68">
              {post.summary}
            </p>
          ) : null}

          <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-semibold text-primary transition-colors group-hover:text-secondary">
            <span>Read post</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
