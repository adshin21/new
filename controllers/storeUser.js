const User = require('../database/models/Users');

module.exports = (req, res) => {
    console.log('Coming in storeUser');
    const user = req.body;
    console.log(user);
    if (user.password == user.r_password && user.password) {
        User.create(req.body, (err, user) => {
            res.redirect('/');
        });
    }
    else{
        res.redirect('/auth/register');
    }

}