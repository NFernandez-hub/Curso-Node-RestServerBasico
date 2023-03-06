const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: [true, 'El role es obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('Usuario', UsuarioSchema)