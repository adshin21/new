const User = require('../database/models/Users');
const bcrypt = require('bcrypt');

module.exports = (req , res) => {
    const {email , password } = req.body;

    User.findOne({ email } ,(err , user) => {
        if(user){
            bcrypt.compare(password , user.password , (err , same) => {
                if(same){
                    console.log('Log in aaa rha hai');
                    req.session.userId = user._id;
                    return res.redirect({auth: req.session.userId}, '/');
                }
                else{
                    console.log('Passwd is not same');
                    return res.redirect({auth: req.session.userId} , '/auth/login');
                }
            });
        }
        else{
            console.log('Something Bad');
            return res.redirect({auth: req.session.userId} , '/auth/login');
        }
    });
};
