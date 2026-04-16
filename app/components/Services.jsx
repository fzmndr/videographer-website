export default function Services() {
  const services = [
    {
      icon: "🎥",
      title: "Wedding Videography",
      desc: "Mengabadikan momen pernikahan dengan gaya cinematic yang emosional dan elegan.",
    },
    {
      icon: "📸",
      title: "Event Documentation",
      desc: "Dokumentasi profesional untuk berbagai acara penting dengan hasil yang rapi dan berkualitas.",
    },
    {
      icon: "🚀",
      title: "Brand Video",
      desc: "Video promosi untuk meningkatkan branding dan kepercayaan bisnis Anda.",
    },
    {
      icon: "📱",
      title: "Social Media Content",
      desc: "Konten video kreatif untuk Instagram, TikTok, dan platform digital lainnya.",
    },
  ];

  return (
    <section id="layanan" className="section section--soft">
      <div className="container">
        <div className="services__header">
          <p className="services__label">Layanan</p>
          <h2 className="services__title">Solusi videography profesional</h2>
          <p className="services__subtitle">
            Dari momen personal hingga kebutuhan bisnis, kami hadir untuk
            menghasilkan video berkualitas tinggi yang berkesan dan impactful.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-card__icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="services__cta">
          <a href="#contact" className="btn btn--primary">
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
