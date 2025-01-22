const mongoose  = require('mongoose');

const {userDB}  = require('../config/db');


const TeamMemberSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    prn : {
        type : String,
        required : true,
        unique : true
    }
});

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    prn : {
        type : String,
        required : true,
        unique : true
    },
    teamMembers : [TeamMemberSchema]
});

const UserModel = userDB.model('userdb',UserSchema);

module.exports = UserModel;