const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth-controller');
const { validarCampos } = require('../middleware/campo-validator');

const router = Router()
 
router.post('/login',[
    check('correo','El correo es Obligatorio').isEmail(),
    check('password','la contraseña es Obligatoria').not().isEmpty(),
    validarCampos
] , login);

router.post('/google',[
    check('id_token','El token es necesario').not().isEmpty(),
    validarCampos
] , googleSignIn);


module.exports = router;