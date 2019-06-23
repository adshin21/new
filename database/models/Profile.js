const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique: true
    },
    name: String,
    email: String,
    dob: String,
    website: String,
    contact: String
});

module.exports = mongoose.model('Profile' , ProfileSchema);