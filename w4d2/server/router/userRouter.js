const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.post('/', userController.save); 

module.exports = router;