import Corte from '../models/Corte.model.js';

//POST
export const createCorte = async (req, res) => {
  const { 
    title,
    id,
    url,
  } = req.body;
  const newCorte = new Corte({title, id, url}); const savedCorte = await newCorte.save(); res.status(201).json(savedCorte);
};

//GET
export const getCortes = async (req, res) => { const Cortes = await Corte.find(); res.json(Cortes);};

//GET BY ID
export const getCortesById = async (req, res) => { const findedCorte = await Corte.findById(req.params.corteId); res.status(200).json(findedCorte); };

//UPDATE BY ID
export const updateCortesById = async (req, res) => { const updatedCorte = await Corte.findByIdAndUpdate(req.params.corteId, req.body, {new: true}); res.status(204).json(updatedCorte); };

//DELETE BY ID
export const deleteCortesById = async (req, res) => { const deletedCorte = await Corte.findByIdAndDelete(req.params.corteId); res.status(204).json();};