const mongoose = require('mongoose');
const UploadModel = require('../Models/Upload');
const UserModel = require('../Models/Auth');

const uploadInfo = async(req,res)=>{
    try{
        const courseName = req.body.courseName;
        const courseTitle = req.body.courseTitle;
        const pdf = req.file.filename;

        const userId = req.user;

        const uploadModel = new UploadModel({userId,courseName,courseTitle,pdf});

        const result = await uploadModel.save();

        if(result)
            return res.status(201).send({message:'Inserted'});
        else
            return res.status(409).send({message:'Error at uploadusercontroller'});

    }catch(err){
        return res.status(500).send({message:'Error at uploadInfo',err});
    }
}

const getUpload = async(req,res)=>{
    try{

        const {subjectName,subjectTitle} = req.body;

        const result = await UploadModel.find({courseName:subjectName,courseTitle:subjectTitle});
        const users = await UserModel.find();

        if(result && users){
            const combinedData = result.map(item => {
                const user = users.find(u => String(u._id) === String(item.userId)); // Match userId with _id
                return {
                    _id: item._id,
                    userId: item.userId,
                    courseName: item.courseName,
                    courseTitle: item.courseTitle,
                    pdf: item.pdf,
                    name: user?.name || 'Unknown', // Safely access name
                    teamMembers: user?.teamMembers || [] // Safely access teamMembers
                };
            });

            return res.status(200).send({ combinedData, status: true });
        }
        if(result && !user || !result && user)
            return res.status(407).send({message:'No one uploaded Yet'});
    }catch(err){
        return res.status(500).send({message:'Error at getUpload',err});
    }
}

const setComment = async(req,res)=>{
    try{
        const {comment,id} = req.body;

        const update = await UploadModel.findOneAndUpdate({_id:id},{viewStatus:true,comment:comment},{new:true});

        if(update)
            return res.status(200).send({message:'Comment Added Successfully!',status:true});
        else 
            return res.status(407).send({message:'Error while updating comment',status:false});

    }catch(err){
        return res.status(500).send({message:'Error at setComment',err});
    }
}

const getComment = async(req,res)=>{
    try{
        //const id = req.params.id;
        const detail = await UploadModel.findOne({userId:req.params.id});
        if(detail)
            return res.status(200).send({status:true,detail});
        else 
            return res.status(408).send({status:false,detail});
    }catch(err){
        return res.status(500).send({message:'Error at getComment',err});
    }
}

module.exports = {
    uploadInfo,
    getUpload,
    setComment,
    getComment
}