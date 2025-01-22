const joi = require('joi');

const clientInfoValidation = async(req,res,next)=>{
    try{

        const subjectSchema = joi.object({
            subjectName : joi.string().required(),
            subjectTitle: joi.string().required(),
            status:joi.string().required()
        });

        const schema = joi.object({
            teamName : joi.string().min(2).max(25).required(),
            classYear : joi.string().min(2).required(),
            subjects : joi.array().items(subjectSchema).min(1)    
        });

        const {error} = schema.validate(req.body);

        if(error){
  
            return res.status(406).send({message:'Validation error at clientInfoValidation',error:error});
        }

        next();

    }catch(err){
        return res.status(500).send({message:'Error at validation clientInfo',error:err});
    }
}

module.exports = {
    clientInfoValidation
};