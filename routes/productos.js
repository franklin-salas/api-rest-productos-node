const {Router} = require('express');
const { check } = require('express-validator');
const { productosGet,
        productoGet, 
        productoPost, 
        productoPut,
        productoDelete } = require('../controllers/producto-controller');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validar');
const { validarJWT, validarCampos,tieneRol} = require('../middleware');



 const router = Router()
 
 router.get('/', productosGet );

 router.get('/:id',[
     check('id', 'No es Id de mongo').isMongoId(),
     check('id').custom(existeProductoPorId),
     validarCampos
 ], productoGet );

 router.post('/', [
     validarJWT,
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('categoria','No es un id Valido').isMongoId(),
     check('categoria').custom(existeCategoriaPorId),
     validarCampos

],productoPost);

 router.put('/:id',[
     validarJWT,
     check('id').custom(existeProductoPorId),
     check('categoria','No es un id Valido').optional().isMongoId(),
     check('categoria').optional().custom(existeCategoriaPorId),
     validarCampos
 ] ,productoPut);
 
//  router.patch('/', usuarioPatch);
  
 router.delete('/:id', [
     validarJWT,
    //  isAdminRole,
        tieneRol('USER_ROLE','ADMIN_ROLE'),
    check('id','No es ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
 ],productoDelete);



  module.exports = router;