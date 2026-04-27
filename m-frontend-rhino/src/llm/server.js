import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/analyze-nose", async (req, res) => {
  try {
    const { features } = req.body;

    const prompt = `
You are a professional facial aesthetics expert.

Given the following nasal feature scores (out of 4 each):

${features.map(f => `${f.name}: ${f.score}`).join("\n")}

Provide:
1. A brief overall assessment
2. Strengths of the nose
3. Areas of improvement
4. Non-surgical and surgical suggestions (if relevant)

Keep it concise and structured.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ analysis: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));