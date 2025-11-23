const mongoose = require('mongoose');

const RangoEdadSchema = new mongoose.Schema({
    NombreRango: {
        type: String,
        required: true
    },
    Rango: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Rangoedad', RangoEdadSchema);