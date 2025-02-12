const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3, 'username must be 3 character long'],
        maxlength:[20, 'isername must be atmost 20 character long']
    },


    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[5, 'username must be 3 character long'],
        maxlength:[25, 'isername must be atmost 25 character long']
    },


    password:{
        type:String
    },


    profileImage:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAMFBMVEXk5ueutLeqsbTP09Xn6eq5vsHh4+S8wcO/xMayuLvLz9HCx8nc3+DGyszV2Nq2u74dx8azAAADsElEQVR4nO2b7Y6sIAxABQsKIrz/2150ZnfnwxnbosXkcm6y2dw/e9JKLVC7rtFoNBqNRqPRaDQajcb/AABYazu7/lZb5o0sF/08DMaYcZx9tJdyhM56o5TSWv/8dCk71va6A10cVrNntJ5idwVHiGlDb1VUQ6huCMFs290dh9qJ9uqbXzZ0fVXD4bveqjjVMwxp3y8bmkpPIgSH0FvTXGc1B0z4bjhbww8ZvzWGqYIhwW8pN9JJBsT6fTKcZQ2hp/llwygqGIh6i6FkCAFVAF8EBZNMT/CCC2KCNjH8lB7FQsgKYDaUKoZAKoEPCIUQCO+4Z4SeQmqN/kN7kRBaboaVMhJPIfRsP6VElsnEzXDOsUT/bw0/gCJNDeM1/ICAYORnWKZWM18jd8F4egihYI1kzl8l/DK9cn7PBQWLWGQXDyV+Ei0Xu5URE7x8BC8vyGr3fwUFFslQFEKBMnP5Qu0v/qq7frPA3jKtghdvWJXIKVxJyy+xrSvZNGmRjfHVt50FDZfQCRzwC43QARy74xI7Secev4mdYDIPMI3YASbzfSx4zs95CkVvPTkLWcvpLczkixzpi+2vkwAbTLJ6eSXTBJO0X25cKX5O3o/WWlcZCgB8DGuNz8SdmZQbOlUb74HgEGMpMk3gJ+Y9PSVzefMRiF+DWDG9v4bgPylq7QT26fuA9Vvzb1oP/SXG87pFMYz62VGrOVxFbwUg+GkwKbmUzDD24VIjojeWIduQ/1l7tSHbu4994OG/67JIhND7eczpdU6vOJeMGWffx1DXMv/t6BevZfBXv67h2yxwmitNLOfAxSm9eW0VQ62GPshaLkt2cPtyf5LKzFFKcZnqdojQvVm6KQiMBIPtR1STtRlI409WzC/exNX7CeOJihBmembfwziedEQD3ce2haiophN6MOj6oty+OB6eaIjUjfqOofLH9jrTgeG7Kx44nw643RtZ0R/lRz4owhoeEkToGAO1aMr3LDu7tlKKLyYIxxtVDMsuh3GGQ4lf0ZwW1pA/ZyEQv9WQG0OR+N0MWTHkTyPTDVkrpWzSkmjIOALjfPBQAPmdAqOoH/mzrNML9CuaeI/Cu88sMiRdNZ7WwHzBUZ5C4jXSIVBWsvQKuUFYJ5Il8A98CGs8gSvoHFfyw14pizUJbyCnLsqmVIvAvfAo3+UeC66rqZdhbOtapQjeQZXCoq8JykANT8k10huCmFpdVRAznVRvjShUJYRJ1wQhGPua7Gd4vX+rB0aw0Wg0juQfKTsxpW7TrCoAAAAASUVORK5CYII="
    },


    posts:[{
        type:mongoose.Types.ObjectId,
        ref: "post"
    }],


    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],


    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],


})




userSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id,username:this.username,email:this.email}, JWT_SECRET)
}

userSchema.statics.verifyToken = function(token){
    return jwt.verify(token, JWT_SECRET)
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10)
}

userSchema.statics.comparePassword = async function (password){
    return await bcrypt.compare(password, hash)
}





module.exports = mongoose.model("user",userSchema)