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
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY belum terbaca di Vercel.",
      });
    }

    const messages = req.body.messages || [];

    // 🔥 Knowledge fallback + file
    let knowledge =
      "Dika Doki Videography menyediakan jasa wedding, event, dan company profile di Bekasi.";

    try {
      const filePath = path.join(process.cwd(), "knowledge", "dika-doki.txt");
      knowledge = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.log("Knowledge file tidak ditemukan, pakai default.");
    }

    // 🔥 Memory conversation
    const conversation = messages
      .map(
        (msg) =>
          `${msg.role === "user" ? "Customer" : "AI"}: ${msg.text}`
      )
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
3. Rekomendasikan paket jika customer bertanya.
4. Arahkan customer serius ke WhatsApp.
5. Jangan mengarang harga di luar knowledge base.
6. Gunakan bahasa Indonesia yang ramah, santai, profesional, dan meyakinkan.

Riwayat percakapan:
${conversation}
      `,
    });

    return res.status(200).json({
      reply: aiResponse.output_text,
    });
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return res.status(500).json({
      error: error.message || "AI sedang bermasalah.",
    });
  }
}