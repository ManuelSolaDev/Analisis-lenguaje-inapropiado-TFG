/*
Importación de módulos
*/
const express = require('express');


//Usamos cors por si acaso aunque ahora no nos hace falta
const cors = require('cors');

//Usamos dotenv para usar variables de entorno desde .env
//este metodo carga dentro de process.env las variables
require('dotenv').config();

//Traemos la funcion que nos permite la conexion con la base de datos
const { dbConnection } = require('./database/configdb')

// Crear una aplicación de express
const app = express();

//Llamamos a la funcion para crear la conexion con la base de datos
dbConnection();

//Usamos las cors
app.use(cors());

// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});