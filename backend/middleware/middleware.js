const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!(authHeader && authHeader.startsWith('Bearer'))){
        return res.status(403).json({
            message: "You don't have access"
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }

        return res.status(403).json({
            message: "Authorization Error"
        });
    }catch(e){
        return res.status(403).json({
            message: "Something went wrong"
        });
    }
}

module.exports = {
    authMiddleware
}