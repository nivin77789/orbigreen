import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types/blog";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
      className="product-grid-card group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/15">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.18em] text-primary">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.16em] text-primary/45">
          {formatDate(post.publishedAt ?? post.updatedAt)} · {post.author}
        </p>
        <h2 className="mt-2 text-[18px] lg:text-[20px] font-semibold leading-snug tracking-tight text-primary">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-secondary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-[14px] lg:text-[15px] leading-relaxed text-primary/68">
          {post.excerpt}
        </p>
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
        <Link
          to={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-semibold text-primary transition-colors group-hover:text-secondary"
        >
          Read article
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}
