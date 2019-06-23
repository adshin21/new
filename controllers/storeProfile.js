const Profile = require('../database/models/Profile');
const User = require('../database/models/Users');

module.exports = async (req , res) => {
    const data = req.body;

    if(!data.username){
        const profileerror = "Please Provide your username";
        req.flash('profileerror',profileerror);
        req.flash('data' , data);
        return res.redirect('/auth/profile');
    }

    if(!data.email){
        const profileerror = "Please Provide your username";
        req.flash('profileerror',profileerror);
        req.flash('data' , data);
        return res.redirect('/auth/profile');
    }
    const user = await Profile.find({username: req.body.username , email: req.body.username});
    if(user.length){
        Profile.findOneAndUpdate({username: req.body.username} , { $set: {
            dob: req.body.dob,
            contact: req.body.phone,
            website: req.body.website
        }} , () => res.redirect('/'));
    }
    else{
        // console.log("wrong data");
        const profileerror = "Either Username or E-mail is/are incorrect";
        req.flash('profileerror',profileerror);
        req.flash('data' , data);
        res.redirect('/auth/profile');
    }
}