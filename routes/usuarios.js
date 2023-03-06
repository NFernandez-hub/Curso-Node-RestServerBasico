const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { roleValidator, emailValidator, userExistById } = require('../helpers/db-validators');

const { getUsuarios,
    deleteUsuarios,
    postUsuarios,
    putUsuarios,
    patchUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios)

router.put('/:id', [
    check('id', 'No es un ID valido ').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(roleValidator),
    validarCampos
], putUsuarios)

router.post('/', [
    check('name', 'El nombre no es valido').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailValidator),
    check('role').custom(roleValidator),
    validarCampos
], postUsuarios)

router.patch('/', patchUsuarios)

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido ').isMongoId(),
    check('id').custom(userExistById),
    validarCampos
], deleteUsuarios)


module.exports = router;