import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  as: Tag = "div",
}) {
  const reduceMotion = useReducedMotion();

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={fadeUp.viewport}
      transition={{ ...fadeUp.transition, delay }}
    >
      {children}
    </MotionTag>
  );
}