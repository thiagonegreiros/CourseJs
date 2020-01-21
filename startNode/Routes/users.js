//Fazendo a requisição do banco
let NeDB = require('nedb');

//Criando o banco de dados
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) =>
{
    
    app.get('/users', (req, res) => 
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

    app.post('/users', (req, res) => 
    {
        // res.json(req.body);

        //Aqui faz o insert
        db.insert(req.body, (err, user) => 
        {
            if(err)
            {
                //Se caso der algum erro ele mostra qual foi esse error
                console.log(`Error:  ${err}`);
                res.status(400).json(
                {
                    error: err 
                });
            }
            else
            {
                res.status(200).json(user);
            }
        });
    });
};
