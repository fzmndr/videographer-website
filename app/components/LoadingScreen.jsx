import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ isLoading }) {
  // Animasi untuk teks yang muncul satu per satu
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda waktu antar huruf
        delayChildren: 0.3,
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }, // Custom cubic-bezier untuk efek smooth
    },
  };

  // Memecah kata menjadi array huruf
  const title = "dikadoki".split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: "blur(10px)", // Efek blur saat menghilang
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
          }}
        >
          <motion.div
            className="loading-screen__inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p 
              className="loading-screen__eyebrow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to
            </motion.p>

            <motion.h1
              className="loading-screen__title"
              variants={textContainer}
              initial="hidden"
              animate="visible"
            >
              {title.map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={letterAnimation}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div 
              className="loading-screen__line-container"
            >
              <motion.span
                className="loading-screen__line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                // Durasi garis bisa disesuaikan dengan perkiraan waktu loading-mu
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }} 
                style={{ transformOrigin: "left" }} // Memastikan garis memanjang dari kiri ke kanan
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}