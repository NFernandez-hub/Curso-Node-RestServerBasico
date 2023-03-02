const Role = require('../models/role');
const Usuario = require('../models/usuario')

const roleValidator = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`El rol ${role} no esta registrado en la DB.`)
    }
}

const emailValidator = async (email = '') => {
    const emailExist = await Usuario.findOne({ email })
    if (emailExist) {
        throw new Error(`El email ${email} ya esta registrado.`)
    }
}

const userExistById = async (id) => {
    const userExist = await Usuario.findById(id)
    if (!userExist) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    roleValidator,
    emailValidator,
    userExistById
}