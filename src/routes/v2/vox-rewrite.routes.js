import express from "express";
import axios from "axios";
const router = express.Router();

// USA TU KEY - lee minuscula o mayuscula, la que tengas
const getKey = () => process.env.openrouter_api_key || process.env.OPENROUTER_API_KEY || "";

const SYSTEM_PROMPT = `
Sos EDITOR JEFE de Ultravox Neuquén, diario digital de Neuquén capital.

TAREA: Reescribir la noticia que te dan, manteniendo TODA la información, sin resumir.

REGLAS INQUEBRANTABLES - SI FALLAS UNA, FALLA TODO:

1. LARGO PROPORCIONAL OBLIGATORIO:
   - Contá las palabras del texto original.
   - Tenés que devolver EXACTAMENTE la misma cantidad o 10% más.
   - Si te mandan 200 palabras, devolvés 200. Si te mandan 800 palabras, devolvés 800.
   - NUNCA resumas. Está prohibido acortar.

2. CERO ALUCINACIÓN:
   - No inventes años, fechas, montos, nombres, cargos, calles, organismos.
   - Si el texto dice "fin de año", dejá "fin de año". No pongas 2024, 2025, 2026 si no está escrito.
   - Copiá nombres propios exactos como aparecen: funcionarios, calles, barrios, empresas.
   - Copiá cifras exactas como aparecen: $30.000 millones, 70.000 vehículos, etc.

3. CONSERVAR TODO:
   - Mantené todas las declaraciones textuales entre comillas.
   - Mantené todos los datos, todos los párrafos, todos los subtítulos.
   - Mantené el orden lógico de la noticia.

4. FORMATO Y ESTILO:
   - Usá HTML en contenido_mejorado: <p> para párrafos (5 a 10 según el largo), <h2> para subtítulos si el original los tiene, <strong> para datos clave.
   - Tono: Periodístico profesional neuquino, calidad Clarín/La Nación, objetivo, sin adjetivos militantes.
   - Título: 60-75 caracteres, con verbo, atractivo.
   - Bajada: 150-180 caracteres.

5. SALIDA:
   - Devolvé SOLO JSON válido, sin texto antes ni después.
   - Formato: {"titulo":"","bajada":"","contenido_mejorado":"<p>...</p><h2>...</h2><p>...</p>","palabras_clave":["3 a 5"],"slug_seo":"slug-corto","resumen_seo":"155 caracteres"}

Si no cumplís con el largo proporcional, la respuesta será descartada.
`;

const FREE_MODELS = [
  "deepseek/deepseek-chat:free",
  "deepseek/deepseek-r1:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free"
];

function extractJSON(t){
  const m = t.match(/\{[\s\S]*\}/);
  if(!m) throw new Error("Sin JSON");
  return JSON.parse(m[0]);
}

async function callModel(model, prompt, apiKey){
  const r = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model,
    messages: [
      { role:"system", content: SYSTEM_PROMPT },
      { role:"user", content: prompt }
    ],
    temperature: 0.15,
    max_tokens: 4000
  },{
    headers:{
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://ultravox.com.ar",
      "X-Title": "Ultravox",
      "Content-Type":"application/json"
    },
    timeout: 40000
  });
  return extractJSON(r.data.choices[0].message.content);
}

router.get("/", (req,res)=>{
  const k = getKey();
  res.json({ ok:true, endpoint:"/api/v2/vox-rewrite V6 FULL", has_key:!!k, key_var: k? "tu openrouter_api_key OK" : "NO KEY" });
});

router.post("/", async (req,res)=>{
  const API_KEY = getKey();
  if(!API_KEY) return res.status(500).json({ ok:false, error:"missing_api_key", detail:"No se encontró openrouter_api_key en Koyeb env vars" });

  try{
    const original = req.body.texto_original || req.body.contenido || "";
    if(!original || original.length < 50) return res.status(400).json({ ok:false, error:"texto_original vacio" });

    const wordCount = original.trim().split(/\s+/).length;
    const contenido = original.slice(0, 8000);

    const prompt = `
TEXTO ORIGINAL: ${wordCount} palabras.
INSTRUCCIÓN: Tenés que devolver ${wordCount} palabras mínimo (no menos de ${Math.floor(wordCount*0.9)}). Es OBLIGATORIO que sea largo proporcional. No resumas. Reescribí completo conservando todos los párrafos, datos y declaraciones.

${contenido}

Devolvé JSON largo ahora.
`;

    const errors = [];

    for(const model of FREE_MODELS){
      try{
        console.log(`[vox] IN:${wordCount} -> ${model}`);
        const data = await callModel(model, prompt, API_KEY);

        const outText = (data.contenido_mejorado||"").replace(/<[^>]*>/g," ");
        const outWords = outText.split(/\s+/).filter(Boolean).length;

        console.log(`[vox] OUT:${outWords} palabras`);

        // Validación proporcional
        if(outWords < wordCount * 0.7){
          throw new Error(`Resumen detectado: ${outWords} vs ${wordCount} originales`);
        }

        return res.json({
          ok:true,
          model,
          stats:{ in: wordCount, out: outWords },
          titulo: data.titulo,
          bajada: data.bajada,
          contenido_mejorado: data.contenido_mejorado,
          palabras_clave: data.palabras_clave,
          slug_seo: data.slug_seo,
          resumen_seo: data.resumen_seo,
          data:{
            Entry_Title: data.titulo,
            Entry_Bajada: data.bajada,
            Entry_Content: data.contenido_mejorado
          }
        });

      }catch(e){
        const msg = e.response?.data?.error?.message || e.message;
        console.log(`[vox] Fail ${model}: ${msg}`);
        errors.push({ model, error: msg });
        if(msg.includes("429")) await new Promise(r=>setTimeout(r,1500));
        continue;
      }
    }

    return res.status(500).json({ ok:false, error:"all_models_saturated", errors });

  }catch(e){
    console.error("[vox] fatal", e.response?.data || e.message);
    res.status(500).json({ ok:false, error:e.message });
  }
});

export default router;