import { motion } from "framer-motion";
import RevealText from "./RevealText";


export default function Showreel() {
  return (
    <section id="showreel" className="showreel">
      <div className="container">
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

        <motion.div
          className="showreel__media"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <video
            className="showreel__video"
            autoPlay
            controls
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
            Browser Anda belum mendukung video HTML5.
          </video>

          <div className="showreel__overlay">
            <div className="showreel__content">
              <span className="showreel__kicker">Signature works</span>
              <h3>Visuals crafted to feel immersive, clean, and memorable.</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}