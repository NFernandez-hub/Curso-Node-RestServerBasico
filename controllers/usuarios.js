const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario')

const getUsuarios = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    })
}

const postUsuarios = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save();

    res.json(usuario)
}

const putUsuarios = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //Validar contra base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.json(usuario)
}

const patchUsuarios = (req = request, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

const deleteUsuarios = async (req = request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { state: false })

    res.json({
        usuario
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}