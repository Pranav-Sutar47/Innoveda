const express = require('express');
const { signUpValidationUser, loginValidationUser, signUpValidationAdmin, loginValidationAdmin } = require('../Middleware/AuthValidation');
const { signUpUser, loginUser, signUpAdmin, loginAdmin } = require('../Controller/AuthController');

const router = express.Router();
 
// User singup endpoint
router.post('/signupuser',signUpValidationUser,signUpUser);
// User login endpoint
router.post('/loginuser',loginValidationUser,loginUser);

// Admin singup endpoint
router.post('/signupadmin',signUpValidationAdmin,signUpAdmin);

// Admin login endpoint
router.post('/loginadmin',loginValidationAdmin,loginAdmin);


module.exports = router;