import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevealText from "./RevealText";

export default function Showreel() {
  const videoRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(true);

  const isMobileDevice = () => {
    return window.innerWidth <= 768;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControl(true);

      clearTimeout(hideTimerRef.current);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControl(true);

      clearTimeout(hideTimerRef.current);

      if (isMobileDevice()) {
        hideTimerRef.current = setTimeout(() => {
          setShowControl(false);
        }, 1200);
      }
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <section id="showreel" className="showreel">
      <div className="container">
        {/* HEADER */}
        <motion.div
          className="showreel__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="showreel__label">Showreel</p>

          <RevealText as="h2" className="showreel__title" delay={0.1}>
            Cinematic Highlights
          </RevealText>

          <p className="showreel__text">
            An exclusive glimpse into my signature works—where storytelling
            meets elegance, and every visual is thoughtfully composed.
          </p>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          className="showreel__media"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <video
            ref={videoRef}
            className="showreel__video"
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
            Browser Anda belum mendukung video HTML5.
          </video>

          {/* OVERLAY CONTENT */}
          <div className="showreel__overlay">
            <div className="showreel__content">
              <span className="showreel__kicker">Signature works</span>
              <h3>Visuals crafted to feel immersive, clean, and memorable.</h3>
            </div>
          </div>

          {/* PLAY / PAUSE BUTTON */}
          <button
            type="button"
            className={`showreel__play ${!showControl ? "is-hidden" : ""}`}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          {/* FULLSCREEN BUTTON */}
          <button
            type="button"
            className="showreel__fullscreen"
            onClick={handleFullscreen}
            aria-label="Fullscreen video"
          >
            ⛶
          </button>
        </motion.div>
      </div>
    </section>
  );
}