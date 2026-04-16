import { useState } from "react";
import { motion } from "framer-motion";
import { staggerWrap, itemVariants, viewportDefault } from "../lib/motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Mohon isi nama, email, dan pesan terlebih dahulu.");
      return;
    }

    setIsSending(true);

    const text = encodeURIComponent(
      `Halo Dika Doki,

Saya ingin konsultasi project.

Nama: ${formData.name}
Email: ${formData.email}
Jenis Project: ${formData.projectType || "-"}

Pesan:
${formData.message}`
    );

    const whatsappUrl = `https://wa.me/6285775355771?text=${text}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsSending(false);
    }, 700);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="contact contact--premium"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={viewportDefault}
        >
          <motion.div className="contact__intro" variants={itemVariants}>
            <p className="contact__eyebrow">Contact</p>
            <h2 className="contact__title">
              Let’s create visuals with clarity, emotion, and intention.
            </h2>
            <p className="contact__text">
              Terbuka untuk project brand, event, wedding, dan kolaborasi visual
              lainnya. Ceritakan kebutuhan Anda, dan mari wujudkan dengan arah
              visual yang kuat dan elegan.
            </p>

            <div className="contact__quick">
              <a
                href="mailto:hello@dikadoki.com"
                className="contact__quick-link"
              >
                hello@dikadoki.com
              </a>

              <a
                href="https://wa.me/6285775355771"
                className="contact__quick-link"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div className="contact__card" variants={itemVariants}>
            <p className="contact__form-eyebrow">Start a project</p>

            <form className="contact-form" onSubmit={handleWhatsAppSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nama Anda"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="projectType"
                placeholder="Jenis project"
                value={formData.projectType}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Ceritakan project Anda"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSending}
              >
                {isSending ? "Menyiapkan WhatsApp..." : "Kirim via WhatsApp"}
              </button>

              {error && (
                <p className="contact-form__message contact-form__message--error">
                  {error}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}