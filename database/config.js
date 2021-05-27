
//IMPORTACIONES
const moongose = require('mongoose');


//FUNCION PARA CONECTARSE A LA BD 
const dbConnection = async () => {
    try {
        await moongose.connect( process.env.MONGODB_CNN , {   //LLAMO A LA VARIABLE DE ENTORNO DE MONGO DB
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de Datos online!');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base datos');
    }
}




//EXPORTACIONES
module.exports = {
    dbConnection
}