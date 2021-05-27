
//IMPORTACIONES
const Role = require('../models/role');
const Usuario = require('../models/usuario');




//vALIDACION DEL ROL EN BD 
const rolValido = async ( rol = '' ) => {    
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}


//VALIDACION DEL email
const existEmail = async ( correo = '' ) => {
    const emailFound = await Usuario.findOne({correo})
    if( emailFound ){
        throw new Error(`El id: ${correo}, ya existe`);
    }
}



//VALIDACION DEL USUARIO POR ID 
const existeUserbyId = async ( id = '' ) => {
    const idFound = await Usuario.findById( id );  
    if( !idFound ) {
        throw new Error(`El id: ${id}, no existe!!`);
    }
}










//EXPORTACIONES     
module.exports = {
    rolValido,
    existEmail,
    existeUserbyId
}