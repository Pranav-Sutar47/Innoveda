const UserModel = require('../Models/Auth');
const ClientModel = require('../Models/Client');

const getUser = async(req,res) =>{
    try{
        const user = await UserModel.findById(req.user._id);

        const clientInfo = await ClientModel.findOne({userId:req.user._id});

        if(user && clientInfo){
            const obj = {...user};
            if(clientInfo.teamName)
                obj.teamName = clientInfo.teamName;
            if(clientInfo.classYear)
                obj.classYear = clientInfo.classYear;
            if(clientInfo.subjects)
                obj.subjects  = clientInfo.subjects;
            else 
                obj.subjects = [];

            return res.status(200).send({obj,status:true,switch:1});
        }else if(user){
            return res.status(200).send({user,status:true,switch:2});
        }
        else 
            return res.status(401).send({message:'Get User Error',status:false});

    }catch(err){
        return res.status(500).send({message:'Error at getUser',error:err.message,status:false});
    }
}

const addClientInfo = async(req,res)=>{
    try{
        const {teamName,classYear,subjects} = req.body;

        const result = await UserModel.findById(req.user._id);

        const exist = await ClientModel.findOne({userId:req.user._id});

        if(result && exist){
            const updateField = {
                subjects : subjects            
            };
            const response = await ClientModel.findOneAndUpdate({userId:req.user._id},{$set:updateField},{new:true});

            if(response)
                return res.status(200).send({message:'Information Updated',status:true});
            else 
                return res.status(406).send({message:'Add client Error',status:false});
        }
        else if(result && !exist){
 
            const client = new ClientModel({
                userId:req.user._id,teamName,classYear,subjects
            });

            const val = await client.save();

            if(val)
                return res.status(201).send({message:'Information Updated',status:true});
            else 
                return res.status(406).send({message:'Add client Error',status:false});
        }else 
            return res.status(406).send({message:'User not found at addClientInfo',status:false});

    }catch(err){
        return res.status(500).send({message:'Error at addClientInfo',error:err,status:false});
    }
}

const getClientInfo = async(req,res) =>{
    try{
        const result = await ClientModel.findOne({userId:req.user._id});

        if(result){
            return res.status(200).send({result,status:true});
        }else 
            return res.status(409).send({message:'No subjects are selected,Please select subjects first to upload documents',status:false});

    }catch(error){
        return res.status(500).send({message:'Error at getClientInfo',error:error,status:false});
    }
}

module.exports={
    getUser,
    addClientInfo,
    getClientInfo
};