const express = require('express');
const { userValidation } = require('../Middleware/AuthValidation');
const { courseValidation, courseYearValidation, courseSubjectNameValidation } = require('../Middleware/CourseValidator');
const { courseSave, getSubjectName, getSubjectTitle } = require('../Controller/CourseController');

const router = express.Router();

router.post('/addcourse',userValidation,courseValidation,courseSave);

router.get('/getsubjectname',userValidation,courseYearValidation,getSubjectName);

router.get('/getsubjecttitle',userValidation,courseSubjectNameValidation,getSubjectTitle);

module.exports = router;