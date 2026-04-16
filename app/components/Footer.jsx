import { motion } from "framer-motion";
import { staggerWrap, itemVariants, viewportDefault } from "../lib/motion";

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="container footer__inner"
        variants={staggerWrap}
        initial="hidden"
        whileInView="show"
        viewport={viewportDefault}
      >
        <motion.div className="footer__brand" variants={itemVariants}>
          <p className="footer__eyebrow">Dika Doki</p>
          <h3>Visual stories with emotion, clarity, and intention.</h3>
          <p className="footer__text">
            Cinematic visuals for brands, events, and personal moments with a
            refined visual approach.
          </p>
        </motion.div>

        <motion.div className="footer__links" variants={itemVariants}>
          <div>
            <p className="footer__heading">Navigation</p>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#portfolio">Works</a></li>
              <li><a href="#showreel">Showreel</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__heading">Connect</p>
            <ul>
              <li><a href="mailto:hello@dikadoki.com">Email</a></li>
              <li>
                <a
                  href="https://wa.me/6285775355771"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="container footer__bottom"
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <p>© 2026 Dika Doki. Crafted with intention.</p>
      </motion.div>
    </footer>
  );
}