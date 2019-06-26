const User = require('../database/models/Users');

module.exports = (req , res) => {
    const email = req.session.email;
    const data = req.body;
    console.log(data);
    User.findOneAndUpdate({email: email} , {
        $set: {
            mobile: data.phone,
            dob: data.dob,
            address: data.address,
            ZipCode: data.ZipCode,
            resume: data.resume
        }
    } , (err) => {
            if(err){
                const profileerror = "Check the details correctly";
                req.flash('profileerror',profileerror);
                req.flash('data' , data);
                res.redirect('/auth/profile');
            }
            else{
                // const success = "Profile details Updates Succesfully";
                // req.flash('success',success);
                res.redirect('/');
            }
    });


    // const user = await Profile.find({username: req.body.username , email: req.body.username});
    // if(user.length){
    //     Profile.findOneAndUpdate({username: req.body.username} , { $set: {
    //         dob: req.body.dob,
    //         contact: req.body.phone,
    //         website: req.body.website
    //     }} , () => res.redirect('/'));
    // }
    // else{
    //     // console.log("wrong data");
    //     const profileerror = "Either Username or E-mail is/are incorrect";
    //     req.flash('profileerror',profileerror);
    //     req.flash('data' , data);
    //     res.redirect('/auth/profile');
    // }
}