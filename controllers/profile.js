module.exports = (req, res) => {
    console.log(req.flash('profileerrors'));
    res.render('profile', { 
        auth: req.session.userId, 
        errors: req.flash('profileerror'), 
        data: req.flash('data')[0] 
    });
};