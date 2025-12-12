const Rol = require('../models/Rol');

// GET /api/roles
exports.list = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/roles/:id
exports.detail = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) return res.status(404).json({ message: "Rol no encontrado" });
    res.json(rol);
  } catch {
    res.status(400).json({ message: "ID invalido" });
  }
};

// POST /api/roles
exports.create = async (req, res) => {
  try {
    const { NombreRol } = req.body;

    if (!NombreRol || NombreRol.trim() === "") {
      return res.status(400).json({ message: "NombreRol es obligatorio" });
    }

    const nuevo = new Rol({ NombreRol });
    const saved = await nuevo.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/roles/:id
exports.update = async (req, res) => {
  try {
    const { NombreRol } = req.body;

    if (NombreRol !== undefined && NombreRol.trim() === "") {
      return res.status(400).json({ message: "NombreRol no puede estar vacío" });
    }

    const updated = await Rol.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Rol no encontrado" });

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/roles/:id
exports.remove = async (req, res) => {
  try {
    const deleted = await Rol.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Rol no encontrado" });

    res.json({ message: "Rol eliminado", rol: deleted });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
