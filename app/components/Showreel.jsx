import { motion } from "framer-motion";
import { useRef, useState } from "react";
import RevealText from "./RevealText";

export default function Showreel() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
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

          {/* PLAY BUTTON */}
          <button className="showreel__play" onClick={togglePlay}>
            {isPlaying ? "❚❚" : "▶"}
          </button>

          {/* FULLSCREEN BUTTON */}
          <button className="showreel__fullscreen" onClick={handleFullscreen}>
            ⛶
          </button>
        </motion.div>
      </div>
    </section>
  );
}