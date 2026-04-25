import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Works from "./components/Works";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Showreel from "./components/Showreel";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import FeaturedProject from "./components/FeaturedProject";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import InstagramPreview from "./components/InstagramPreview";
import AIAssistant from "./components/AIAssistant";

import ProjectDetail from "./pages/ProjectDetail";

function Home({ setIsPreviewOpen }) {
  return (
    <PageTransition>
      <Hero />
      <FeaturedProject />
      <Works setIsPreviewOpen={setIsPreviewOpen} />
      <Showreel />
      <About />
      <InstagramPreview />
      <AIAssistant />
      <Contact />
      <FloatingWhatsApp />
    </PageTransition>
  );
}

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

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
                    <ProjectDetail />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>

          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}

export default App;