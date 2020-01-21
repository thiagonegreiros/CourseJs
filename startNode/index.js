const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


let app = express();

//Faz um decode do que vier da url
app.use(bodyParser.urlencoded({extended: false}));

//Converte para JSON os dados
app.use(bodyParser.json());

// app.use(expressValidator());

//Esse comando ta adicionando todas as rotas dentro do modulo APP
consign().include('routes').include('utils').into(app);

//Função de Callback
app.listen(3333, '10.58.149.207', () =>  
{
    console.log('Working');
});