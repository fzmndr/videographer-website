import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ isLoading }) {
  // Animasi untuk teks
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      // Membuat huruf menghilang lebih cepat dari belakang ke depan
      transition: { staggerChildren: 0.05, staggerDirection: -1 } 
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
    // Menambahkan animasi exit agar teks "jatuh" perlahan saat hilang
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.4 } 
    }
  };

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
            filter: "blur(10px)", 
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
          }}
          // Pastikan styling ini ada di CSS Anda atau biarkan di-inline
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000", // Sesuaikan dengan tema website
            color: "#fff"
          }}
        >
          <motion.div
            className="loading-screen__inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <motion.h1
              className="loading-screen__title"
              variants={textContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="dikadoki" // <-- SEO & Screen Reader support
              style={{ overflow: "hidden", perspective: "1000px" }}
            >
              {title.map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={letterAnimation}
                  style={{ display: "inline-block" }}
                  aria-hidden="true" // <-- Menyembunyikan huruf terpisah dari screen reader
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Garis Loading Indeterminate (bergerak terus sampai isLoading false) */}
            <motion.div 
              className="loading-screen__line-container"
              style={{ 
                width: "120px", 
                height: "2px", 
                backgroundColor: "rgba(255,255,255,0.2)", 
                marginTop: "20px", 
                overflow: "hidden" 
              }}
            >
              <motion.span
                className="loading-screen__line"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, // Animasi berulang
                  duration: 1.5, 
                  ease: "easeInOut" 
                }} 
                style={{ 
                  display: "block", 
                  width: "100%", 
                  height: "100%", 
                  backgroundColor: "#fff" 
                }} 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}