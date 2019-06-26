const User = require('../database/models/Users');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    // console.log(req.session);
                    req.session.userId = user._id;
                    req.session.email = email;
                    return res.redirect('/');
                }
                else {
                    // const loginErrors = "Incorrect Password";
                    req.flash('loginErrors' , loginErrors);
                    req.flash('data' , req.body);
                    return res.redirect('/auth/login');
                }
            });
        }
        else {
            // console.log("wrong username");
            const loginErrors = "Incorrect Username";
            req.flash('loginErrors', loginErrors);
            req.flash('data' , req.body);
            return res.redirect('/auth/login');
        }
    });
};
