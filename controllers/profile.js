const User = require('../database/models/Users');

module.exports = async (req, res) => {

    const data = await User.findOne({email: req.session.email});
    // console.log(data);
    res.render('profile', { 
        auth: req.session.userId,
        data : data,
        userProfile : true
    });
};