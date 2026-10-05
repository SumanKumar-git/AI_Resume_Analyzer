const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");


async function authMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized, token not found"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Unauthorized, token is blacklisted"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = authMiddleware;