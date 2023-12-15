const dbValidar = require('./db-validar'); 
const generarJWT = require('./generar-jwt'); 
const googleVerify = require('./google-verify'); 
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidar,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,

}