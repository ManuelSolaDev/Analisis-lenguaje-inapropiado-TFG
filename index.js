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
    //Para que funcione el req.body
const bodyParser = require('body-parser');
// Crear una aplicación de express
const app = express();

//Llamamos a la funcion para crear la conexion con la base de datos
dbConnection();

app.use(bodyParser.json());
//Usamos las cors
app.use(cors());
app.use(express.json());

// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//Las rutas por ahora aqui pero despues lo sacare a rutas si necesitamos más
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

app.post('/', (req, res) => {

    //Creamos un proceso hijo para llamar al listener que está en python
    var spawn = require("child_process").spawn;
    //Lo llamamos pasandole los terminos que queremos usar para recolectar la data y analizarla
    var process = spawn('python', ["./listenerTwitter/listener.py", req.body.terminos]);

    // Nos quedamos escuchando a que nos devulva el valor cuando se termine de ejecutar el listener
    process.stdout.on('data', function(data) {
        //console.log("Sum " + JSON.parse(data.toString()).sum);
        console.log("Respuestas del listener por print(stdout)" + data);
    });
    //Esto se ejecuta antes porque es asincrona la llamada del proceso hijo que esta ejecutando el python
    console.log("DESPUES DEL log");

    res.json({
        ok: true,
        msg: 'Post recibido'
    });
});