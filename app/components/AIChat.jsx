import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo 👋 Saya AI Assistant Dika Doki. Mau tanya paket video untuk wedding, event, atau company profile?",
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
      {
        role: "user",
        text: userMessage,
      },
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
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "ai",
          text: "Maaf, AI sedang bermasalah. Kamu bisa langsung chat WhatsApp kami ya.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="ai-chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div className="ai-chat-box">
          <div className="ai-chat-header">
            <div>
              <strong>AI Assistant</strong>
              <span>Dika Doki Videography</span>
            </div>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "ai-chat-message user"
                    : "ai-chat-message ai"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="ai-chat-message ai">AI sedang mengetik...</div>
            )}
          </div>

          <div className="ai-chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tanya paket video..."
            />
            <button onClick={sendMessage} disabled={loading}>
              Kirim
            </button>
          </div>

          <a
            className="ai-chat-whatsapp"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            Lanjut WhatsApp
          </a>
        </div>
      )}
    </>
  );
}