import * as svc from '../services/instagram.service.js';

export const list = async (req, res) => {
  try {
    const data = await svc.listIG();
    res.json(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const doc = await svc.getIG(req.params.id);
    if (!doc) return res.status(404).json({ ok: false, message: 'No encontrado' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

export const publish = async (req, res) => {
  try {
    const r = await svc.publishIG(req.body);
    res.json(r);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

export const update = async (req, res) => {
  try {
    const doc = await svc.updateIG(req.params.id, req.body);
    res.json({ ok: true, data: doc });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

export const remove = async (req, res) => {
  try {
    const doc = await svc.deleteIG(req.params.id);
    res.json({ ok: true, deleted: doc._id });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};