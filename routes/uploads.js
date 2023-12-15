const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivo} = require('../middleware');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploads-controller');
const { coleccionesPermitidas } = require('../helpers');


 const router = Router();
 
 router.post('/', validarArchivo, cargarArchivo );
 router.put('/:coleccion/:id', [
   validarArchivo,
    check('id',' El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c ,['usuarios','productos'])),
   
    validarCampos
 ],
 actualizarImagenCloudinary );


 router.get('/:coleccion/:id', [
   check('id',' El id debe ser de mongo').isMongoId(),
   check('coleccion').custom(c=>coleccionesPermitidas(c ,['usuarios','productos'])),
  
   validarCampos
],
mostrarImagen );
 
 

  module.exports = router;