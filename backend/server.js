import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "moonshotai/kimi-k2-instruct-0905"; // Works on Groq as of 2025

// =========================
// ANALYZE CODE
// =========================
app.post("/api/analyze", async (req, res) => {
  const { code } = req.body;

  const prompt = `
You are an expert code reviewer.

Return STRICT VALID JSON:

{
  "suggestions": [
    { "type": "performance/security/logic", "severity": "low/medium/high", "message": "" }
  ],
  "improved_code": ""
}

Code:
${code}
`;

  try {
    const resp = await axios.post(
      GROQ_URL,
      {
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = resp.data.choices[0].message.content;

    let json;
    try {
      json = JSON.parse(content);
    } catch {
      const m = content.match(/\{[\s\S]*\}/);
      json = m ? JSON.parse(m[0]) : { error: "Invalid JSON", raw: content };
    }

    res.json(json);
  } catch (err) {
    console.error("Analyze Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to analyze code" });
  }
});

// =========================
// CHAT (supports full code output)
// =========================
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: MODEL,
        messages,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Chat Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Chat API failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Backend running on http://localhost:" + PORT));
