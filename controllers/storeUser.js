const User = require('../database/models/Users');

module.exports = (req, res) => {
    const user = req.body;
    if (user.password == user.r_password && user.password) {
        User.create(req.body, (error, user) => {
            if(error){
                console.log(error);
                res.redirect('/auth/register');
            }
            else{
                res.redirect('/');
            }
        });
    }
    else{
        res.redirect('/auth/register');
    }

}