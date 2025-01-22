const mongoose = require('mongoose');
const UploadModel = require('../Models/Upload');

const uploadInfo = async(req,res)=>{
    try{
        const courseName = req.body.courseName;
        const courseTitle = req.body.courseTitle;
        const pdf = req.file.filename;

        const userId = req.user._id;

        const uploadModel = new UploadModel({userId,courseName,courseTitle,pdf});

        const result = await uploadModel.save();

        console.log(result);

        if(result)
            return res.status(201).send({message:'Inserted'});
        else
            return res.status(409).send({message:'Error at uploadusercontroller'});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error at uploadInfo',err});
    }
}


module.exports = {
    uploadInfo
}