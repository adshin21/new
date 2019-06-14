module.exports =  (req, res) => {
    if(req.session.userId)
        return res.render('create',{auth: req.session.userId});
    else{
        console.log('coming here');
        return res.redirect('/auth/login');
    }
};