import { useState } from "react";

export default function AIAssistant() {
  const [form, setForm] = useState({
    event: "",
    location: "",
    duration: "",
    drone: "",
    budget: "",
  });

  const [result, setResult] = useState("");

  const packages = [
    {
      name: "Basic Package",
      match: "Cocok untuk acara simple, durasi pendek, dan budget hemat.",
    },
    {
      name: "Cinematic Package",
      match: "Cocok untuk wedding, engagement, company profile, atau acara penting.",
    },
    {
      name: "Premium Package",
      match: "Cocok untuk acara besar, butuh hasil cinematic, drone, dan dokumentasi lengkap.",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateRecommendation = () => {
    let recommended = packages[0];

    if (
      form.event.toLowerCase().includes("wedding") ||
      form.event.toLowerCase().includes("nikah") ||
      form.drone === "yes"
    ) {
      recommended = packages[1];
    }

    if (
      Number(form.budget) >= 5000000 ||
      form.duration.toLowerCase().includes("full") ||
      form.drone === "yes"
    ) {
      recommended = packages[2];
    }

    setResult(
      `Rekomendasi AI: ${recommended.name}\n\n${recommended.match}\n\nDetail acara:\n- Acara: ${form.event}\n- Lokasi: ${form.location}\n- Durasi: ${form.duration}\n- Drone: ${form.drone === "yes" ? "Ya" : "Tidak"}\n- Budget: Rp${form.budget}`
    );
  };

  const whatsappText = encodeURIComponent(result);
  const whatsappNumber = "6285775355771";

  return (
    <section className="ai-section" id="ai-assistant">
      <div className="container ai-container">
        <div className="ai-header">
          <span className="section-label">AI Assistant</span>
          <h2>Bingung Pilih Paket Video?</h2>
          <p>
            Ceritakan kebutuhan acara kamu, AI akan bantu rekomendasikan paket
            videografi yang paling cocok.
          </p>
        </div>

        <div className="ai-card">
          <input
            name="event"
            placeholder="Jenis acara, contoh: Wedding / Engagement / Event"
            value={form.event}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Lokasi acara"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="duration"
            placeholder="Durasi, contoh: 4 jam / full day"
            value={form.duration}
            onChange={handleChange}
          />

          <select name="drone" value={form.drone} onChange={handleChange}>
            <option value="">Butuh drone?</option>
            <option value="yes">Ya</option>
            <option value="no">Tidak</option>
          </select>

          <input
            name="budget"
            type="number"
            placeholder="Budget kamu"
            value={form.budget}
            onChange={handleChange}
          />

          <button onClick={generateRecommendation}>
            Dapatkan Rekomendasi
          </button>

          {result && (
            <div className="ai-result">
              <pre>{result}</pre>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="ai-whatsapp"
              >
                Kirim ke WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}