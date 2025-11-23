// controllers/rangoEdadController.js
const RangoEdad = require('../models/RangoEdad');

// GET /api/rangos
exports.list = async (req, res) => {
  try {
    const rangos = await RangoEdad.find();
    res.json(rangos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/rangos/:id
exports.detail = async (req, res) => {
  try {
    const rango = await RangoEdad.findById(req.params.id);
    if (!rango) return res.status(404).json({ message: "Rango no encontrado" });
    res.json(rango);
  } catch {
    res.status(400).json({ message: "ID inválido" });
  }
};

// POST /api/rangos
exports.create = async (req, res) => {
  try {
    const { NombreRango, Rango } = req.body;

    const nuevo = new RangoEdad({
      NombreRango,
      Rango
    });

    const saved = await nuevo.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/rangos/:id
exports.update = async (req, res) => {
  try {
    const updated = await RangoEdad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Rango no encontrado" });

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/rangos/:id
exports.remove = async (req, res) => {
  try {
    const deleted = await RangoEdad.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Rango no encontrado" });

    res.json({ message: "Rango eliminado", rango: deleted });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
