const express = require('express');
const { userValidation } = require('../Middleware/AuthValidation');
const { getUser, addClientInfo, getClientInfo } = require('../Controller/ClientController');
const { clientInfoValidation } = require('../Middleware/ClientValidatior');

const router = express.Router();

router.get('/getClient',userValidation,getUser);

router.post('/addClientInfo',userValidation,clientInfoValidation,addClientInfo);

router.get('/getClientInfo',userValidation,getClientInfo);

module.exports = router;