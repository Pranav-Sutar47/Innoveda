const mongoose = require('mongoose');

const {userDB} = require('../config/db');

const SubjectSchema = mongoose.Schema({
    subjectName : {
        type : String,
        required : true 
    },
    subjectTitle : {
        type : String,
        required: function () {
            return !!this.subjectName; // subjectTitle is required if subjectName is provided
        }
    },
    status:{
        type:String,
        required:true
    },
    comment:{
        type:String
    }
});

const ClientSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'userdb',
        required : true
    },
    teamName : {
        type : String,
        required : true
    },
    classYear : {
        type: String,
        required :true 
    },
    subjects : [SubjectSchema]
});

const ClientModel = userDB.model('clientinfo',ClientSchema);

module.exports = ClientModel;