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

Gunakan knowledge base berikut:
${knowledge}

Tugas kamu:
1. Jawab pertanyaan customer dengan jelas dan ramah.
2. Jika customer menyebut:
   - acara (wedding/event)
   - budget
   - durasi
   - kebutuhan drone
   → WAJIB rekomendasikan paket paling cocok.
3. Jelaskan paket secara singkat (jangan terlalu panjang).
4. Gunakan bahasa santai tapi profesional.
5. Jika customer terlihat tertarik, arahkan ke WhatsApp.
6. Jangan mengarang harga di luar knowledge.
7. Jika tidak tahu, jujur dan arahkan konsultasi.

Gaya bicara:
- seperti admin real (bukan robot)
- gunakan kata: kak, kamu, atau kakak
- boleh pakai emoji secukupnya 👍

Contoh perilaku:
- Kalau user bilang "budget 3 juta" → langsung rekomendasikan Cinematic
- Kalau user bilang "butuh drone" → arahkan ke Premium
- Kalau user bingung → bantu pilihkan

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