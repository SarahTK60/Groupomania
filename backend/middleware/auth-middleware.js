const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports =  (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({ message: 'No token'})
        }
        jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
            if(err){
                return res.status(401).json({message: 'Bad token'})
            }
            req.userId = decodedToken.userId
            next()
        })
    } catch (error) {
        res.status(401).json({ error });
   }
};