let express = require('express');
let routes = express.Router();

routes.get('/', (req, res) => 
{
    //Define o tipo de status HTTP que quero receber como OK
    res.statusCode = 200;

    //Tipo de "linguagem" que eu quero que o meu browser interprete
    res.setHeader('Content-Type', 'application/json');

    //Apenas uma informação na tela
    res.json({
        users:[{
            name: "Thiago Negreiros",
            email: "negreiros.t@gmail.com",
            id: 1
        }]
    });
});

routes.get('/admin', (req, res) => 
{
    //Define o tipo de status HTTP que quero receber como OK
    res.statusCode = 200;

    //Tipo de "linguagem" que eu quero que o meu browser interprete
    res.setHeader('Content-Type', 'application/json');

    //Apenas uma informação na tela
    res.json({
        users:[]
    });
});


module.exports = routes;
