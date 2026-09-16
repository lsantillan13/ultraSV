import express from "express";
import axios from "axios";
const router = express.Router();

const SYSTEM_PROMPT = `Sos EDITOR JEFE de Ultravox Neuquén. Reescribí notas con calidad Clarín.
NUNCA inventes datos. Tono neuquino profesional.
Devolvé SOLO JSON:
{"titulo":"60-75c","bajada":"140-160c","contenido_mejorado":"HTML <p><h2><strong>","palabras_clave":["neuquen"],"slug_seo":"slug","resumen_seo":"155c"}`;

const OPENROUTER_MODELS_FREE = [
  "deepseek/deepseek-chat:free",
  "deepseek/deepseek-r1:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "google/gemini-flash-1.5-8b:free"
];

const GROQ_MODELS_FREE = [
  "deepseek-r1-distill-llama-70b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant"
];

function extractJSON(t){
  const m = t.match(/\{[\s\S]*\}/);
  if(!m) throw new Error("No JSON");
  return JSON.parse(m[0]);
}

async function callOpenRouter(model, prompt){
  const r = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model,
    messages: [{role:"system",content:SYSTEM_PROMPT},{role:"user",content:prompt}],
    temperature: 0.4,
    max_tokens: 1200
  },{
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://ultravox.com.ar",
      "X-Title": "Ultravox"
    },
    timeout: 25000
  });
  return extractJSON(r.data.choices[0].message.content);
}

async function callGroq(model, prompt){
  const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
    model,
    messages: [{role:"system",content:SYSTEM_PROMPT},{role:"user",content:prompt}],
    temperature: 0.4,
    max_tokens: 1200
  },{
    headers: {Authorization: `Bearer ${process.env.GROQ_API_KEY}`},
    timeout: 20000
  });
  return extractJSON(r.data.choices[0].message.content);
}

router.post("/", async (req,res)=>{
  try{
    const original = req.body.texto_original || req.body.contenido || "";
    if(!original) return res.status(400).json({ok:false,error:"Falta contenido"});

    const contenido = original.slice(0, 3000);
    const prompt = `MODO:${req.body.modo||"simple"} FUENTE:${req.body.fuente1||""}\n${contenido}\nSolo JSON.`;

    console.log(`[vox] ${original.length} -> ${contenido.length}`);

    for(const model of OPENROUTER_MODELS_FREE){
      try{
        console.log(`[vox] OR ${model}`);
        const data = await callOpenRouter(model, prompt);
        return res.json({
          ok: true,
          model,
          titulo: data.titulo,
          bajada: data.bajada,
          contenido_mejorado: data.contenido_mejorado,
          palabras_clave: data.palabras_clave,
          slug_seo: data.slug_seo,
          resumen_seo: data.resumen_seo,
          data: {
            Entry_Title: data.titulo,
            Entry_Bajada: data.bajada,
            Entry_Content: data.contenido_mejorado
          }
        });
      }catch(e){
        console.log(`Fallo ${model}: ${e.response?.data?.error?.message || e.message}`);
        continue;
      }
    }

    for(const model of GROQ_MODELS_FREE){
      try{
        console.log(`[vox] Groq ${model}`);
        const data = await callGroq(model, prompt);
        return res.json({
          ok: true,
          model,
          titulo: data.titulo,
          bajada: data.bajada,
          contenido_mejorado: data.contenido_mejorado,
          palabras_clave: data.palabras_clave,
          slug_seo: data.slug_seo,
          resumen_seo: data.resumen_seo,
          data: {
            Entry_Title: data.titulo,
            Entry_Bajada: data.bajada,
            Entry_Content: data.contenido_mejorado
          }
        });
      }catch(e){
        if(e.response?.data?.error?.code==="rate_limit_exceeded"){
          await new Promise(r=>setTimeout(r, 2000));
        }
        continue;
      }
    }

    return res.status(429).json({ok:false, error:"rate_limited_all_free"});
  }catch(e){
    console.error(e.response?.data || e.message);
    res.status(500).json({ok:false, error:e.message});
  }
});

export default router;