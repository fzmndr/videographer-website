import { motion } from "framer-motion";
import { easing } from "../lib/motion";

export default function Hero() {
  return (
    <section id="home" className="hero">
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
            DIKA DOKI
          </motion.p>

          <h1 className="hero__title">
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: easing }}
            >
              Cinematic visuals
            </motion.span>
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easing }}
            >
              that feel real
            </motion.span>
          </h1>

          <motion.p
            className="hero__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: easing }}
          >
            Visual yang bersih, emosional, dan berkelas untuk brand, event,
            dan momen personal.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easing }}
          >
            <a href="#portfolio" className="btn btn--primary">
              Lihat Karya
            </a>
            <a href="#contact" className="btn btn--secondary">
              Contact
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}