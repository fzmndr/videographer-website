import { motion } from "framer-motion";
import { easing } from "../lib/motion";

const WHATSAPP_NUMBER = "6285775355771";
const WHATSAPP_TEXT =
  "Halo Dika Doki, saya tertarik dengan jasa videography. Bisa info paket dan harga?";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero__bg"
        initial={{ scale: 1.06, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: easing }}
      >
        <video
          className="hero__bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
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
            >
              Visualize
            </motion.span>
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easing }}
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
  );
}