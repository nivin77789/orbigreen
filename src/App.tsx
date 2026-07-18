import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AppBootstrap } from "@/components/AppBootstrap";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoader } from "@/components/PageLoader";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { BlogProvider } from "@/context/BlogContext";
import { resizeLenis, scrollToTarget, scrollToTop } from "@/lib/lenis";

const SITE_NAME = "Orbigreen Techsource";
const DEFAULT_DESCRIPTION =
  "Orbigreen Techsource — Single-window sourcing for industrial engineering machinery, parts, and services. Smart. Sustainable. Sourcing.";

const STATIC_PAGE_META: Record<string, { title: string; description?: string }> = {
  "/": { title: "Industrial Sourcing Excellence", description: DEFAULT_DESCRIPTION },
  "/about": { title: "About Us", description: "Learn about Orbigreen Techsource and our global industrial sourcing capabilities." },
  "/resources": { title: "Resources", description: "Guides, insights, FAQs, and case studies for procurement and engineering teams." },
  "/products": { title: "Product Categories", description: "Industrial product categories sourced globally — castings, machining, fabrication, and more." },
  "/services": { title: "Services", description: "Global sourcing, engineering, quality inspection, logistics, and advisory services." },
  "/contact": { title: "Contact Us", description: "Get in touch with Orbigreen Techsource for industrial sourcing support." },
  "/quotation": { title: "Request Quotation", description: "Submit your RFQ with drawings and specifications for a commercial proposal." },
  "/global-presence": { title: "Global Network", description: "Our sourcing presence across China, Vietnam, India, Turkey, and beyond." },
  "/blog": { title: "Media", description: "News, insights, and updates from Orbigreen Techsource." },
  "/admin/blog": { title: "Blog Admin", description: "Manage Orbigreen blog posts." },
};

function applyStaticPageMeta(pathname: string) {
  const meta = STATIC_PAGE_META[pathname];
  if (!meta) return;

  document.title = `${meta.title} | ${SITE_NAME}`;
  const description = meta.description ?? DEFAULT_DESCRIPTION;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

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
      applyStaticPageMeta(pathname);

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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
