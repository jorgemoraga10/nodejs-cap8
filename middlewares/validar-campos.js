
//IMPORTACIONES
const { validationResult } = require('express-validator');



//SI NO HAY ERRORES EN LAS VALIDACIONES CONTINUA SINO LANZA EL ERROR
const validarCampos  = (req , res , next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    next();
}

    


//EXPORTACIONES
module.exports = {
    validarCampos
}