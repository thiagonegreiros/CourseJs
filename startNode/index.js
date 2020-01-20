const express = require('express');

//Chamo as rotas do arquivo Routes/index.js
let routesIndex = require('./Routes/index');
//Chamo as rotas do arquivo Routes/users.js
let routesUsers = require('./Routes/users.js');

let app = express();

app.use(routesIndex);
app.use('/users', routesUsers);


//Função de Callback
app.listen(3333, '10.58.149.207', () =>  
{
    console.log('Working');
});