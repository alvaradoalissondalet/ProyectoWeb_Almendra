const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    Password: {  // Ojo nuevo
        type: String,
        required: true
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

UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) return next();
    this.Password = await bcrypt.hash(this.Password, 12);
    next();
});

// Comparar passwords
UsuarioSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);