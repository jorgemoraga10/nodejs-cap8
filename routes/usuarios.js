
//IMPORTACIONES
const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const { rolValido, existEmail, existeUserbyId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');



const router = Router();




 
////LLAMANDO AL METODO GET
router.get('/', usuariosGet);



//LLAMANDO AL METODO PUT Y LLAMANDO A VALIDACIONES DE EXPRESS VALIDATOR
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),   //valido si es un mongo  id
    check('id').custom(existeUserbyId),             //verifico que el id exista
    check('rol').custom( rolValido),
    validarCampos 
],usuariosPut);



//LLAMANDO AL METODO POST Y LLAMANDO A VALIDACIONES DE EXPRESS VALIDATOR
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min :6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existEmail),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( rolValido),
    validarCampos
],usuariosPost );



router.delete('/:id',[
    validarJWT,
    //esAdminRole,              //fuerza a que sea admin
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id valido').isMongoId(),   //valido si es un mongo  id
    check('id').custom(existeUserbyId),             //verifico que el id exista
    validarCampos
],usuariosDelete);




//EXPORTACIONES
module.exports = router;