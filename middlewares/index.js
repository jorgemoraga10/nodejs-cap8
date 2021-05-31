

//llamo y asigno un nombre a las funciones que estan en esa ubicacion
const validaCampos  = require('../middlewares/validar-campos');
const  validaJWT  = require('../middlewares/validar-jwt');
const  validaRoles  = require('../middlewares/validar-roles'); 


//EXPORTACIONES , CON EL ... LLAMO A TODAS LAS FUNCIONES QUE CONTIENE ESA CONST
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}