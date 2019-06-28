const multer = require('multer');
const path = require('path');
const User = require('../database/models/Users');


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'public/propic'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
}).single('profilepic');


module.exports =  (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/auth/profile');
        }
        else{
            const data = req.body;
            const file = req.file;
            const email = req.session.email;
            
            // console.log(file);
            User.findOneAndUpdate({email: email} , {
                $set: {
                    name: data.name,
                    org: data.organization,
                    mobile: data.phone,
                    dob: data.dob,
                    address: data.address,
                    ZipCode: data.ZipCode,
                    resume: data.resume,
                    img: `/propic/${file.filename}`
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
    });
};







/*
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
*/