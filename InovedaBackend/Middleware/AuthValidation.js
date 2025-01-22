const joi = require('joi');

const jwt = require('jsonwebtoken');


const signUpValidationUser = (req,res,next) =>{
    try{

        const teamMemberSchema = joi.object({
            name : joi.string().min(3).max(50).required(),
            prn : joi.string().min(7).max(9).required()
        });



        const schema = joi.object({
            name : joi.string().min(3).max(50).required(),
            email : joi.string().email().required(),
            password : joi.string().min(4).max(10),
            prn : joi.string().min(7).max(9).required(),
        
            // check teamMembers only if it present if present then check otherwise no need
            teamMembers : joi.array().items(teamMemberSchema).optional()
        }).custom((value,helper)=>{
            //if teammembers are there
            if(value.teamMembers){
                //prn of team leader
                const teamLeaderPrn = value.prn;
                
                const hasDuplicatePrn = value.teamMembers.some(member=> member.prn === teamLeaderPrn);

                if(hasDuplicatePrn)
                    return  helper.error('any.invalid',{message:'Team member PRN must be different than team leader'});


                const prns = value.teamMembers.map(member => member.prn);

                const hasUniquePrns = new Set(prns).size === prns.length;

                if(!hasUniquePrns)
                    return helper.error('any.invalid',{message:'Each Team Member should have unique PRN.'});

            }
            return value;
        },'Custom PRN Validation').messages({
            'any.invalid' : '{{#message}}'
        });

        const {error} = schema.validate(req.body);

        if(error){
            return res.status(400).send({message:'Provide valid details',error});
        }
        next();
    }catch(err){
        return res.status(409).send({message:'err at signupvalidationuser',err});
    }
}

const loginValidationUser = (req,res,next) =>{
    try{
        const schema = joi.object({
            email : joi.string().email().required(),
            password : joi.string().min(4).max(10)
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(401).send({message:'Login validation user err',error});
        next();
    }catch(err){
        return res.status(500).send({message:'Err at loginuser',err})
    }
}


const signUpValidationAdmin = (req,res,next)=>{
    try{
        const schema = joi.object({
            name : joi.string().min(3).max(50).required(),
            email : joi.string().email().required(),
            uniqueId : joi.string().length(8).required(),
            password : joi.string().min(4).max(8).required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(400).send({message:'Provide valid details',error});

        next();

    }catch(err){
        return res.status(500).send({message:'Sign up validation error',err});
    }
}


const loginValidationAdmin = (req,res,next) =>{
    try{
        const schema = joi.object({
            email : joi.string().email().required(),
            password : joi.string().min(4).max(8),
            uniqueId : joi.string().length(8).required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(401).send({message:'Invalid details',error});

        next();
    }catch(err){
        return res.status(500).send({message:'Error at loginValidationAdmin',err});
    }
}

const userValidation = (req,res,next) =>{
    try{
        const token = req.headers['authorization']?.split(' ')[1];

        if(!token)
            return res.status(403).send({message:'Token Required'});
    
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err)
                return res.status(401).send({message:'Invalid Token',err})
            else{
                req.user = decoded; // adding user info into request
                next(); // when token is valid transfer control to taskController / other controller
            }  
        })

    }catch(err){
        console.log("User Validation",err);
    }
}

module.exports = {
    signUpValidationUser,
    loginValidationUser,
    signUpValidationAdmin,
    loginValidationAdmin,
    userValidation
};