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
                return res.status(201).send({message:'Course Details are inserted',status:true});
            else 
                return res.status(403).send({message:'Error while saving course details',status:false});
        }else 
            return res.status(403).send({message:'Admin not found Course save error',status:false});

    }catch(err){
        return res.status(500).send({message:'Error at course controller',err});
    }
}

const getSubjectName = async(req,res)=>{
    try{
        const {year} = req.body;

        const result = await CourseModel.find({year : year});

        if(result)
            return res.status(200).send({result:result});
        else 
            return res.status(409).send({message:'Subject Name Error',result:null});
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


const getCourse = async(req,res)=>{
    try{
        const teacher = req.user;

        const result = await CourseModel.find({adminId:teacher});

        if(result.length > 0)
            return res.status(200).send({message:'Record Found',result:result,status:true});
        else
            return res.status(200).send({message:'Record Not Found',result:result,status:true});
    }catch(err){
        return res.status(500).send({message:err,status:false});
    }
}

module.exports = {
    courseSave,
    getSubjectName,
    getSubjectTitle,
    getCourse
};