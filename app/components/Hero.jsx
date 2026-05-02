import { motion, useScroll, useTransform } from "framer-motion";
import { easing } from "../lib/motion";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const WHATSAPP_NUMBER = "6285775355771";
const WHATSAPP_TEXT =
  "Hello dikadoki, I am interested in videography services. Can you give information about the packages and prices?";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  const [activeVideo, setActiveVideo] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // --- SETUP EFEK PARALLAX ---
  // Membaca posisi scroll halaman
  const { scrollY } = useScroll();
  
  // Saat halaman di-scroll ke bawah (dari 0px ke 800px):
  // 1. Background video bergerak sedikit ke bawah agar tercipta efek kedalaman (Parallax)
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  // 2. Teks konten bergerak ke atas lebih cepat dan perlahan memudar
  const yText = useTransform(scrollY, [0, 500], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const videoList = [
      {
        id: "v1",
        webm: "/videos/hero1.webm",
        mp4: "/videos/hero1.mp4",
        poster: "/images/hero-poster-1.jpg"
      },
      {
        id: "v2",
        webm: "/videos/hero2.webm",
        mp4: "/videos/hero2.mp4",
        poster: "/images/hero2.jpg"
      }
    ];

    const randomSelection = videoList[Math.floor(Math.random() * videoList.length)];
    setActiveVideo(randomSelection);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={!isVideoLoaded} />

      <section id="home" className="hero" aria-labelledby="hero-title" style={{ overflow: "hidden" }}>
        {/* Menerapkan efek Parallax pada Background */}
        <motion.div
          className="hero__bg"
          initial={{ scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: easing }}
          style={{ y: yBg }} // <-- Background terpengaruh scroll
        >
          {activeVideo && (
            <video
              key={activeVideo.id} 
              className="hero__bg-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={activeVideo.poster}
              aria-hidden="true"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onCanPlayThrough={() => setIsVideoLoaded(true)}
            >
              <source src={activeVideo.webm} type="video/webm" />
              <source src={activeVideo.mp4} type="video/mp4" />
            </video>
          )}
          
          <div className="hero__bg-overlay" />
        </motion.div>

        {/* Menerapkan efek Parallax & Fade Out pada Konten Teks */}
        <motion.div 
          className="container hero__content"
          style={{ y: yText, opacity: opacityText }} // <-- Konten terpengaruh scroll
        >
          <div className="hero__inner">
            <motion.p
              className="hero__eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easing }}
            >
              DIKADOKI
            </motion.p>

            <h1 id="hero-title" className="hero__title">
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: easing }}
                style={{ display: "block" }}
              >
                Visualize
              </motion.span>
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                style={{ display: "block" }}
              >
                Your Imagination
              </motion.span>
            </h1>

            <motion.p
              className="hero__text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: easing }}
            >
              Visualize your imagination—whether for personal events, campaigns, or commercial projects—
              crafted through visuals that are emotive, refined, and distinctly sophisticated
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easing }}
            >
              {/* Menerapkan efek Hover pada Tombol 1 */}
              <motion.a 
                href="#portfolio" 
                className="btn btn--primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ display: "inline-block" }}
              >
                Curated Work
              </motion.a>

              {/* Menerapkan efek Hover pada Tombol 2 */}
              <motion.a
                href={whatsappUrl}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Dika Doki via WhatsApp"
                whileHover={{ scale: 1.05, opacity: 0.8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ display: "inline-block" }}
              >
                Book Your Season
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}