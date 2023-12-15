
const  validarCampos  = require('../middleware/campo-validator');
const  validarJWT     = require('../middleware/validar-jwt');
const validarRoles    = require('../middleware/validar-roles');
const validarArchivo  = require('../middleware/validar-archivo');

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}