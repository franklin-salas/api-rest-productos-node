const {Router} = require('express');
const { check } = require('express-validator');
const { 
        isRoleValido,
        existEmail, 
        existUsuarioID } = require('../helpers/db-validar');
// const { validarCampos } = require('../middleware/campo-validator');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRole, tieneRol } = require('../middleware/validar-roles');
const {validarCampos, validarJWT ,isAdminRole,tieneRol} = require('../middleware');

const { 
        usuarioGet,
        usuarioPost, 
        usuarioPatch, 
        usuarioDelete, 
        usuarioPut } = require('../controllers/usuario-controller');

 const router = Router()
 
 router.get('/',  usuarioGet);

 router.post('/', [
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('password','El password debe ser de 6 caracteres o mas').isLength({min:6}),
     check('correo','El correo no es valido').isEmail(),
    //  check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
     check('correo').custom(existEmail),
    //  check('rol').custom((rol) =>isRoleValido(rol)),
     check('rol').custom(isRoleValido),
     validarCampos
     

],usuarioPost);

 router.put('/:id',[
     check('id','No es ID valido').isMongoId(),
     check('id').custom(existUsuarioID),
     check('rol').optional().custom(isRoleValido),
     validarCampos
 ] ,usuarioPut);
 
 router.patch('/', usuarioPatch);
  
 router.delete('/:id', [
     validarJWT,
    //  isAdminRole,
        tieneRol('USER_ROLE','ADMIN_ROLE'),
    check('id','No es ID valido').isMongoId(),
    check('id').custom(existUsuarioID),
    validarCampos
 ],usuarioDelete);


  module.exports = router;