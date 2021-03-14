//Cargamos el modulo mangoose
const mongoose = require('mongoose');

//Creamos un objeto conexion
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DBCONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
}

//exportamos el modulo para que pueda ser utilizado por terceros
module.exports = {
    dbConnection
}