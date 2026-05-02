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
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: easing,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.85, ease: easing },
    },
  };

  return (
    <section id="about" className="section">
      <div
        className="container about about--center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "6rem 1.5rem",
        }}
      >
        <motion.div
          className="about__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* TITLE */}
          <div
            className="section-title section-title--about"
            style={{
              marginBottom: "3rem",
            }}
          >
            <motion.span
              className="section-title__line"
              variants={lineVariants}
              aria-hidden="true" // <-- Upgrade: Menyembunyikan garis dari Screen Reader
              style={{
                originX: 0,
                display: "block",
                marginBottom: "1.2rem",
                width: "60px",
                height: "1px",
                background: "white",
              }}
            />

            <motion.div variants={itemVariants}>
              <p
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontSize: "0.8rem",
                  opacity: 0.7,
                  marginBottom: "0.6rem",
                }}
              >
                About
              </p>

              <h3
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  lineHeight: 1.15,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  maxWidth: "18ch",
                  textWrap: "balance", // <-- Upgrade: Tipografi modern penyeimbang teks otomatis
                }}
              >
                A creative vision shaped by precision and brought to life through compelling visual storytelling.
              </h3>
            </motion.div>
          </div>

          {/* CONTENT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              opacity: 0.85,
              maxWidth: "600px",
            }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "1.05rem",
                fontWeight: 500,
              }}
            >
              <strong>dikadoki</strong> — Indonesia-based videographer and
              photographer with a foundation in journalism.
            </motion.p>

            <motion.p variants={itemVariants}>
              I craft visual narratives that elevate moments into timeless
              imagery. My approach is rooted in precision, subtlety, and a deep
              appreciation for detail — creating visuals that feel both
              compelling and refined.
            </motion.p>

            <motion.p variants={itemVariants}>
              Driven by a strong creative vision and an intuitive sense of
              aesthetics, I bring ideas to life with clarity and intention. I
              value collaboration, embrace new perspectives, and continuously
              pursue excellence in every frame.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;