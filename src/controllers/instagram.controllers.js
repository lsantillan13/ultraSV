import * as svc from '../services/instagram.service.js';

export const list = async (req, res) => {
  try {
    const data = await svc.listIG();
    res.json(data); // array directo
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
export const getOne = async (req, res) => {
  try { res.json(await svc.getIG(req.params.id)); } catch (e) {
    res.status(e.message.includes('No encontrado')?404:500).json({ ok:false, error:e.message });
  }
};
export const publish = async (req, res) => {
  try { res.json(await svc.publishIG(req.body)); } catch (e) { res.status(500).json({ ok:false, error:e.message }); }
};
export const update = async (req, res) => {
  try { res.json({ ok:true, data: await svc.updateIG(req.params.id, req.body) }); } catch (e) { res.status(500).json({ ok:false, error:e.message }); }
};
export const remove = async (req, res) => {
  try { res.json({ ok:true, deleted: (await svc.deleteIG(req.params.id))._id }); } catch (e) { res.status(500).json({ ok:false, error:e.message }); }
};