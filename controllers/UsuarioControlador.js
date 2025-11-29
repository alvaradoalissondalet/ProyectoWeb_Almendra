const Usuario = require('../models/Usuario');
const RangoEdad = require('../models/RangoEdad');
const Rol = require('../models/Rol');

// GET /api/usuarios
exports.list = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate('id_Rangoedad')
      .populate('id_Rol');

    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/usuarios/:id
exports.detail = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .populate('id_Rangoedad')
      .populate('id_Rol');

    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(usuario);
  } catch {
    res.status(400).json({ message: "ID inválido" });
  }
};

// POST /api/usuarios
exports.create = async (req, res) => {
  try {
    const { NombreUsuario, FechaNacimiento, Correo, id_Rangoedad, id_Rol } = req.body;

    // Validaciones
    if (!NombreUsuario || NombreUsuario.trim() === "") {
      return res.status(400).json({ message: "NombreUsuario es obligatorio" });
    }

    if (!FechaNacimiento) {
      return res.status(400).json({ message: "FechaNacimiento es obligatorio" });
    }

    if (!Correo || Correo.trim() === "") {
      return res.status(400).json({ message: "Correo es obligatorio" });
    }

    if (!id_Rangoedad) {
      return res.status(400).json({ message: "id_Rangoedad es obligatorio" });
    }

    if (!id_Rol) {
      return res.status(400).json({ message: "id_Rol es obligatorio" });
    }

    // Validar foreign keys
    const rangoExiste = await RangoEdad.findById(id_Rangoedad);
    if (!rangoExiste)
      return res.status(404).json({ message: "El rango de edad no existe" });

    const rolExiste = await Rol.findById(id_Rol);
    if (!rolExiste)
      return res.status(404).json({ message: "El rol no existe" });

    const nuevo = new Usuario({
      NombreUsuario,
      FechaNacimiento,
      Correo,
      id_Rangoedad,
      id_Rol
    });

    const saved = await nuevo.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/usuarios/:id
exports.update = async (req, res) => {
  try {
    const { NombreUsuario, FechaNacimiento, Correo, id_Rangoedad, id_Rol } = req.body;

    if (NombreUsuario !== undefined && NombreUsuario.trim() === "") {
      return res.status(400).json({ message: "NombreUsuario no puede estar vacío" });
    }

    if (Correo !== undefined && Correo.trim() === "") {
      return res.status(400).json({ message: "Correo no puede estar vacío" });
    }

    // Validar foreign keys
    if (id_Rangoedad) {
      const rangoExiste = await RangoEdad.findById(id_Rangoedad);
      if (!rangoExiste)
        return res.status(404).json({ message: "El rango de edad no existe" });
    }

    if (id_Rol) {
      const rolExiste = await Rol.findById(id_Rol);
      if (!rolExiste)
        return res.status(404).json({ message: "El rol no existe" });
    }

    const updated = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/usuarios/:id
exports.remove = async (req, res) => {
  try {
    const deleted = await Usuario.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado", usuario: deleted });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
