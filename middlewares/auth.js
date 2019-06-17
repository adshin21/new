const User = require('../database/models/Users');

module.exports = async (req, res, next) => {
    const state = await User.findById(req.session.userId);
    if (!state) {
        return res.redirect('/auth/login');
    }
    else {
        next();
    }
};