// app/components/FloatingSocial.jsx

const WHATSAPP_NUMBER = "6285775355771";
const WHATSAPP_TEXT =
  "Halo Dika Doki, saya tertarik dengan jasa videography. Bisa info paket dan harga?";

const INSTAGRAM_URL = "https://instagram.com/username_kamu";

export default function FloatingSocial() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  return (
    <div className="floating-social">
      {/* Instagram */}
      <a
        href={INSTAGRAM_URL}
        className="floating-social__btn floating-social__btn--ig"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lihat Instagram Dika Doki"
      >
        📸
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        className="floating-social__btn floating-social__btn--wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
      >
        💬
      </a>
    </div>
  );
}