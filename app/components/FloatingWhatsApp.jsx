const WHATSAPP_NUMBER = "6285775355771";
const WHATSAPP_TEXT =
  "Halo Dika Doki, saya tertarik dengan jasa videography. Bisa info paket dan harga?";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  return (
    <a
      href={whatsappUrl}
      className="floating-wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Dika Doki via WhatsApp"
    >
      <span className="floating-wa__icon">💬</span>
      <span className="floating-wa__text">Booking WhatsApp</span>
    </a>
  );
}