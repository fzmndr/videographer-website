import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";

import { worksData } from "../data/siteData";
import RevealText from "./RevealText";

const filters = ["All", "Commercial", "Campaign", "Brand"];
const easing = [0.22, 1, 0.36, 1];

export default function Works({ setIsPreviewOpen = () => {} }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedWork, setSelectedWork] = useState(null);

  const videoRefs = useRef({});
  const reduceMotion = useReducedMotion();

  const filteredWorks = useMemo(() => {
    if (activeFilter === "All") return worksData;
    return worksData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const currentIndex = selectedWork
    ? filteredWorks.findIndex((item) => item.slug === selectedWork.slug)
    : -1;

  const handlePrevWork = () => {
    if (!filteredWorks.length || currentIndex === -1) return;

    const prevIndex =
      currentIndex === 0 ? filteredWorks.length - 1 : currentIndex - 1;

    setSelectedWork(filteredWorks[prevIndex]);
  };

  const handleNextWork = () => {
    if (!filteredWorks.length || currentIndex === -1) return;

    const nextIndex =
      currentIndex === filteredWorks.length - 1 ? 0 : currentIndex + 1;

    setSelectedWork(filteredWorks[nextIndex]);
  };

  const closePreview = () => {
    setSelectedWork(null);
  };

  const handleMouseEnter = (slug) => {
    if (window.innerWidth <= 900) return;

    const video = videoRefs.current[slug];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (slug) => {
    const video = videoRefs.current[slug];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  useEffect(() => {
    setIsPreviewOpen(Boolean(selectedWork));
  }, [selectedWork, setIsPreviewOpen]);

  useEffect(() => {
    if (!selectedWork) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowLeft") handlePrevWork();
      if (event.key === "ArrowRight") handleNextWork();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedWork, currentIndex, filteredWorks]);

  const headerVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easing,
      },
    },
  };

  const filtersVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const filterItemVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 14,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 28,
      scale: reduceMotion ? 1 : 0.985,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easing,
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
      scale: reduceMotion ? 1 : 0.985,
      transition: {
        duration: 0.35,
        ease: easing,
      },
    },
  };

  return (
    <section id="portfolio" className="works section">
      <div className="container">
        <motion.div
          className="works__header"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="works__label">CURATED WORKS</p>

          <RevealText as="h2" className="works__title" delay={0.08}>
            Selected Works
          </RevealText>

          <motion.p
            className="works__subtitle"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.14, ease: easing }}
          >
           A curated selection of projects defined by a cinematic approach—refined, distinctive, and rich in character.
          </motion.p>
        </motion.div>

        <LayoutGroup>
          <motion.div
            className="works__filters"
            variants={filtersVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <motion.button
                  key={filter}
                  type="button"
                  variants={filterItemVariants}
                  className={`works__filter ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                  whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="works__filter-pill"
                      transition={{ duration: 0.35, ease: easing }}
                    />
                  )}
                  <span className="works__filter-label">{filter}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        <motion.div layout className="works-grid">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item, index) => (
              <motion.button
                layout
                key={item.slug}
                type="button"
                className="work-card"
                aria-label={`Buka preview ${item.title}`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.7,
                  ease: easing,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
                onClick={() => setSelectedWork(item)}
                onMouseEnter={() => handleMouseEnter(item.slug)}
                onMouseLeave={() => handleMouseLeave(item.slug)}
                whileTap={{ scale: reduceMotion ? 1 : 0.99 }}
              >
                <div className="work-card__media">
                  <img
                    src={item.image || item.img}
                    alt={item.title}
                    className="work-img"
                  />

                  <video
                    ref={(element) => {
                      videoRefs.current[item.slug] = element;
                    }}
                    src={item.video}
                    className="work-video"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>

                <div className="work-overlay">
                  <div className="work-overlay__top">
                    <span className="work-category">{item.category}</span>
                  </div>

                  <motion.div
                    className="work-overlay__bottom"
                    whileHover={reduceMotion ? {} : { y: -2 }}
                    transition={{ duration: 0.3, ease: easing }}
                  >
                    <div>
                      <h3>{item.title}</h3>
                      <p className="work-overlay__description">
                        {item.description}
                      </p>
                    </div>
                    <span className="work-overlay__arrow">↗</span>
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="work-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: easing }}
            onClick={closePreview}
          >
            <motion.div
              className="work-preview__dialog work-preview__dialog--fullscreen"
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 20,
                scale: reduceMotion ? 1 : 0.985,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : 12,
                scale: reduceMotion ? 1 : 0.985,
              }}
              transition={{ duration: 0.38, ease: easing }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="work-preview__nav work-preview__nav--prev"
                onClick={handlePrevWork}
                aria-label="Previous project"
              >
                ←
              </button>

              <button
                type="button"
                className="work-preview__close work-preview__close--floating"
                onClick={closePreview}
                aria-label="Close preview"
              >
                ✕
              </button>

              <button
                type="button"
                className="work-preview__nav work-preview__nav--next"
                onClick={handleNextWork}
                aria-label="Next project"
              >
                →
              </button>

              <div className="work-preview__media work-preview__media--fullscreen">
                <video
                  src={selectedWork.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="work-preview__video-bg"
                />

                <video
                  src={selectedWork.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="work-preview__video-main"
                />

                <div className="work-preview__gradient" />
              </div>

              <div className="work-preview__ui">
                <div className="work-preview__topmeta">
                  <span className="work-preview__eyebrow">
                    {selectedWork.category}
                  </span>
                </div>

                <div className="work-preview__bottom">
                  <div className="work-preview__info">
                    <h2>{selectedWork.title}</h2>
                    <p>
                      {selectedWork.description ||
                        "Cinematic visuals with a refined, emotional approach, and a focus on strong storytelling."}
                    </p>
                  </div>

                  <div className="work-preview__actions">
                    <Link
                      to={`/project/${selectedWork.slug}`}
                      className="btn btn--primary"
                      onClick={closePreview}
                    >
                      View Project Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}