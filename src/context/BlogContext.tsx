import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BlogPost, BlogPostInput } from "@/types/blog";
import {
  createPost,
  deletePost,
  getPublishedPosts,
  loadBlogs,
  loadSeedBlogs,
  resetBlogsToSeed,
  updatePost,
} from "@/lib/blogStore";

const ADMIN_SESSION_KEY = "orbigreen_admin_session";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "orbigreen2026";

type BlogContextValue = {
  posts: BlogPost[];
  publishedPosts: BlogPost[];
  loading: boolean;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addPost: (input: BlogPostInput) => Promise<void>;
  editPost: (id: string, input: BlogPostInput) => Promise<void>;
  removePost: (id: string) => Promise<void>;
  resetToSeed: () => Promise<void>;
  refresh: () => Promise<void>;
};

const BlogContext = createContext<BlogContextValue | null>(null);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === "true",
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await loadBlogs();
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback((password: string) => {
    if (password !== ADMIN_PASSWORD) return false;
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setIsAdmin(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const addPost = useCallback(async (input: BlogPostInput) => {
    setPosts((current) => createPost(current, input));
  }, []);

  const editPost = useCallback(async (id: string, input: BlogPostInput) => {
    setPosts((current) => updatePost(current, id, input));
  }, []);

  const removePost = useCallback(async (id: string) => {
    setPosts((current) => deletePost(current, id));
  }, []);

  const resetToSeed = useCallback(async () => {
    const seed = await loadSeedBlogs();
    setPosts(resetBlogsToSeed(seed));
  }, []);

  const value = useMemo<BlogContextValue>(
    () => ({
      posts,
      publishedPosts: getPublishedPosts(posts),
      loading,
      isAdmin,
      login,
      logout,
      addPost,
      editPost,
      removePost,
      resetToSeed,
      refresh,
    }),
    [posts, loading, isAdmin, login, logout, addPost, editPost, removePost, resetToSeed, refresh],
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within BlogProvider");
  }
  return context;
}
