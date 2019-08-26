const secrets = require('./secrets')
const jwt = require('jsonwebtoken')

module.exports = function restricted (req, res, next){
    //get token from Auth header
    //verify token
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err){
                //invalid token
                res.status(401).json({ you: 'shall not pass' })
            }else{
                //next with a value in it makes the value available to the next endpoint
                req.jwtToken = decodedToken;
                next();
            }
        })
    }else{
        res.status(401).json({ message: 'No passage for you' })
    }
}