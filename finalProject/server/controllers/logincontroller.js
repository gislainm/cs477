const { objectId } = require('mongodb');
const User = require('../models/users');
const path = require('path');
const bcrypt = require('bcrypt');

exports.homepage = async (req, res, next) => {
    console.log('homepage');
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'loginPage.html'));
}

exports.login = async (req, res, next) => {
    console.log("we here");
    const userEntry = req.params.userEntry;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.params.password, salt);
    if (userEntry.includes('@')) {
        const user = await User.findOne({ email: userEntry, password: hashPassword });
        if (user) {
            res.status(201).json(user);
        } else {
            res.json('wrong password or username')
        }
    } else {
        const user = await User.findOne({ username: "@" + userEntry, password: hashPassword });
        if (user) {
            res.status(201).json(user);
        } else {
            res.json('wrong password or username')
        }
    }
}


exports.signup = async (req, res, next) => {
    const newuser = await new User(req.body).save()
    res.status(201).json(newuser);
}