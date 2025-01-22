const mongoose  = require('mongoose');

const DB_USER = String(process.env.DB_URL_USER);

const userDB = mongoose.createConnection(DB_USER);

userDB.on('connected',()=>{
    console.log('User DB connnected');
});

userDB.on('error',(err)=>{
    console.log('User DB error:',err);
});

module.exports = {
    userDB
};