const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    NombreUsuario: {
        type: String,
        required: true
    },
    FechaNacimiento: {
        type: Date,
        required: true
    },
    Correo: {
        type: String,
        required: true,
        unique: true
    },
    id_Rangoedad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RangoEdad',
        required: true
    },
    id_Rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
