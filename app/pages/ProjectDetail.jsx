import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { worksData } from "../data/siteData";

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = worksData.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <p>Project tidak ditemukan.</p>
          <Link to="/" className="btn btn--secondary">
            Kembali ke Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail section">
      <div className="container">
        <motion.div
          className="project-detail__hero"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="project-detail__eyebrow">{project.category}</p>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__lead">{project.description}</p>
        </motion.div>

        <motion.div
          className="project-detail__media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <video
            className="project-detail__video"
            controls
            playsInline
            preload="auto"
            poster={project.image || project.img}
          >
            <source src={project.video} type="video/mp4" />
            Browser Anda tidak mendukung video.
          </video>
        </motion.div>

        <div className="project-detail__meta">
          <div className="project-detail__meta-item">
            <span>Category</span>
            <p>{project.category}</p>
          </div>

          <div className="project-detail__meta-item">
            <span>Slug</span>
            <p>{project.slug}</p>
          </div>

          <div className="project-detail__meta-item">
            <span>Title</span>
            <p>{project.title}</p>
          </div>
        </div>

        <div className="project-detail__story">
          <div className="project-detail__story-copy">
            <p className="project-detail__section-label">Overview</p>
            <h2>Visual direction with clarity, emotion, and intention.</h2>
          </div>

          <div className="project-detail__story-text">
            <p>{project.description}</p>
            <p>
              Each project is presented with a cinematic visual approach, neat, and focused on the audience experience.
            </p>
          </div>
        </div>

        <div className="project-detail__cta">
          <p className="project-detail__section-label">Let’s work together</p>
          <h2>Do you have a project with stronger visuals?</h2>
          <a href="/#contact" className="btn btn--primary">
            Start Discussion
          </a>
        </div>
      </div>
    </section>
  );
}