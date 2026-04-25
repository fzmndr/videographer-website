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

    let knowledge = `
Nama bisnis: Dika Doki Videography
Layanan: Wedding Videography, Engagement Video, Event Documentation, Company Profile
Lokasi: Bekasi dan sekitarnya
WhatsApp: 085775355771
Style: Cinematic, storytelling, emotional, elegant
`;

    try {
      const filePath = path.join(process.cwd(), "knowledge", "dika-doki.txt");
      knowledge = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
      console.log("Knowledge file tidak ditemukan, pakai default knowledge.");
    }

    const conversation = messages
      .map((msg) => `${msg.role === "user" ? "Customer" : "AI"}: ${msg.text}`)
      .join("\n");

    const aiResponse = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Kamu adalah AI customer service dan sales assistant untuk Dika Doki Videography.

Gunakan knowledge base berikut:
${knowledge}

Tugas:
1. Jawab pertanyaan customer.
2. Ingat konteks percakapan.
3. Rekomendasikan paket jika customer bertanya.
4. Arahkan customer serius ke WhatsApp.
5. Gunakan bahasa Indonesia yang ramah, santai, dan profesional.

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