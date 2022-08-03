"use strict";
/*eslint-disable */

const express = require('express');
const router = express.Router();

const logincontroller = require('../controllers/logincontroller');

router.get('/login', logincontroller.homepage);
router.get('/login/:userEntry/:password', logincontroller.login);
router.post('/signup', logincontroller.signup);

module.exports = router;