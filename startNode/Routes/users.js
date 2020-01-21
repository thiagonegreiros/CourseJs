//Fazendo a requisição do banco
let NeDB = require('nedb');

//Criando o banco de dados
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

const { check, validationResult } = require('express-validator');

module.exports = (app) =>
{
    let route = app.route('/users');

    
    /**
     * List User
     */
    route.get((req, res) => 
    {

        /*
         * Find: sem nenhum parametro eu consigo buscar todos os itens da lista
         * Sort: ordeno por qual elmento procurar e em qual ordem
         */
        db.find({}).sort({name:1}).exec((err, users )=> 
        {
            if (err) 
            {
                app.utils.error.send(err, req, res);
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

    
    /**
     * Insert User
     */
    route.post((req, res) => 
    {
        [
            check('email', 'Email is not valid').notEmpty(),
            check('email', 'Email is not valid').isEmail(),
        ],function(req, res, next) {

            // Check Errors
            const errors = validationResult(req);
            if (errors) {
              console.log(errors);
              res.render('register', { errors: errors.array() });
            }
            else {
              console.log('No Errors');
              res.render('dashboard', { message: 'Successful Registration.' });
            }
        }
        //Aqui faz o insert
        db.insert(req.body, (err, user) => 
        {
            if(err)
            {
                //Se caso der algum erro ele mostra qual foi esse error
                app.utils.error.send(err, req, res);
            }
            else
            {
                res.status(200).json(user);
            }
        });
    });


    /**
     * Search User
     */
    let routeId = app.route('/users/:id');

    routeId.get((req, res) => 
    {
        //Procura por um elemento 
        db.findOne({_id:req.params.id}).exec((err, user) => 
        {
            if(err)
            {
                //Se caso der algum erro ele mostra qual foi esse error
                app.utils.error.send(err, req, res);
            }
            else
            {
                res.status(200).json(user);
            }
        });
    });

    
    /**
     * Update User
     */
    routeId.put((req, res) => 
    {
        //Update por um elemento 
        db.update({_id:req.params.id}, req.body, err =>  
        {
            if(err)
            {
                //Se caso der algum erro ele mostra qual foi esse error
                app.utils.error.send(err, req, res);
            }
            else
            {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });

    routeId.delete((req, res) => 
    {
        db.remove({_id:req.params.id}, {}, err=>
        {
            if(err)
            {
                //Se caso der algum erro ele mostra qual foi esse error
                app.utils.error.send(err, req, res);
            }
            else
            {
                res.status(200).json(req.params);
            }
        });
    });

};
