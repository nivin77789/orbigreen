import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { WordPressPost } from "@/types/wordpress";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function WordPressBlogCard({ post, index = 0 }: { post: WordPressPost; index?: number }) {
  const category = post.categories[0] || "Article";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
      className="product-grid-card group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm hover:shadow-md transition-all"
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-1 flex-col h-full cursor-pointer">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/15">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 p-6 text-center">
              <span className="text-sm font-semibold text-primary/40 uppercase tracking-widest">
                Orbigreen Article
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.18em] text-primary shadow-xs">
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.16em] text-primary/45">
            {formatDate(post.date)} · {post.author}
          </p>
          <h3 className="mt-2 text-[18px] lg:text-[20px] font-semibold leading-snug tracking-tight text-primary transition-colors group-hover:text-secondary">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 flex-1 text-[14px] lg:text-[15px] leading-relaxed text-primary/68">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/10 bg-section px-2.5 py-1 text-[11px] lg:text-[12px] font-semibold text-primary/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-semibold text-primary transition-colors group-hover:text-secondary">
            <span>Read full article</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
