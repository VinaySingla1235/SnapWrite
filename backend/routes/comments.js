const express=require('express')
const router=express.Router()
const User=require('../models/User')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const authenticate=require('../middlewares/authenticate')
// CREATE 
router.post('/create',authenticate,async (req,res)=>{
    try {
        const userId=req.user._id;
        req.body.userId=userId;
        req.body.username=req.user.username;
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json({success:true,savedComment})
    } catch (error) {
        res.status(200).json({success:false,error});
    }
})

// UPDATE 
router.put("/:id",authenticate,async(req,res)=>{
    try {
        
        const comment = await Comment.findById(req.params.id);

        // Check if the post exists
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Check if the authenticated user is the owner of the post
        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this comment' });
        }
        const userId=req.user._id;
        req.body.userId=userId;
        req.body.username=req.user.username;
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json({success:true,updatedComment})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,error})
    }
})
// DELETE 
router.delete("/:id",async(req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id);

        // Check if the post exists
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Check if the authenticated user is the owner of the post
        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this comment' });
        }
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,message:"Comment has been deleted"})
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})

// GET POST COMMENTS
router.get("/post/:postId",async(req,res)=>{
    try {
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json({success:true,comments})
    } catch (error) {
        res.status(500).json({success:true,error})
    }
})
module.exports=router