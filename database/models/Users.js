const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Please provide your username'],
        unique: true , 
    },
    email: {
        type: String,
        required: [true , 'Please provide your E-mail'],
        unique: true 
    },
    password: {
        type: String,
        required: [true , 'Please enter your password']
    },

    name: String,
    img: String,
    org: String,
    mobile: Number,
    dob : String,
    address: String,
    ZipCode: Number,
    resume: String,

});

UserSchema.pre('save' ,function(next){
    const user = this;
    bcrypt.hash(user.password , 10 , (err , encrypted) => {
        user.password = encrypted;
        next();
    });
})

module.exports = mongoose.model('User' , UserSchema);