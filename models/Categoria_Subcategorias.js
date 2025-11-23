const mongoose = require('mongoose');

// Subdocumento para Subcategorías
const SubcategoriaSchema = new mongoose.Schema({
    NombreSubcategoria: {
        type: String,
        required: true
    }
}, {
    _id: true,      // deja que cada subcategoria tenga su propio ID
    versionKey: false
});

// Categoría principal
const CategoriaSchema = new mongoose.Schema({
    NombreCategoria: {
        type: String,
        required: true
    },
    Subcategorias: {
        type: [SubcategoriaSchema], // array de subcategorías
        default: []
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
