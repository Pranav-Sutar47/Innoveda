const mongoose = require('mongoose');

const {userDB} = require('../config/db');

const CourseSchema = mongoose.Schema({
    adminId:{
        type: mongoose.Types.ObjectId,
        required : true
    },
    year : {
        type: String,
        required: true
    },
    subjectName : {
        type: String,
        required : true
    },
    subjectTitle : {
        type: [String], //array of string
        required:true
    }
});


const CourseModel = userDB.model('course',CourseSchema);

module.exports = CourseModel;

