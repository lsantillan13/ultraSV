import express from 'express';
const router = express.Router();

// Estado en memoria, liviano, no usa Mongo
let currentListeners = 0;

router.get('/status', (req,res)=>{
  res.json({ onAir: currentListeners > 0 ? true : false, listeners: currentListeners })
})

// lo usamos desde el socket para actualizar
export const setListeners = (n) => currentListeners = n;
export default router;