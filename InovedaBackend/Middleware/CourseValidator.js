const joi = require('joi');


const courseValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            year : joi.string().min(2).required(),
            subjectName : joi.string().min(3).required(),
            subjectTitle : joi.array().items(joi.string().required()).min(1).required()
        })

        const {error} = schema.validate(req.body);
        
        if(error)
            return res.status(406).send({message:'Course validation error'});

        next();

    }catch(err){
        return res.status(500).send({message:'Error at courseValidation',err});
    }
}

const courseYearValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            year : joi.string().min(2).required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(401).send({message:'Course Year Validation Error'});
        
        next();
    }catch(err){
        return res.status(500).send({message:'Error at courseYearValidation',err});
    }
}

const courseSubjectNameValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            year : joi.string().min(3).required(),
            subjectName : joi.string().min(3).required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(403).send({message:'courseSubjectNameValidation Error'});

        next();
    }catch(err){
        return res.status(500).send({message:'Error at courseSubjectNameValidation',err});
    }
}

const uploadValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            courseName : joi.string().min(3).required(),
            courseTitle : joi.string().min(3).required()
        });

        const {error} = schema.validate(req.body);

        if(error){
            console.log(error);
            return res.status(403).send({message:'Upload Validation Error'});
        }
        next();
    }catch(err){
        return res.status(500).send({message:'Error at uploadValidation',err});
    }
}

module.exports = {
    courseValidation,
    courseYearValidation,
    courseSubjectNameValidation,
    uploadValidation
};