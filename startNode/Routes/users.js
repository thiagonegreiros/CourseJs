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

        /*
         * Find: sem nenhum parametro eu consigo buscar todos os itens da lista
         * Sort: ordeno por qual elmento procurar e em qual ordem
         */
        db.find({}).sort({name:1}).exec((err, users )=> 
        {
            if (err) 
            {
                console.log(`Error:  ${err}`);
                res.status(400).json(
                {
                    error: err 
                });
            }
            else
            {
                //Define o tipo de status HTTP que quero receber como OK
                res.statusCode = 200;

                //Tipo de "linguagem" que eu quero que o meu browser interprete
                res.setHeader('Content-Type', 'application/json');

                //Apenas uma informação na tela
                res.json({
                    users
                });
            }
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
