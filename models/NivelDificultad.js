const mongoose = require('mongoose');

const NivelDificultadSchema = new mongoose.Schema({
    TipoNivel: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('NivelDificultad', NivelDificultadSchema);
