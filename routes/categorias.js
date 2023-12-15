const {Router} = require('express');
const { check } = require('express-validator');
const { categoriasGet,
        categoriaGet, 
        categoriaPost, 
        categoriaPut,
        categoriaDelete } = require('../controllers/categoria-controller');
const { existeCategoriaPorId } = require('../helpers/db-validar');
const { validarJWT, validarCampos,tieneRol} = require('../middleware');



 const router = Router();
 
 router.get('/', categoriasGet );

 router.get('/:id',[
     check('id', 'No es Id de mongo').isMongoId(),
     check('id').custom(existeCategoriaPorId),
     validarCampos
 ], categoriaGet );

 router.post('/', [
     validarJWT,
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     validarCampos

],categoriaPost);

 router.put('/:id',[
     validarJWT,
     check('id','No es ID valido').isMongoId(),
     check('id').custom(existeCategoriaPorId),
     check('nombre','El nombre es obligatorio').not().isEmpty(),

     validarCampos
 ] ,categoriaPut);
 
//  router.patch('/', usuarioPatch);
  
 router.delete('/:id', [
     validarJWT,
    //  isAdminRole,
        tieneRol('USER_ROLE','ADMIN_ROLE'),
    check('id','No es ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
 ],categoriaDelete);



  module.exports = router;