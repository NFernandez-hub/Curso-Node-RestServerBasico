const { Router } = require('express');
const { getUsuarios,
    deleteUsuarios,
    postUsuarios,
    putUsuarios,
    patchUsuarios } = require('../controllers/usuarios');


const router = Router();

router.get('/', getUsuarios)

router.post('/', postUsuarios)

router.put('/', putUsuarios)

router.patch('/', patchUsuarios)

router.delete('/', deleteUsuarios)


module.exports = router;