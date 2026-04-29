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
  const [isError, setIsError] = useState(false);

  const formatRupiah = (value) => {
    const angka = value.replace(/\D/g, "");
    return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget") {
      setForm({
        ...form,
        budget: formatRupiah(value),
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const generateRecommendation = async () => {
    setResult("AI is making recommendations...");
    setIsError(false);

    try {
      const response = await fetch("/api/recommend-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          budget: Number(form.budget.replace(/\./g, "")),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred.");
      }

      setResult(data.result);
    } catch (error) {
      setIsError(true);
      setResult("Sorry, the AI is having problems. Please click the button below to consult via WhatsApp.");
    }
  };

  // LOGIKA PESAN WHATSAPP
  // Jika AI sukses, pakai 'result'. Jika error/kosong, pakai detail dari form.
  const fallbackText = `Halo Dikadoki, saya ingin konsultasi paket videografi:
- Acara: ${form.event || "-"}
- Lokasi: ${form.location || "-"}
- Durasi: ${form.duration || "-"}
- Drone: ${form.drone || "-"}
- Budget: Rp${form.budget || "-"}`;

  const finalMessage = (isError || !result || result.includes("AI is making")) ? fallbackText : result;
  
  const whatsappText = encodeURIComponent(finalMessage);
  const whatsappNumber = "6285775355771";

  return (
    <section className="ai-section" id="ai-assistant">
      <div className="container ai-container">
        <div className="ai-header">
          <span className="section-label">AI Assistant</span>
          <h2>Confused About Choosing a Video Package?</h2>
          <p>
            Tell us your event needs, AI will help recommend the most suitable videography package.
          </p>
        </div>

        <div className="ai-card">
          <input
            name="event"
            placeholder="Type of event, for example: Wedding / Engagement / Event"
            value={form.event}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Event location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="duration"
            placeholder="Duration, example: 4 hours / full day"
            value={form.duration}
            onChange={handleChange}
          />

          <select name="drone" value={form.drone} onChange={handleChange}>
            <option value="">Need a drone?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <input
            name="budget"
            type="text"
            inputMode="numeric"
            placeholder="Your budget, for example: 10.000.000"
            value={form.budget}
            onChange={handleChange}
          />

          <button onClick={generateRecommendation}>
            Get Recommendations
          </button>

          {/* Menampilkan hasil atau link WhatsApp jika salah satu input terisi */}
          {(result || form.event) && (
            <div className="ai-result">
              {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="ai-whatsapp"
                style={{
                    marginTop: '10px',
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    borderRadius: '5px',
                    textDecoration: 'none'
                }}
              >
                {isError ? "Hubungi Admin via WhatsApp" : "Kirim ke WhatsApp"}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}