"use strict";
/*eslint-disable */
const User = require('../models/users');
const Tweet = require('../models/tweets');
const responseInfo = require('../models/responseInfo');

exports.findUser = async (req, res, next) => {
    const userNameArr = req.body.username.split('');
    userNameArr[0] = userNameArr[0].toUpperCase();
    let userName = userNameArr.join('');
    const currentUserId = req.body.currentUserId;
    try {
        const usrs = await User.find({ username: { $regex: "^@" + userName } });
        const currentUser = await User.findById(currentUserId);
        const usersFound = {
            following: [],
            notFollowing: []
        }
        for (let user of usrs) {
            if (currentUser.following.includes(user._id)) {
                usersFound.following.push(user);
            } else {
                usersFound.notFollowing.push(user);
            }
        }
        if (!usersFound.following.length && !usersFound.notFollowing.length) {
            res.status(400).json(new responseInfo(true, "User by that name not FOUND", null));
        } else {
            res.status(200).json(new responseInfo(false, null, usersFound));
        }
    } catch (error) {
        res.status(400).json(new responseInfo(true, "User by that name not FOUND", null));
    }

};

exports.getTweets = async (req, res, next) => {
    const tweets = await Tweet.find({ content: "So this is where all the cool people are?" });
    res.status(200).json(tweets);
}

exports.follow = async (req, res, next) => {
    let currentUser = req.body.currentUser;
    let currentUserObj = await User.findOne({ username: currentUser });
    let userToFollow = await User.findOne({ username: req.body.userToFollow });
    try {
        const follow = await User.updateOne({ username: currentUser }, { $push: { following: userToFollow._id.toString() } });
        const saveFollower = await User.updateOne({ username: userToFollow.username }, { $push: { followers: currentUserObj._id.toString() } });
        res.status(200).json(new responseInfo(false, null, follow));
    } catch (error) {
        res.status(400).json(new responseInfo(true, "follow failed", null));
    }
};
exports.unfollow = async (req, res, next) => {
    let currentUser = req.body.currentUser;
    let currentUserObj = await User.findOne({ username: currentUser });
    let userToUnfollow = await User.findOne({ username: req.body.userToUnfollow });
    try {
        const unfollow = await User.updateOne({ username: currentUser }, { $pull: { following: userToUnfollow._id } });
        const removeFollower = await User.updateOne({ username: userToUnfollow.username }, { $pull: { followers: currentUserObj._id } });
        res.status(200).json(new responseInfo(false, null, unfollow));
    } catch (error) {
        res.status(400).json(new responseInfo(true, "unfollow failed", null));
    }
};

exports.fetchProfile = async (req, res, next) => {
    const username = req.params.username;
    try {
        const userInfo = await User.findOne({ username }).populate('following').populate('followers');
        res.status(200).json(new responseInfo(false, null, userInfo));
    } catch {
        res.status(400).json(new responseInfo(true, 'profile fetch failed', null));
    }
}