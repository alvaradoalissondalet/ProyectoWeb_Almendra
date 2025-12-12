const mongoose = require('mongoose');

// Subdocumento para Subcategorias
const SubcategoriaSchema = new mongoose.Schema({
    NombreSubcategoria: {
        type: String,
        required: true
    }
}, {
    _id: true, 
    versionKey: false
});

// Categoria principal
const CategoriaSchema = new mongoose.Schema({
    NombreCategoria: {
        type: String,
        required: true
    },
    Subcategorias: {
        type: [SubcategoriaSchema], // array de subcategorias
        default: []
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
