
//IMPORTACIONES
const { response } = require('express');
const bcryptjs =  require('bcryptjs');

const Usuario =  require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');




//FUNCION PARA EL LOGIN
const login = async( req, res = response ) =>{
    
    const { correo, password } = req.body;   //solicita correo y password

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne( {correo} );
        if( !usuario){
            return res.status(400).json({
                msg: 'Usuario /password  no son correctos - correo'
            });
        }
        //verificar si el usuario esta activo
        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario /password  no son correctos - estado: false'
            });
        }
        //verificar la password
        const validarPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validarPassword ){
            return res.status(400).json({
                msg: 'Usuario /password  no son correctos - password'
            });
        }
        //generar JWT
        const token =  await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
      
    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'hable con el admin'
        });
    }
}


//FUNCION PARA EL GOOGLE SIGN IN QUE DEVUELVE EL TOOKEN Y UN MSG DE OK Xd
const googleSignin = async(req, res=response) =>{

    const { id_token } = req.body;

    try {
        const {correo, nombre, img} = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password: 'XD',
                img,
                google: true
            };
            usuario = new Usuario( data );
            await usuario.save();
        }
 
        //si el usuario esta en la BD
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //generar JWT
        const token =  await generarJWT( usuario.id );
          
        res.json({
            usuario,
            token 
        });

    } catch (error) {

        res.status(400).json({
            msg: 'JSON no reconocido'
        });
    }
}




module.exports = {
    login,
    googleSignin
}