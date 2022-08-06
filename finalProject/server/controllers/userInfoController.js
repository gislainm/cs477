"use strict";
/*eslint-disable */
const User = require('../models/users');
const Tweet = require('../models/tweets');
// const responseInfo = require('../models/responseInfo')

exports.findUser = async (req, res, next) => {
    const userName = req.body.username;
    const usrs = await User.findOne({ username: `@${userName}` });
    const { firstName, lastName, username } = usrs;
    console.log(firstName, lastName, username);
    res.status(200).json({ firstName, lastName, username });
};

exports.getTweets = async (req, res, next) => {
    const tweets = await Tweet.find({ content: "So this is where all the cool people are?" });
    res.status(200).json(tweets);
}