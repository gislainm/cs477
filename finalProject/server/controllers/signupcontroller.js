"use strict";
/*eslint-disable */
const User = require('../models/users');
const responseInfo = require('../models/responseInfo')

exports.signup = async (req, res, next) => {
    const newuser = new User(req.body);
    newuser.followers = [];
    newuser.following = [];
    newuser.dateJoined = Date.now();
    await newuser.save()
    res.status(201).json(new responseInfo(false, null, newuser));
}