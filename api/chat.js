import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Kamu adalah AI customer service untuk bisnis videographer bernama Dika Doki.

Gaya bahasa:
- Bahasa Indonesia
- Ramah, santai, profesional
- Jawaban singkat tapi meyakinkan
- Arahkan customer serius ke WhatsApp

Kamu bisa bantu:
- menjelaskan paket videografi
- rekomendasi paket
- menjawab pertanyaan wedding/event/company profile
- menyarankan drone, full day, cinematic video
- mengajak customer konsultasi via WhatsApp

Nomor WhatsApp:
085775355771

Pertanyaan customer:
${message}
      `,
    });

    res.status(200).json({
      reply: response.output_text,
    });
  } catch (error) {
    res.status(500).json({
      error: "AI sedang bermasalah.",
    });
  }
}