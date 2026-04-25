import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    // 🔥 baca knowledge file
    const filePath = path.join(process.cwd(), "knowledge", "dika-doki.txt");
    const knowledge = fs.readFileSync(filePath, "utf-8");

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Kamu adalah AI customer service untuk Dika Doki Videography.

Gunakan informasi berikut sebagai sumber utama:
${knowledge}

Aturan:
- jawab berdasarkan data di atas
- jika tidak ada di data, tetap bantu dengan jawaban umum
- gunakan bahasa Indonesia
- ramah, santai, profesional
- arahkan ke WhatsApp jika user terlihat serius

Pertanyaan:
${message}
      `,
    });

    res.status(200).json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI error",
    });
  }
}