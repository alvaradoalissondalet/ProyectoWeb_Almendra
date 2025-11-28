const NivelDificultad = require('../models/NivelDificultad');

// GET /api/niveles
exports.list = async (req, res) => {
  try {
    const niveles = await NivelDificultad.find();
    res.json(niveles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/niveles/:id
exports.detail = async (req, res) => {
  try {
    const nivel = await NivelDificultad.findById(req.params.id);
    if (!nivel) return res.status(404).json({ message: "Nivel no encontrado" });
    res.json(nivel);
  } catch {
    res.status(400).json({ message: "ID inválido" });
  }
};

// POST /api/niveles
exports.create = async (req, res) => {
  try {
    const { TipoNivel } = req.body;

    // VALIDACIÓN
    if (!TipoNivel || TipoNivel.trim() === "") {
      return res.status(400).json({ message: "TipoNivel es obligatorio" });
    }

    const nuevo = new NivelDificultad({ TipoNivel });
    const saved = await nuevo.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/niveles/:id
exports.update = async (req, res) => {
  try {
    const { TipoNivel } = req.body;

    // VALIDACIÓN
    if (TipoNivel !== undefined && TipoNivel.trim() === "") {
      return res.status(400).json({ message: "TipoNivel no puede estar vacío" });
    }

    const updated = await NivelDificultad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Nivel no encontrado" });

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/niveles/:id
exports.remove = async (req, res) => {
  try {
    const deleted = await NivelDificultad.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nivel no encontrado" });

    res.json({ message: "Nivel eliminado", nivel: deleted });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
