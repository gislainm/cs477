"use strict";
/*eslint-disable */

const express = require('express');
const router = express.Router();

const logincontroller = require('../controllers/logincontroller');

router.get('/', logincontroller.homepage);
router.post('/login', logincontroller.login);
router.post('/signup', logincontroller.signup);
// router.get('/home',logincontroller.home);

module.exports = router;