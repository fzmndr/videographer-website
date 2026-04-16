import { motion, useReducedMotion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1];

export default function RevealText({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Tag className={className} style={{ overflow: "hidden" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={{
          y: reduceMotion ? 0 : "110%",
          opacity: 0,
        }}
        whileInView={{
          y: "0%",
          opacity: 1,
        }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.75,
          delay,
          ease: easing,
        }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}