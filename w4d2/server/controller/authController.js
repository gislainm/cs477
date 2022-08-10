const jwt = require('jsonwebtoken');

const User = require('../model/user');
const Response = require('../model/responseObj');

const SECRET = 'This is my secret';

exports.login = async (req, res, next) =>{
    const { username, password } = req.body;
    if(username && password) {
        let result;
        try {
            result = await User.findOne({ username, password });
        } catch (error) {
            return next (new Error ('Fail to find User'));
        }
        if(result) {
            const accessToken = jwt.sign({
                id: result._id,
                username: result.username,
                
            }, SECRET);
            res.status(200).json(new Response(false, null, { accessToken}));
        } else{
            res.status(400).json(new Response(true, "Invalid username and password", null));
        }
    } else{
        res.status(400).json(new Response(true, "Please provide username and password", null));
    }
    
}

exports.authenticate = (req, res, next) =>{
    const [, token] = req.headers.authorization.split(" ");
    try{
        let result = jwt.verify(token, SECRET);
        next();
    } catch(err) {
        res.status(400).json(new Response(true, "Invalid JWT", null));
    }
}
