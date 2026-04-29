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
      setResult("Sorry, the AI is having problems. Please try again in a moment.");
    }
  };

  const whatsappText = encodeURIComponent(result);
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
            placeholder="Your budget, for example: 10,000,000"
            value={form.budget}
            onChange={handleChange}
          />

          <button onClick={generateRecommendation}>
            Get Recommendations
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
                Send to WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}