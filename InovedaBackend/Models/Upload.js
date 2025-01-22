const mongoose = require('mongoose');

const {userDB} = require('../config/db')

const UploadSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'userdb',
        required : true
    },
    courseName : {
        type : String,
        required : true
    },
    courseTitle : {
        type : String,
        required : true
    },
    pdf : {
        type : String,
        required : true
    },
    viewStatus:{
        type:String
    },
    comment : {
        type : String
    }
});


const UploadModel = userDB.model('upload',UploadSchema);

module.exports = UploadModel;