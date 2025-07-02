
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{

    const authHeader = req.headers.authorization;

    //checking token is present or not

    if(!authHeader){
        return res.status(401).json({message:"Access denied. No token provided."})
    }
    try {
        //verifying token
        const decoded = jwt.verify(authHeader, 'supersecretkey')
        req.user = decoded ; // stored userinfo in request
        next();
    }catch (error){
        return res.status(401).json({message:"Invalid or expired token."})
    }
}

module.exports = verifyToken;
