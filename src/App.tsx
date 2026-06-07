import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AppBootstrap } from "@/components/AppBootstrap";
import { PageLoader } from "@/components/PageLoader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getLenis, scrollToTarget } from "@/lib/lenis";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));
const SourcingMarketsPage = lazy(() => import("@/pages/SourcingMarketsPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ChatBot = lazy(() =>
  import("@/components/ChatBot").then((module) => ({ default: module.ChatBot })),
);

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => scrollToTarget(hash, { offset: -72 }));
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AppBootstrap>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
        <BrowserRouter>
          <SmoothScroll />
          <ScrollToHash />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/sourcing-markets" element={<SourcingMarketsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </AppBootstrap>
  );
}
