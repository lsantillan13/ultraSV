import express from "express";
import axios from "axios";
const router = express.Router();

// MODELOS VIGENTES HOY - verificados en console.groq.com/docs/models
const MODELS = [
  "openai/gpt-oss-20b", // 1000 t/s - reemplazo oficial de llama-3.1-8b-instant
  "openai/gpt-oss-120b", // 500 t/s - calidad máxima
  "qwen/qwen3.6-27b" // fallback
];

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
  "titulo": "60-75 caracteres, con palabra clave principal al inicio, ej: 'Neuquén:...'",
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

router.post("/", async (req, res) => {
  try {
    console.log("LLEGÓ REQUEST", {
      largo: (req.body.texto_original || req.body.contenido || "").length,
      fuente1: req.body.fuente1,
      modo: req.body.modo,
      tieneKey:!!process.env.GROQ_API_KEY
    });

    const titulo = req.body.titulo || req.body.texto_original?.slice(0,200) || "";
    const bajada = req.body.bajada || req.body.texto_secundario || "";
    const contenido = req.body.contenido || req.body.texto_original || "";

    if (!contenido) return res.status(400).json({ ok:false, error:"Falta contenido" });

    // Groq max 131k pero cortamos a 12k para no pasarnos de TPM
    const contenidoCorto = contenido.slice(0, 12000);

    const userPrompt = `
TONO: ${req.body.modo || req.body.tono || "periodistico"}
TITULO ORIGINAL: ${titulo}
BAJADA: ${bajada}
CONTENIDO:
${contenidoCorto}
FUENTE: ${req.body.fuente1 || ""} ${req.body.fuente2 || ""}
Instrucción: Reescribí en JSON obligatorio.
`;

    let lastError = null;
    for (const model of MODELS) {
      try {
        console.log(`[vox-rewrite] probando ${model}`);
        const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
          model,
          messages: [{role:"system", content: SYSTEM_PROMPT}, {role:"user", content: userPrompt}],
          temperature: 0.5,
          max_tokens: 3500,
          response_format: { type: "json_object" }
        }, {
          headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
          timeout: 30000
        });

        const data = JSON.parse(r.data.choices[0].message.content);
        console.log(`[vox-rewrite] OK con ${model}`);

        return res.json({
          ok: true,
          model,
         ...data,
          data: {
            Entry_Title: data.titulo,
            Entry_Bajada: data.bajada,
            Entry_Content: data.contenido_mejorado,
            Entry_Slug: data.slug_seo,
            Entry_Resume: data.resumen_seo,
            Entry_Keywords: data.palabras_clave
          }
        });
      } catch (err) {
        lastError = err.response?.data || { message: err.message };
        console.log(`FALLÓ ${model}:`, lastError);
        continue;
      }
    }

    throw lastError;

  } catch (e) {
    console.error("ERROR GROQ COMPLETO:", e.error || e);
    res.status(500).json({ ok:false, error:"Falta el backend o falló Groq", detail: e.error || e.message });
  }
});

export default router;