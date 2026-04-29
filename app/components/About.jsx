import { motion, useReducedMotion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1];

function About() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.16,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: easing },
    },
  };

  return (
    <section id="about" className="section" style={{ padding: "80px 0" }}>
      <div className="container about">
        <motion.div
          className="about__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Header Section: Dibagi 2 Kolom */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1.2fr 1fr", // Membagi judul kiri dan kanan
            gap: "40px",
            marginBottom: "60px",
            alignItems: "start"
          }}>
            <div>
              <motion.span
                className="section-title__line"
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: easing } }
                }}
                style={{ originX: 0, display: "block", height: "1px", background: "white", marginBottom: "20px" }}
              />
              <motion.p variants={itemVariants} style={{ textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "20px" }}>
                About
              </motion.p>
              <motion.h3 variants={itemVariants} style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, fontWeight: "bold" }}>
                A creative vision <br /> shaped by precision <br /> and brought to life...
              </motion.h3>
            </div>
            
            <div style={{ paddingTop: "100px" }}> {/* Offset untuk estetika sesuai gambar */}
              <motion.h3 variants={itemVariants} style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, fontWeight: "bold" }}>
                ...through compelling visual storytelling.
              </motion.h3>
            </div>
          </div>

          {/* Deskripsi Section: Dibagi 3 Kolom */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "30px",
            opacity: 0.8 
          }}>
            <motion.p variants={itemVariants} style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              <strong>dikadoki</strong> — Indonesia-based videographer and photographer with a foundation in journalism.
            </motion.p>

            <motion.p variants={itemVariants} style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              I craft visual narratives that elevate moments into timeless imagery. My approach is rooted in precision, subtlety, and a deep appreciation for detail.
            </motion.p>

            <motion.p variants={itemVariants} style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              Driven by a strong creative vision and an intuitive sense of aesthetics, I bring ideas to life with clarity and intention. I value collaboration and excellence.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;