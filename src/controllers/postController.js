const postModel = require("../models/post.model")
const userModel = require("../models/user.model")
module.exports.postCreateController = async (req,res)=>{

    try {

        //  console.log(req.user)



        const {media , caption} = req.body

        if(!media){
          return res.status(400).json({message:"media is required"})
        }
  
        if(!caption){
          return res.status(400).json({message:"caption is required"})
        }
  
        const newPost = await postModel.create({
          media,
          caption
        })

        await userModel.findByIdAndUpdate(req.user._id,{
            $push:{
                posts:newPost._id
            }
        })
  
        return res.status(200).json({message:"user created post successfully"})
    } catch (error) {
        return res.json({message:"unauthorized"})   
     }
     
}