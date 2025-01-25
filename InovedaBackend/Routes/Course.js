const express = require('express');
const { userValidation } = require('../Middleware/AuthValidation');
const { courseValidation, courseYearValidation, courseSubjectNameValidation } = require('../Middleware/CourseValidator');
const { courseSave, getSubjectName, getSubjectTitle,getCourse } = require('../Controller/CourseController');

const router = express.Router();

router.post('/addcourse',userValidation,courseValidation,courseSave);

router.post('/getsubjectname',userValidation,courseYearValidation,getSubjectName);

router.get('/getsubjecttitle',userValidation,courseSubjectNameValidation,getSubjectTitle);

router.get('/getCourse',userValidation,getCourse);

module.exports = router;