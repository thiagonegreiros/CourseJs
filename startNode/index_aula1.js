const http = require('http');

let server = http.createServer((req, res) => 
{
    console.log('URL:', req.url);
    console.log('METHOD:',req.method);

    switch(req.url)
    {
        case '/':

            //Define o tipo de status HTTP que quero receber como OK
            res.statusCode = 200;

            //Tipo de "linguagem" que eu quero que o meu browser interprete
            res.setHeader('Content-Type', 'text/html');

            //Apenas uma informação na tela
            res.end('<h1>Ola Mundo!</h1>')

        break;

        case '/users':
            //Define o tipo de status HTTP que quero receber como OK
            res.statusCode = 200;

            //Tipo de "linguagem" que eu quero que o meu browser interprete
            res.setHeader('Content-Type', 'application/json');

            //Apenas uma informação na tela
            res.end(JSON.stringify({
                users:[{
                    name: "Thiago Negreiros",
                    email: "negreiros.t@gmail.com",
                    id: 1
                }]
            }));
        break;
    }

});

//Função de Callback
server.listen(3333, '10.58.149.207', () =>  
{
    console.log('Hello World!');
});