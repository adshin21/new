module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render('create', { auth: req.session.userId });
    } 
    else {
        return res.redirect('/auth/login');
    };
}
