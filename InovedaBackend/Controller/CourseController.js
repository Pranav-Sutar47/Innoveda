const AdminModel = require("../Models/Admin");
const CourseModel = require("../Models/Course");

const courseSave = async(req,res)=>{
    try{

        const {year,subjectName,subjectTitle} = req.body;
        const admin = req.user;

        const result  = await AdminModel.findOne({_id:admin._id});

        if(result){

            const courseModel = new CourseModel({
                adminId:result._id,
                year,
                subjectName,
                subjectTitle
            });

            const val = await courseModel.save();

            if(val)
                return res.status(201).send({message:'Course Details are inserted'});
            else 
                return res.status(403).send({message:'Error while saving course details'});
        }else 
            return res.status(403).send({message:'Admin not found Course save error'});

    }catch(err){
        return res.status(500).send({message:'Error at course controller',err});
    }
}

const getSubjectName = async(req,res)=>{
    try{
        const {year} = req.body;

        const result = await CourseModel.find({year : year});

        if(result)
            return res.status(200).send(result);
        else 
            return res.status(409).send({message:'Subject Name Error'});
    }catch(err){
        return res.status(500).send({message:'Error at getYear course',err});
    }
}


const getSubjectTitle = async(req,res)=>{
    try{
        const {subjectName,year} = req.body;
        
        const result = await CourseModel.find({subjectName:subjectName,year:year});

        if(result)
            return res.status(200).send({result});
        else 
            return res.status(403).send({message:'Get Subject Title Errror'});
        
    }catch(err){    
        return res.status(500).send({message:'Error at getSubjectTitle',err});
    }
}


module.exports = {
    courseSave,
    getSubjectName,
    getSubjectTitle
};