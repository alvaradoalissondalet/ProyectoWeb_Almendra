const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    NombreRol: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Rol', RolSchema);
