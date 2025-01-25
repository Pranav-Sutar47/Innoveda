const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UploadModel = require('./Models/Upload');
const fs = require('fs');

// Middleware
app.use(cors());

// Use bodyparser for JSON and URL-encoded data, not for multipart (files)
const bodyparser = require('body-parser');
const { userValidation } = require('./Middleware/AuthValidation');
const ClientModel = require('./Models/Client');
const { uploadValidation } = require('./Middleware/CourseValidator');
app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));

// File upload configuration with multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// File upload route
app.post('/upload/uploadinfo', userValidation,upload.single('file'), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        // Extract other form data from the request
        const courseName = req.body.courseName;
        const courseTitle = req.body.courseTitle;
        const pdf = req.file.filename; // The uploaded file's name
        const userId = req.user._id; // Assuming user is authenticated, using req.user (make sure it's set correctly)

        // Create a new upload model entry
        const uploadModel = new UploadModel({ userId, courseName, courseTitle, pdf });
        const result = await uploadModel.save();

        // Send appropriate response
        if (result) {
            const op = await ClientModel.updateOne({userId,'subjects.subjectName':courseName},{$set:{'subjects.$.status':'Submitted'}});
            console.log(op);
            if(op.modifiedCount > 0)
                return res.status(201).send({ message: 'File uploaded successfully',status:true,fileName:pdf});
            else 
                return res.status(200).send({message:'No matching document found',status:false});
        } else {
            return res.status(409).send({ message: 'Error while saving upload information' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error during upload', err });
    }
});

// Serve files from the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));
// app.use('/files', express.static('files'));
// app.use('/files', express.static('files', {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.pdf')) {
//         res.setHeader('Content-Type', 'application/pdf');
//       }
//     }
//   }));

//   app.use('/files', (req, res, next) => {
//     res.setHeader('Content-Disposition', 'inline'); // Or use 'attachment' for download
//     next();
//   }, express.static('files'));
  

// Routes
app.use('/auth', require('./Routes/Auth'));
app.use('/course', require('./Routes/Course'));
app.use('/client', require('./Routes/Client'));
app.use('/api',require('./Routes/Upload'));
// Start the server
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});

//const fs = require('fs');
// const filePath = './files/1729417705193.pdf';

// if (fs.existsSync(filePath)) {
//   console.log('File exists');
// } else {
//   console.log('File does not exist');
// }


const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file:`, err);
          reject(err);
        } else {
          console.log(`File deleted successfully.`);
          resolve();
        }
      });
    });
};

app.post('/upload/deletefile',userValidation,uploadValidation,async(req,res)=>{
    try{
        const courseName = req.body.courseName;
        const courseTitle = req.body.courseTitle;
        const userId = req.user._id;

        console.log(courseName,courseTitle,userId);
        
        const val = await UploadModel.findOne({userId:userId,courseName:courseName,courseTitle:courseTitle});

        console.log(val);

        const pdf = val.pdf;
        console.log(pdf);

        const filePath = path.join(__dirname,'files',pdf);

        await deleteFile(filePath);
            //console.log('hello');
        const result = await UploadModel.deleteOne({userId:userId,courseName:courseName,courseTitle:courseTitle}); 
        //console.log(result);
        if(result){
            const user = await ClientModel.updateOne({userId,'subjects.subjectName':courseName},{$set:{'subjects.$.status':'Not Submitted'}});
            //console.log(user);
            if(user.modifiedCount>0)
                return res.status(200).send({message:'File deleted successfully',status:true});
            else 
                return res.status(409).send({message:'Error while deleting file',status:false});     
        }else{
            return res.status(201).send({message:'User not found'});
        }
    }catch(err){
        console.log('Error at deletefile',err);
        return res.status(500).send({error:err,message:'Error at deletefile'});
    }
});