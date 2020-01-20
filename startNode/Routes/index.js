let express = require('express');
let routes = express.Router();

routes.get('/', (req, res) => 
{

    //Define o tipo de status HTTP que quero receber como OK
    res.statusCode = 200;

    //Tipo de "linguagem" que eu quero que o meu browser interprete
    res.setHeader('Content-Type', 'text/html');

    //Apenas uma informação na tela
    res.end('<h1>Ola Mundo!</h1>')
});

module.exports = routes;