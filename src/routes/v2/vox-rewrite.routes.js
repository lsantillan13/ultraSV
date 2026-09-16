import express from "express";
import axios from "axios";
const router = express.Router();

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "meta-llama/llama-4-maverick-17b-128e-instruct"
];

// EL MEJOR PROMPT - SEO + NEUQUÉN + ANTI-ALUCINACIÓN
const SYSTEM_PROMPT = `
Sos el EDITOR JEFE de Ultravox, el diario digital #1 de Neuquén Capital.
Tu trabajo es reescribir notas para web con calidad Clarín + Infobae.

REGLAS INQUEBRANTABLES:
1. NUNCA inventes datos, nombres, fechas, montos o lugares. Si no está en el original, no lo agregues.
2. Mantené la información factual 100% intacta.
3. Mejorá redacción, ortografía, fluidez y SEO.
4. Tono: periodístico neuquino, profesional, cercano, sin sensacionalismo berreta.
5. NO uses clickbait. Titular informativo pero atractivo.

FORMATO DE SALIDA - JSON VÁLIDO OBLIGATORIO:
{
  "titulo": "60-75 caracteres, con palabra clave principal al inicio, ej: 'Neuquén: ...'",
  "bajada": "140-160 caracteres, resumen que incite a leer, con 1 dato clave",
  "contenido_mejorado": "HTML limpio con <p>, <h2>, <strong>. 3 a 5 párrafos. Primer párrafo con lo más importante. Usá <h2> para subtítulos si la nota es larga. Negrita para datos clave. Lenguaje claro.",
  "palabras_clave": ["neuquen", "palabra2", "palabra3"],
  "slug_seo": "titulo-en-minusculas-con-guiones",
  "resumen_seo": "155 caracteres para meta description"
}

ESTILO NEUQUÉN:
- Decí "Neuquén capital" no solo "Neuquén" cuando sea de la ciudad
- Usá referencias locales si aplica (Av Argentina, Paseo Costero, CALF, etc)
- Evitá porteñismos

Si el contenido original es malo o corto, mejoralo igual sin inventar.
Si no podés mejorar, devolvé el original pulido.
`;

router.post("/vox-rewrite", async (req, res) => {
  try {
    const { titulo, bajada, contenido, tono = "periodistico" } = req.body;
    if (!titulo && !contenido) return res.status(400).json({ ok: false, error: "Falta contenido" });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return res.status(500).json({ ok: false, error: "Falta GROQ_API_KEY" });

    const userPrompt = `
TONO PEDIDO: ${tono}

TITULO ORIGINAL: ${titulo || "(sin titulo)"}
BAJADA ORIGINAL: ${bajada || "(sin bajada)"}
CONTENIDO ORIGINAL:
${(contenido || "").slice(0, 9000)}

Instrucción: Reescribí siguiendo el formato JSON obligatorio. No agregues texto fuera del JSON.
`;

    let lastError = "";
    for (const model of MODELS) {
      try {
        const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.5,
          max_tokens: 3500,
          response_format: { type: "json_object" }
        }, {
          headers: { Authorization: `Bearer ${apiKey}` },
          timeout: 30000
        });

        const raw = r.data.choices[0].message.content;
        const data = JSON.parse(raw);
        
        // Validación mínima
        if (!data.titulo || !data.contenido_mejorado) throw new Error("JSON incompleto");

        return res.json({ ok: true, model, ...data });

      } catch (err) {
        lastError = err.response?.data?.error?.message || err.message;
        console.warn(`[vox-rewrite] fail ${model}: ${lastError}`);
        continue;
      }
    }
    throw new Error(lastError || "Groq falló en todos los modelos");

  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Falta el backend o falló Groq", detail: e.message });
  }
});

export default router;