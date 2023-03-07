const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verifi");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - email'
            });
        }
        //verficar si el usuario esta activo en la DB
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - state'
            });
        }
        //verificar contrasñea
        const vaildPassword = bcryptjs.compareSync(password, usuario.password);
        if (!vaildPassword) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - password'
            });
        }

        //generar el Json web token
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
}

const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { email, name, img } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ email })

        if (!usuario) {
            //Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save()
        }

        //Si el usuario en DB
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {

        json.status(400).json({
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSingIn
}