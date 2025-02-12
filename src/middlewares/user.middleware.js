const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config")
const userModel = require("../models/user.model")

module.exports.authuser = async (req, res, next) => {
    const auth = req.headers.authorization
    
    try {
        const token = auth.split(' ')[1]
        if (!token) return res.status(401).json({ message: "unauthorized" })

        const decoded = userModel.verifyToken(token)
    
        const user = await userModel.findOne({id:decoded._id})
        
        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" })
    }
    
}


