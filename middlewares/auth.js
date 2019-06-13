const User = require('../database/models/Users');

module.exports = async (req , res , next) => {
    User.findById(req.session.userId , (error , user) => {
        if(error || !user){
            return res.redirect('/');
        }
    });
    
    next();
};