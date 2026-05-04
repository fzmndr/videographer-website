import { useEffect, useState, Suspense, lazy } from "react";
import Lenis from "lenis";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Analytics
import { Analytics } from "@vercel/analytics/react";

// Komponen Utama (Langsung di-load karena ada di paling atas)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";

// Komponen Bawah (Di-load secara Lazy / ditunda agar ringan)
const Works = lazy(() => import("./components/Works"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Showreel = lazy(() => import("./components/Showreel"));
const FloatingWhatsApp = lazy(() => import("./components/FloatingWhatsApp"));
const InstagramPreview = lazy(() => import("./components/InstagramPreview"));
const AIAssistant = lazy(() => import("./components/AIAssistant"));

// Pages (Di-load secara Lazy)
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

function Home({ setIsPreviewOpen }) {
  return (
    <PageTransition>
      <Hero />
      
      {/* Bungkus komponen bawah dengan Suspense */}
      <Suspense fallback={null}>
        <Works setIsPreviewOpen={setIsPreviewOpen} />
        <Showreel />
        <About />
        <InstagramPreview />
        <AIAssistant />
        <Contact />
        <FloatingWhatsApp />
      </Suspense>
    </PageTransition>
  );
}

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Smooth Scroll Initialization (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Fake Loading Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  // Handling Scroll to Section on Route Change
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;

      setTimeout(() => {
        const element = document.getElementById(targetId);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" isLoading={isLoading} />
      ) : (
        <>
          {/* Global UI Components */}
          <CustomCursor />
          <Navbar isPreviewOpen={isPreviewOpen} />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={<Home setIsPreviewOpen={setIsPreviewOpen} />}
              />
              <Route
                path="/project/:slug"
                element={
                  <PageTransition>
                    <Suspense fallback={null}>
                      <ProjectDetail />
                    </Suspense>
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>

          <Footer />

          {/* Vercel Analytics Tracker */}
          <Analytics />
        </>
      )}
    </AnimatePresence>
  );
}

export default App;