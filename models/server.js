//IMPORTACIONES
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');




class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';    //el nombre a donde llamo a la api
        //CONECTAR A LA DB
        this.conectarDB();
        
        //MIDDLEWARES     siempre se ejecutaran cuando levantemos el servidor
        this.middlewares();

        //RUTAS DE LA APLICACION
        this.routes();
    }




    //METODO ASYNC PARA LLAMAR A LA FUNCION EN CONFIG DE DB
    async conectarDB(){
        await dbConnection()
    }



    middlewares(){
        //CORS
        this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );

        //DIRECTORIO PUBLICO
        this.app.use( express.static('public'));               
    }

    

    routes(){       
        this.app.use( this.usuariosPath , require('../routes/usuarios') );
    }


    listen(){    
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: '+ this.port);
        });
    }


}



module.exports = Server;