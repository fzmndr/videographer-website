import { motion, useReducedMotion } from "framer-motion";
import { easing } from "../lib/motion";

export default function SectionTitle({
  eyebrow,
  title,
  text,
  className = "",
  align = "left",
  as: Heading = "h3",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`section-title ${className} section-title--${align}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easing }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.06, ease: easing }}
      >
        <Heading>{title}</Heading>
      </motion.div>

      {text && (
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.14, ease: easing }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}