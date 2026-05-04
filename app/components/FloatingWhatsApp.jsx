// app/components/FloatingSocial.jsx

const WHATSAPP_NUMBER = "6285775355771";
const WHATSAPP_TEXT =
  "Hello DikaDoki, I am interested in videography services. Can you provide information on the packages and prices?";

const INSTAGRAM_URL = "https://www.instagram.com/dikadoki/";
const YOUTUBE_URL = "https://youtube.com/@dokidika?si=24bkz4uyvMbk5BnM";

export default function FloatingSocial() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  return (
    <div className="floating-social">
      {/* YouTube */}
      <a
        href={YOUTUBE_URL}
        className="floating-social__btn floating-social__btn--yt"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit DikaDoki's YouTube Channel"
      >
        ▶
      </a>

      {/* Instagram */}
      <a
        href={INSTAGRAM_URL}
        className="floating-social__btn floating-social__btn--ig"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Check out DikaDoki's Instagram"
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