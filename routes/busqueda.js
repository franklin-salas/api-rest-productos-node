const {Router} = require('express');
const {busqueda} = require('../controllers/busqueda-controller');
const router = Router();

router.get('/:colecciones/:argumento', busqueda );

module.exports = router;