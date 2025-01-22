const UserModel = require('../Models/Auth');

const AdminModel = require('../Models/Admin');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const signUpUser = async(req,res)=>{
    try{
        const {name,email,password,prn,teamMembers} = req.body;
        const user = await UserModel.findOne({$or:[{email:email},{prn:prn}]});
        console.log(user);
        if(user)
            return res.status(409).send({message:'User already exists',status:false});

        let userModel;
        if(teamMembers)
            userModel = new UserModel({name,email,password,prn,teamMembers});
        else
            userModel = new UserModel({name,email,password,prn});

        userModel.password = await bcrypt.hash(password,10); // field and salt

        const result = await userModel.save();
        console.log(result);
        if(result)
            return res.status(201).send({message:'Sign Up successful',status:true});
        else 
            return res.status(401).send({message:'Some error occured',status:false});
    }catch(err){
        console.log(err);
        return res.status(400).send({err});
    }
}


const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        //is user exists
        const user = await UserModel.findOne({email});

        if(!user)
            return res.status(401).send({message:'User doesn\'t exists',status:false});

        const isPassEqual = await bcrypt.compare(password,user.password);

        if(!isPassEqual)
            return res.status(403).send({message:'Invalid Password',status:false});

        //creating token

        const token = jwt.sign(
            {email : user.email,_id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '1d'}
        );

        return res.status(202).send({message:'Login Successful',token,name:user.name,status:true});

    }catch(err){
        return res.status(500).send({message:'Error at login User',status:false,err});
    }
}


const signUpAdmin = async(req,res)=>{
    try{
        const {name,email,uniqueId,password} = req.body;

        const user = await AdminModel.findOne({email});

        if(user) 
            return res.status(409).send({message:'Admin Exists',status:false});

        const adminModel = new AdminModel({name,email,uniqueId,password});

        adminModel.password = await bcrypt.hash(password,10);

        const userCreated = await adminModel.save();

        console.log(userCreated);

        if(userCreated)
            return res.status(201).send({message:'Admin Created Successfully',status:true});
        else
            return res.status(403).send({message:'Error while creating Admin',status:false});

    }catch(err){
        return res.status(500).send({message:'Error at admin sign up',err,status:false});
    }
}


const loginAdmin = async(req,res) =>{
    try{
        const {email,uniqueId,password} = req.body;

        const admin = await AdminModel.findOne({email});

        if(!admin)
            return res.status(401).send({message:'Admin login error',status:false});

        const isPswEqual = await bcrypt.compare(password,admin.password);
        
        if(isPswEqual && uniqueId === admin.uniqueId){
            const token = jwt.sign(
                {email : admin.email,_id : admin._id},
                process.env.JWT_SECRET,
                {expiresIn:'1d'}
            );
            return res.status(200).send({message:'Login Successful',token,name:admin.name,status:true});
        }else
            return res.send({message:'Invalid credentials',status:false});

    }catch(err){
        return res.status(500).send({message:'Error at admin login',status:false},err);
    }
}

module.exports = {
    signUpUser,
    loginUser,
    signUpAdmin,
    loginAdmin
};
