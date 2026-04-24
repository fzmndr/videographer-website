import { useState } from "react";
import { motion } from "framer-motion";
import { staggerWrap, itemVariants, viewportDefault } from "../lib/motion";

const WHATSAPP_NUMBER = "6285775355771";

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

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const projectType = formData.projectType.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setError("Mohon isi nama, email, dan pesan terlebih dahulu.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Mohon masukkan email yang valid.");
      return;
    }

    setIsSending(true);

    const text = encodeURIComponent(
      `Halo Dika Doki,

Saya tertarik untuk konsultasi project videography.

Nama: ${name}
Email: ${email}
Jenis Project: ${projectType || "-"}

Pesan:
${message}

Mohon info paket, estimasi harga, dan ketersediaan jadwalnya.`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setIsSending(false);
    }, 500);
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
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

            <h2 id="contact-title" className="contact__title">
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
                aria-label="Kirim email ke Dika Doki"
              >
                hello@dikadoki.com
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Halo Dika Doki, saya tertarik dengan jasa videography. Bisa info paket dan harga?"
                )}`}
                className="contact__quick-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Dika Doki via WhatsApp"
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
                autoComplete="name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

              <input
                type="text"
                name="projectType"
                placeholder="Jenis project, contoh: Wedding / Event / Brand"
                value={formData.projectType}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Ceritakan kebutuhan, lokasi, tanggal acara, dan konsep yang diinginkan"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />

              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSending}
                aria-label="Kirim form konsultasi via WhatsApp"
              >
                {isSending ? "Membuka WhatsApp..." : "Kirim via WhatsApp"}
              </button>

              {error && (
                <p
                  className="contact-form__message contact-form__message--error"
                  role="alert"
                >
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