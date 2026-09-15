import express from "express"
const router = express.Router()

router.post('/vox-rewrite', async (req, res) => {
  const { texto_original, fuente1, modo } = req.body
  if (!texto_original) return res.status(400).json({ error: "Falta texto_original" })

  const prompt = `
Sos editor de VoxDiario Neuquén.
Modo: ${modo}
Fuente: ${fuente1}
Reescribí 100% original, manteniendo todos los datos. No copies más de 4 palabras seguidas.
Devolvé SOLO JSON: { "Entry_Title": "", "Entry_Bajada": "", "Entry_Content": "", "Entry_Slug": "", "Entry_Category": "general" }
Texto: ${texto_original}
`

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        response_format: { type: "json_object" }
      })
    })
    const j = await r.json()
    const data = JSON.parse(j.choices[0].message.content)
    res.json({ data })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router