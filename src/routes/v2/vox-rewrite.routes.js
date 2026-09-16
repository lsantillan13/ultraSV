import express from "express";
import axios from "axios";
const router = express.Router();

const SYSTEM_PROMPT = `
Sos EDITOR JEFE de un diario digital argentino.

TAREA: Reescribir la noticia que te dan, manteniendo TODA la información.

REGLAS OBLIGATORIAS:
1. LARGO PROPORCIONAL: Contá las palabras del texto original. Devolvé la MISMA cantidad de palabras o un poco más (90% a 110%). Si el original tiene 200 palabras, devolvés 200. Si tiene 800, devolvés 800. NUNCA resumas.
2. PROHIBIDO INVENTAR: No inventes fechas, años, nombres, montos, lugares, cargos, estadísticas. Copiá exactamente lo que dice el texto original. Si dice "fin de año", dejá "fin de año". No agregues el año si no está.
3. CONSERVAR TODO: Mantené todas las declaraciones textuales, todos los nombres propios, todos los números, todas las calles/barrios/organismos.
4. FORMATO: Usá HTML para contenido_mejorado: <p> para párrafos, <h2> para cada subtítulo que ya exista en el original, <strong> para datos clave. 5 a 10 párrafos según el largo original.
5. Tono: Profesional, objetivo, argentino.

Devolvé SOLO JSON válido:
{"titulo":"60-75 caracteres, atractivo","bajada":"150-180 caracteres","contenido_mejorado":"HTML largo y proporcional","palabras_clave":["3 a 5 keywords"],"slug_seo":"slug-seo-corto","resumen_seo":"155 caracteres"}
`;

const MODELS_FREE = [
  "deepseek/deepseek-chat:free",
  "deepseek/deepseek-r1:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free"
];

function extractJSON(t){
  const m = t.match(/\{[\s\S]*\}/);
  if(!m) throw new Error("No JSON en respuesta");
  return JSON.parse(m[0]);
}

async function callOR(model, prompt){
  const r = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model,
    messages: [
      {role:"system", content: SYSTEM_PROMPT},
      {role:"user", content: prompt}
    ],
    temperature: 0.15,
    max_tokens: 4000
  },{
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://ultravox.com.ar",
      "X-Title": "Ultravox"
    },
    timeout: 45000
  });
  return extractJSON(r.data.choices[0].message.content);
}

router.post("/", async (req,res)=>{
  try{
    const original = req.body.texto_original || req.body.contenido || "";
    if(!original || original.length < 50) return res.status(400).json({ok:false, error:"Texto muy corto"});

    const wordCount = original.trim().split(/\s+/).length;
    const contenido = original.slice(0, 8000);

    const prompt = `TEXTO ORIGINAL: ${wordCount} palabras. Tenés que devolver ${wordCount} palabras aprox, no menos de ${Math.floor(wordCount*0.9)}. No resumas, reescribí completo conservando todo.

${contenido}

Devolvé JSON largo ahora.`;

    for(const model of MODELS_FREE){
      try{
        console.log(`[vox] IN: ${wordCount} palabras -> ${model}`);
        const data = await callOR(model, prompt);

        const outWords = (data.contenido_mejorado || "").replace(/<[^>]*>/g," ").split(/\s+/).filter(Boolean).length;
        console.log(`[vox] OUT: ${outWords} palabras`);

        // Validación proporcional genérica
        if(outWords < wordCount * 0.7){
          throw new Error(`Resumen detectado: ${outWords} palabras vs ${wordCount} originales. Reintento.`);
        }

        return res.json({
          ok: true,
          model,
          stats: { in: wordCount, out: outWords },
         ...data,
          data: {
            Entry_Title: data.titulo,
            Entry_Bajada: data.bajada,
            Entry_Content: data.contenido_mejorado
          }
        });
      }catch(e){
        console.log(`[vox] Falló ${model}: ${e.message}`);
        continue;
      }
    }

    return res.status(500).json({ok:false, error:"all_free_models_failed"});
  }catch(e){
    console.error(e.response?.data || e.message);
    res.status(500).json({ok:false, error:e.message});
  }
});

export default router;