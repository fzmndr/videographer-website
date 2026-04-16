import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -18,
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.main
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}