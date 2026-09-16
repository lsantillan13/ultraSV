import express from "express"
import axios from "axios"

const router = express.Router()

// Modelos válidos HOY en Groq - en orden de preferencia
const MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "llama3-8b-8192",
  "mixtral-8x7b-32768",
  "gemma2-9b-it"
]

router.post('/', async (req, res) => {
  const { texto_original, fuente1, modo } = req.body
  console.log("LLEGÓ REQUEST", { largo: texto_original?.length, fuente1, modo, tieneKey: !!process.env.GROQ_API_KEY })

  if (!texto_original) return res.status(400).json({ error: "Falta texto_original" })

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "Falta GROQ_API_KEY", keyExiste: false })
  }

  const prompt = `
Sos editor de VoxDiario Neuquén. Modo: ${modo || 'neutral'} Fuente: ${fuente1 || 'generica'}.
Reescribí 100% original, sin copiar frases, tono neuquino informativo.

Devolvé SOLO JSON válido, sin markdown, con esta forma exacta:
{ "Entry_Title": "", "Entry_Bajada": "", "Entry_Content": "<p>...</p><p>...</p>", "Entry_Slug": "titulo-en-kebab-case", "Entry_Category": "general" }

Texto original:
${texto_original}
  `.trim()

  let lastError = null

  for (const model of MODELS) {
    try {
      console.log(`[vox-rewrite] probando ${model}`)
      const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        response_format: { type: "json_object" }
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        timeout: 30000
      })

      console.log("RESPUESTA GROQ OK con", model, ":", r.data.choices[0].message.content.slice(0,120))
      const content = r.data.choices[0].message.content
      const data = JSON.parse(content)
      return res.json({ data, model_usado: model, keyExiste: true })

    } catch (e) {
      const detalle = e.response?.data || e.message
      console.log(`FALLÓ ${model}:`, detalle)
      lastError = detalle
      // si es error de modelo, probá el siguiente
      if (detalle?.error?.code === 'model_not_found' || detalle?.error?.code === 'model_decommissioned') {
        continue
      }
      // si es auth o rate limit, cortá
      if (e.response?.status === 401 || e.response?.status === 429) break
    }
  }

  console.log("ERROR GROQ COMPLETO:", lastError)
  return res.status(500).json({
    error: "Groq falló",
    detalle: lastError,
    keyExiste: !!process.env.GROQ_API_KEY
  })
})

export default router