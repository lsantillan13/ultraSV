import express from "express"
import axios from "axios"
const router = express.Router()

router.post('/vox-rewrite', async (req, res) => {
  const { texto_original, fuente1, modo } = req.body
  console.log("LLEGÓ REQUEST", { largo: texto_original?.length, fuente1, modo, tieneKey:!!process.env.GROQ_API_KEY })

  if (!texto_original) return res.status(400).json({ error: "Falta texto_original" })

  const prompt = `Sos editor de VoxDiario Neuquén. Modo: ${modo} Fuente: ${fuente1}. Reescribí 100% original. Devolvé SOLO JSON: { "Entry_Title": "", "Entry_Bajada": "", "Entry_Content": "", "Entry_Slug": "", "Entry_Category": "general" } Texto: ${texto_original}`

  try {
    const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      response_format: { type: "json_object" }
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      timeout: 30000
    })

    console.log("RESPUESTA GROQ OK:", r.data.choices[0].message.content.slice(0,100))
    const data = JSON.parse(r.data.choices[0].message.content)
    res.json({ data })

  } catch (e) {
    console.log("ERROR GROQ COMPLETO:", e.response?.data || e.message)
    res.status(500).json({
      error: "Groq falló",
      detalle: e.response?.data || e.message,
      keyExiste:!!process.env.GROQ_API_KEY
    })
  }
})

export default router