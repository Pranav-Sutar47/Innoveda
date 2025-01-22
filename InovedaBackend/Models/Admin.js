const mongoose  = require('mongoose');

const {userDB} = require('../config/db');

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    uniqueId : {
        type : String,
        unique : true,
        required : true
    },
    password:{
        type : String,
        required : true
    }
});

const AdminModel = userDB.model('admindb',AdminSchema);

module.exports = AdminModel;