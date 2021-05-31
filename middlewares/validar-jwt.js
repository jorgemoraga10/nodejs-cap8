//IMPORTACIONES 
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



const validarJWT = async( req = request, res = response, next ) =>{

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //leer usuario que corresponde uid
        const usuario =  await Usuario.findById( uid );

        //verificar que el usuario exista
        if ( !usuario ){
            return res.status( 401 ).json({
                msg: 'Token no Valido - usuario no existe en BD'
            })
        }


        //verificar si el estado del usuario es true 
        if( !usuario.estado ){
            return res.status( 401 ).json({
                msg: 'Token no Valido - usuario con estado: false'
            })
        }



        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}


//EXPORTACIONES 
module.exports= {
    validarJWT
}