const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const authenticate=require('../middlewares/authenticate')
// UPDATE 
router.put("/",authenticate,async(req,res)=>{
    try {
        const {email,...info}=req.body;
        req.body=info;
        req.body._id=req.user._id;
        const user=await User.findOne({username:req.body.username})
        // console.log(user._doc)
        if(user && user._doc._id.toString()!=req.user._id.toString()){
            console.log(user._doc._id+" "+req.user._id);
            res.status(403).json({success:false,message:"username already taken please try a different username"});
            return;
        }
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt);
        }
        

        const updatedUser=await User.findByIdAndUpdate(req.user._id,{$set:req.body},{new:true});
        res.status(200).json({success:true,updatedUser})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,error})
    }
})
// DELETE 
router.delete("/",authenticate,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.user._id)
        await Post.deleteMany({userId:req.user._id})
        await Comment.deleteMany({userId:req.user._id})
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send({success:true,message:"user deleted"});
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})
// GET USER
router.get("/:id",async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json({success:true,info})
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})

module.exports=router