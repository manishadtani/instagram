const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const config = require("../config/config")


const jwt = require("jsonwebtoken")

//userSchema.statics
//userSchema.methods

module.exports.registerController = async (req, res) => {

    try {
        const { username, email, password } = req.body

        if (!username) {
            return res.status(400).json({ message: "username is required" })
        }
        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }

        const isUser = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if (isUser) {
            return res.status(400).json({ message: "user is already exist" })
        }

        const hashedpassword = await bcrypt.hashPassword(password)

        const user = userModel.create({
            username: username,
            email: email,
            password: hashedpassword
        })
        const token = isUser.generateToken()
        res.json({ token: token, user: user })
    } catch (error) {
        console.log(error)

    }
}


module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
    if (!email) {
        return res.status(400).json({ message: "email is required" })
    }
    if (!password) {
        return res.status(400).json({ message: "password is required" })
    }

    const isUser = await userModel.findOne({ email })

    if (!isUser) return res.status(400).json({ message: "Invalid Credentials" })

    const isMatch = await bcrypt.comparePassword(password, isUser.password)

    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

    const token = user.generateToken()
    res.json({message:"user succesfully login", token:token})
    } catch (error) {
        console.log(error)
    }
    
}


module.exports.profileController = async (req,res)=>{
   const user = await userModel.findById(req.user._id).populate("posts")
    res.send(user)
}









