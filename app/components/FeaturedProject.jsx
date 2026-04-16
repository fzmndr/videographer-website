import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const featuredProject = {
  title: "Elegant Ceremony",
  slug: "elegant-ceremony",
  category: "Party",
  image: "/images/featured1.jpeg",
  description:
    "Dokumentasi Party dengan pendekatan visual yang lembut, intimate, dan sinematik.",
};

export default function FeaturedProject() {
  return (
    <section className="section featured-project">
      <div className="container">
        <motion.div
          className="featured-project__grid"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="featured-project__content">
            <p className="featured-project__eyebrow">Featured Project</p>

            <h2 className="featured-project__title">
              {featuredProject.title}
            </h2>

            <p className="featured-project__text">
              {featuredProject.description}
            </p>

            <div className="featured-project__meta">
              <span>{featuredProject.category}</span>
            </div>

            <Link
              to={`/project/${featuredProject.slug}`}
              className="btn btn--primary"
            >
              View Project
            </Link>
          </div>

          <Link
            to={`/project/${featuredProject.slug}`}
            className="featured-project__media"
            aria-label={`View ${featuredProject.title}`}
          >
            <video
              src= "/videos/featured.mp4"
              className="featured-project__image"
              autoPlay
              muted
              loop
              playsInline
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}