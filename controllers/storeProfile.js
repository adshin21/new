const User = require('../database/models/Users');

module.exports = (req , res) => {
    const email = req.session.email;
    const data = req.body;
    // console.log(data);
    User.findOneAndUpdate({email: email} , {
        $set: {
            name: data.name,
            org: data.organization,
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
}