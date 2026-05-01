import { motion } from "framer-motion";
import { easing } from "../lib/motion";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen"; // Pastikan path ini sesuai dengan struktur folder Anda

const WHATSAPP_NUMBER = "6285775355771";
const WHATSAPP_TEXT =
  "Hello dikadoki, I am interested in videography services. Can you give information about the packages and prices?";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  // State untuk menyimpan data video yang terpilih
  const [activeVideo, setActiveVideo] = useState(null);
  // State krusial untuk menghubungkan Hero dengan Loading Screen
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
      {/* Loading Screen menutupi layar sampai video benar-benar siap diputar */}
      <LoadingScreen isLoading={!isVideoLoaded} />

      <section id="home" className="hero" aria-labelledby="hero-title">
        <motion.div
          className="hero__bg"
          initial={{ scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: easing }}
        >
          {activeVideo && (
            <video
              key={activeVideo.id} 
              className="hero__bg-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto" // Diubah ke 'auto' agar browser langsung mendownload video
              poster={activeVideo.poster}
              aria-hidden="true"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              // Trigger ini akan mematikan Loading Screen saat frame video pertama siap diputar tanpa buffering
              onCanPlayThrough={() => setIsVideoLoaded(true)}
            >
              <source src={activeVideo.webm} type="video/webm" />
              <source src={activeVideo.mp4} type="video/mp4" />
            </video>
          )}
          
          <div className="hero__bg-overlay" />
        </motion.div>

        <div className="container hero__content">
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
                style={{ display: "block" }} // Tambahan safety agar animasi Y berfungsi sempurna pada span
              >
                Visualize
              </motion.span>
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                style={{ display: "block" }} // Tambahan safety
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
              <a href="#portfolio" className="btn btn--primary">
                Curated Work
              </a>

              <a
                href={whatsappUrl}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Dika Doki via WhatsApp"
              >
                Book Your Season
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}