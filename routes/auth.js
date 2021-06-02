
//IMPORTACIONES
const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');




const router = Router();


router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );



//GENERANDO EL ROUTER PARA EL LOGIN DE GOOGLE 
router.post('/google',[
    check('id_token','El id token es necesario').not().isEmpty(),  //VALIDO QUE TOKEN NO SEA NULL
    validarCampos
],googleSignin );






module.exports = router;