
//IMPORTACIONES
const { response } = require('express');



//FUNCION PARA VERIFICAR QUE EL ROLE SEA DE ADMIN
const esAdminRole = ( req, res=response, next ) => {

    //verifico que el usuario exista
    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar  el role sin validar el token primero'
        });
    }

    //obtengo el rol y nombre desde la request 
    const { rol, nombre } = req.usuario;

    //si el rol es admin pasa, sino msg de error xD
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador, (${rol}) No puede hacer eso`
        });
    }
    next();
}



//FUNCION PARA VER SI TIENE EL ROL QUE INGRESE COMOO PARAMETRO
const tieneRole = ( ...roles ) => {                     //guardo los roles en un arreglo
        return (req, res=response, next ) =>{           //retorno la funcion que llama al req y res

            //validando que el usuario existe
            if ( !req.usuario ){
                return res.status(500).json({
                    msg: 'Se quiere verificar el role sin validar el token primero'
                });
            }

            //si el rol de la request esta entre los almacenados en el arreglo pasa, sino msg error XD
            if ( !roles.includes( req.usuario.rol) ){
                return res.status(401).json({
                    msg: `el servicio requiere uno de estos roles: ${roles}`
                });
            }
        next();
    }
}


//EXPORTACIONES
module.exports = {
    esAdminRole,
    tieneRole
}