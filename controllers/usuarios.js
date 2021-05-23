//IMPORTACIONES
const { response } = require('express');


//LLAMANDO A LOS METODOS DEL CRUD 
const usuariosGet =  (req, res = response) => {      //llamando al response para obtener metodos del express

    const { q ,  nombre = 'No Name', apikey} = req.query;             //desectruturacion de argumentos
    res.json({                                                       //los guardo en un json 
        "msg": 'Get api - Controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response ) => {

    const {nombre , edad } = req.body;
    res.json({
        msg: 'Post api - Controlador',
        nombre,
        edad
    });
}

const usuariosPut =  (req, res = response ) => {

    const id = req.params.id;
    res.json({
        "msg": 'Put api - Controlador',
        id
    });
}


const usuariosDelete =   (req, res = response ) => {
    res.json({
        "msg": 'Delete api - Controlador' 
    });
}





//EXPORTACIONESs
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}