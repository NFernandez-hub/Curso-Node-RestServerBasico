const { response } = require('express');


const getUsuarios = (req, res = response) => {

    const {query, nombre, apikey} = req.query;

    res.json({
        msg: 'get API - Controlador',
        query,
        nombre,
        apikey
    })
}

const postUsuarios = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}

const putUsuarios = (req, res) => {

    res.json({
        msg: 'put API - Controlador',
    })
}

const patchUsuarios = (req, res) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

const deleteUsuarios = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}



module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}