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
Kamu adalah admin videographer profesional.
Jawab seperti CS yang ramah, santai, tapi tetap profesional.

Tugas kamu:
- bantu customer tanya soal paket
- arahkan ke WhatsApp jika serius
- jawab singkat, jelas, dan meyakinkan

Pertanyaan customer:
${message}
      `,
    });

    res.status(200).json({
      reply: response.output_text,
    });
  } catch (error) {
    res.status(500).json({
      error: "AI error",
    });
  }
}