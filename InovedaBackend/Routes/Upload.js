const express = require('express');

const router = express.Router();

const multer  = require('multer');

const path = require('path');
const { userValidation } = require('../Middleware/AuthValidation');
const { uploadInfo } = require('../Controller/UploadUserController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  })
  

const upload = multer({ storage: storage })

router.post('/uploadinfo',upload.single("pdf"),userValidation,uploadInfo);

module.exports = router;