import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AppBootstrap } from "@/components/AppBootstrap";
import { PageLoader } from "@/components/PageLoader";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { BlogProvider } from "@/context/BlogContext";
import { resizeLenis, scrollToTarget, scrollToTop } from "@/lib/lenis";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductGalleryPage = lazy(() => import("@/pages/ProductGalleryPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const QuotationPage = lazy(() => import("@/pages/QuotationPage"));
const GlobalPresencePage = lazy(() => import("@/pages/GlobalPresencePage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const AdminBlogPage = lazy(() => import("@/pages/AdminBlogPage"));
const ChatBot = lazy(() =>
  import("@/components/ChatBot").then((module) => ({ default: module.ChatBot })),
);

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      resizeLenis();

      if (hash) {
        scrollToTarget(hash, { offset: -76, immediate: false });
        return;
      }

      scrollToTop(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AppBootstrap>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
        <BlogProvider>
          <BrowserRouter>
            <SmoothScrollProvider>
              <ScrollToHash />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:slug" element={<ProductGalleryPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/quotation" element={<QuotationPage />} />
                  <Route path="/global-presence" element={<GlobalPresencePage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/admin/blog" element={<AdminBlogPage />} />
                </Routes>
              </Suspense>
              <Suspense fallback={null}>
                <ChatBot />
              </Suspense>
            </SmoothScrollProvider>
          </BrowserRouter>
        </BlogProvider>
      </MotionConfig>
    </AppBootstrap>
  );
}
