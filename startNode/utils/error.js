module.exports = 
{
    //Generic Error
    send: (err, req, res, code = 400) =>
    {   
        console.log(`Error:  ${err}`);
        res.status(code).json(
        {
            error: err 
        });
    }
};