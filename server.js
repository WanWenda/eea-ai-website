import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && typeof item.content === "string")
    .slice(-8)
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: item.content.slice(0, 2000)
    }));
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({
        error: "服务器没有配置 OPENAI_API_KEY。请在 Render 的 Environment Variables 中添加 OPENAI_API_KEY。"
      });
    }

    const { message, history } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message 不能为空。" });
    }

    const input = [
      {
        role: "system",
        content:
          "你是一个电气工程及其自动化专业学习助手。你要用中文回答，表达清晰、结构化、适合本科生理解。你擅长讲解工程电磁场、电机学、模拟电子技术、数字电子技术、电力系统分析、电力电子技术、自动控制原理、新型电力系统、储能、智能电网等内容。回答时尽量结合直观类比、公式含义、工程应用和学习建议。"
      },
      ...normalizeHistory(history),
      {
        role: "user",
        content: message.slice(0, 4000)
      }
    ];

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input,
        temperature: 0.7,
        max_output_tokens: 1200
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI API error:", data);
      return res.status(openaiResponse.status).json({
        error:
          data?.error?.message ||
          "OpenAI API 调用失败。请检查 API Key、模型名和账号额度。"
      });
    }

    const reply =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        ?.map((part) => part.text || "")
        ?.join("")
        ?.trim() ||
      "模型没有返回文本内容。";

    res.json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "服务器内部错误，请稍后再试。" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`EEA AI website is running on port ${PORT}`);
});
