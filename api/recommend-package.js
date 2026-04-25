import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { event, location, duration, drone, budget } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Kamu adalah AI assistant untuk bisnis videographer.

Data customer:
- Acara: ${event}
- Lokasi: ${location}
- Durasi: ${duration}
- Butuh drone: ${drone}
- Budget: Rp${budget}

Pilihan paket:
1. Basic Package: acara simple dan budget hemat.
2. Cinematic Package: wedding, engagement, event, company profile.
3. Premium Package: acara besar, full day, drone, dokumentasi lengkap.

Jawab dalam bahasa Indonesia dengan format:
- Rekomendasi Paket
- Alasan
- Saran Tambahan
- Pesan singkat untuk WhatsApp
      `,
    });

    res.status(200).json({
      result: response.output_text,
    });
  } catch (error) {
    res.status(500).json({
      error: "Gagal mendapatkan rekomendasi AI.",
    });
  }
}