import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/resumir", async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "No se recibió texto" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: "Eres un asistente que resume textos en español."
        },
        {
          role: "user",
          content: `Resume este texto:\n\n${texto}`
        }
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    const resumen = completion.choices[0].message.content;

    res.json({ resumen });

  } catch (error) {
    console.error("Error Groq:", error);
    res.status(500).json({ error: "Error al generar resumen con IA" });
  }
});

app.listen(3001, () => {
  console.log("Servidor IA funcionando en http://localhost:3001");
});
