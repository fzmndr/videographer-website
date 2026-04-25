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

  const generateRecommendation = async () => {
  setResult("AI sedang membuat rekomendasi...");

  try {
    const response = await fetch("http://localhost:5000/api/recommend-package", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Terjadi kesalahan.");
    }

    setResult(data.result);
  } catch (error) {
    setResult("Maaf, AI sedang bermasalah. Coba lagi sebentar.");
  }
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