//IMPORTACIONES
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');





//FUNCION DEL METODO GET
const usuariosGet =  async (req, res = response) => {      //llamando al response para obtener metodos del express

    //ARGUMENTOS OPCIONALES
    const { limite = 5 , desde = 0 } = req.query;   //difino un limite e inicio
    const query = { estado: true};                  //una condicion del query

    //COLECCION DE PROMESAS QUE EJECUTA AMBAS A LA VEZ
    const [ total, usuarios ] =  await Promise.all([                    //hago una desetructuracion de arreglos
        Usuario.countDocuments(query),                                  //le podemos poner condiciones :)
        Usuario.find(query)
            .skip( Number( desde ))                                     //DESDE DONDE PARTIRA
            .limit( Number( limite ))                                   //EL LIMITE
    ]);

    res.json({
        total,
        usuarios
    });
}




//FUNCION DEL METODO POST
const usuariosPost = async (req, res = response ) => {

    const { nombre, correo, password, rol} = req.body;              //DESECTRURO LO QUE LE PEDIRE   
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Encryptar la constrañse
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    //Guardar en bd 
    await usuario.save();
    res.json({
        usuario
    });
}






//FUNCION DEL METODO PUT 
const usuariosPut = async(req, res = response ) => {

    const { id }  = req.params;
    const { _id, password, google, correo, ...resto } = req.body;  //QUITO ATRIBUTOS, LOS OTROS SAVE EN RESTO
    if ( password ) {
        //Encryptar la constrañse
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
}







const usuariosDelete =   async (req, res = response ) => {

    const { id } = req.params;


    //BORRANDO FISICAMENTE, NO RECOMENDADO XD
    //const usuario =  await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id , {estado: false} );
    //const usuarioAutenticado = req.usuario;


    res.json({
        msg: `El usuario ${usuario.nombre} ha sido borrado o suspendido`,
        usuario
        //usuarioAutenticado
    });
}







//EXPORTACIONES
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}