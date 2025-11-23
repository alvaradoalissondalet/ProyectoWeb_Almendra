// controllers/categoriaController.js
const Categoria = require('../models/Categoria_Subcategorias');

// GET /api/categorias
exports.list = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/categorias/:id
exports.detail = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(categoria);
    } catch {
        res.status(400).json({ message: "ID inválido" });
    }
};

// POST /api/categorias
exports.create = async (req, res) => {
    try {
        const { NombreCategoria, Subcategorias } = req.body;

        const nueva = new Categoria({
            NombreCategoria,
            Subcategorias: Subcategorias || []
        });

        const saved = await nueva.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /api/categorias/:id
exports.update = async (req, res) => {
    try {
        const updated = await Categoria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ message: "Categoría no encontrada" });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/categorias/:id
exports.remove = async (req, res) => {
    try {
        const deleted = await Categoria.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ message: "Categoría no encontrada" });

        res.json({ message: "Categoría eliminada", categoria: deleted });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


/* ------------------ SUBCATEGORÍAS ------------------- */

// POST /api/categorias/:id/subcategorias
exports.addSubcategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });

        categoria.Subcategorias.push({ NombreSubcategoria: req.body.NombreSubcategoria });

        const saved = await categoria.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/categorias/:id/subcategorias/:subId
exports.removeSubcategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });

        const sub = categoria.Subcategorias.id(req.params.subId);
        if (!sub) return res.status(404).json({ message: "Subcategoría no encontrada" });

        sub.deleteOne();

        const saved = await categoria.save();
        res.json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
