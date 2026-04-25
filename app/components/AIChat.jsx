import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo 👋 Saya AI Assistant Dika Doki. Mau tanya paket video?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "6285775355771";

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    const newMessages = [
      ...messages,
      { role: "user", text: userMessage },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI error");
      }

      setMessages([
        ...newMessages,
        { role: "ai", text: data.reply },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "ai",
          text: "Maaf, AI sedang bermasalah. Silakan langsung chat WhatsApp ya.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "24px",
          zIndex: 9999,
        }}
      >
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "450px",
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          <div style={{ padding: "10px" }}>AI Assistant</div>

          <div style={{ flex: 1, overflow: "auto", padding: "10px" }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <b>{msg.role === "user" ? "Kamu" : "AI"}:</b>
                <div>{msg.text}</div>
              </div>
            ))}
              {loading && <div>AI sedang mengetik...</div>}
          </div>

          <div style={{ display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1 }}
            />
            <button onClick={sendMessage}>Kirim</button>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            style={{
              textAlign: "center",
              padding: "10px",
              background: "green",
              color: "#fff",
            }}
          >
            WhatsApp
          </a>
        </div>
      )}
    </>
  );
}