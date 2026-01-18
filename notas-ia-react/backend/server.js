import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/resumir", async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "No se recibió texto" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Eres un asistente que resume textos." },
        { role: "user", content: `Resume el siguiente texto:\n\n${texto}` }
      ],
    });

    const resumen = completion.choices[0].message.content;

    res.json({ resumen });
  } catch (error) {
    console.error("Error OpenAI:", error);
    res.status(500).json({ error: "Error al generar el resumen" });
  }
});

app.listen(3001, () => {
  console.log("Servidor IA funcionando en http://localhost:3001");
});
