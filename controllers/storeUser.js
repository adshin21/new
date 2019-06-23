const User = require('../database/models/Users');
const Profile = require('../database/models/Profile');

module.exports = async (req, res) => {

    const user = await User.findOne({"username" : req.body.username});

    if(user){
        const registrationErrors = "Please provide a unique username";
        req.flash('registrationErrors', registrationErrors);
        req.flash('data' , req.body);
        return res.redirect('/auth/register');
    }

    const result = await User.findOne({"email" : req.body.email});
    if(result){
        const registrationErrors = "Please provid a unique E-mail address";
        req.flash('registrationErrors', registrationErrors);
        req.flash('data' , req.body);
        return res.redirect('/auth/register');
    }

    User.create(req.body, (error, user) => {
        if (error) {
            const registrationErrors =  Object.keys(error.errors).map(key => error.errors[key].message);
            // console.log(registrationErrors);
            req.flash('registrationErrors',registrationErrors);
            req.flash('data' , req.body);
            return res.redirect('/auth/register');
        }
        else {
            // console.log("yha to nhi aa rha na?");

            Profile.create({
                username: req.body.username,
                email: req.body.email
            } , () => res.redirect('/')
            );

        }
    });
};
