
const User = require('../model/user');

const Response = require('../model/responseObj');

exports.save = async (req, res, next) =>{
    const user = await new User(req.body).save();
    res.status(201).json(new Response(false, null, user));
}
