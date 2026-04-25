import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "ai", text: data.reply },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "ai", text: "Maaf, AI error." },
      ]);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
        }}
      >
        💬
      </button>

      {/* CHAT BOX */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "10px", borderBottom: "1px solid #333" }}>
            AI Assistant
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "10px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <b>{msg.role === "user" ? "Kamu" : "AI"}:</b>
                <div>{msg.text}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1 }}
              placeholder="Tanya apa saja..."
            />
            <button onClick={sendMessage}>Kirim</button>
          </div>
        </div>
      )}
    </>
  );
}