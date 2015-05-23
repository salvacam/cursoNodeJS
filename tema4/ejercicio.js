/* 
    necesario instalar los modulos express y replacestream

        npm install express
        npm install replacestream
*/

var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");
var replaceStream = require('replacestream');
var bodyParser = require('body-parser');
var QS = require('querystring'),
    e, d;

app.use(bodyParser.urlencoded({
    extend: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/respuesta', function (req, res) {
    var respuesta = "";
    var salida = "";
    if (req.body.pregunta == 1) { 
        respuesta = req.body.america;
        respuesta = respuesta.toLowerCase();
        if (respuesta == "cristobal colon" || respuesta == "cristobal colón") {
            salida = "Respuesta Correcta!!";
        } else {
            salida = "Respuesta Incorrecta. Respuesta correcta: Critobal Colón";
        }
    } else {
        if (req.body.pregunta == 2) { 
            respuesta = req.body.portugal;
            respuesta = respuesta.toLowerCase();
            if (respuesta == "lisboa") {
                salida = "Respuesta Correcta!!";
            } else {
                salida = "Respuesta Incorrecta. Respuesta correcta: Lisboa";
            }
        } else {
            salida = "no se ha enviado nada";
        }
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.createReadStream('public/html/respuesta.html')
        .pipe(replaceStream('{{valor}}', salida))
        .pipe(res);
});

app.get('/preguntas', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.createReadStream('public/index.html').pipe(res);
});


app.listen(8000);