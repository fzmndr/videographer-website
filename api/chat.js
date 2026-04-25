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
    const messages = req.body.messages || [];

    const filePath = path.join(process.cwd(), "knowledge", "dika-doki.txt");
    const knowledge = fs.readFileSync(filePath, "utf-8");

    const conversation = messages
      .map((msg) => `${msg.role === "user" ? "Customer" : "AI"}: ${msg.text}`)
      .join("\n");

    const aiResponse = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Kamu adalah AI customer service dan sales assistant untuk Dika Doki Videography.

Gunakan knowledge base berikut sebagai sumber utama:
${knowledge}

Tugas kamu:
1. Jawab pertanyaan customer berdasarkan knowledge base.
2. Ingat konteks percakapan sebelumnya.
3. Jika customer menyebut acara, budget, durasi, atau drone, rekomendasikan paket paling cocok.
4. Jika customer terlihat serius, arahkan ke WhatsApp.
5. Jangan mengarang harga di luar knowledge base.
6. Jika informasi tidak ada, jawab dengan jujur dan arahkan konsultasi via WhatsApp.
7. Gunakan bahasa Indonesia yang ramah, santai, profesional, dan meyakinkan.

Riwayat percakapan:
${conversation}
      `,
    });

    res.status(200).json({
      reply: aiResponse.output_text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI sedang bermasalah.",
    });
  }
}