module.exports = 
{
    user:(app, req, res) => 
    {
        //Validação dos campos
        req.assert('name', 'O nome e obrigatorio').notEmpty();
        req.assert('email', 'O email esta invalido').notEmpty().isEmail();

        let errors = req.validationErrors();

        if(errors)
        {
            app.utils.error.send(errors, req, res);
            return false;
        }
        else
        {
            true;
        }
    }
}