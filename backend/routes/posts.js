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
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()
        res.status(200).json({success:true,savedPost})
    } catch (error) {
        res.status(200).json({success:false,error});
    }
})

// UPDATE 
router.put("/:id",authenticate,async(req,res)=>{
    try {
        
        // Find the post by ID
        const post = await Post.findById(req.params.id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check if the authenticated user is the owner of the post
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this post' });
        }
        const userId=req.user._id;
        req.body.userId=userId;
        req.body.username=req.user.username;
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json({success:true,updatedPost})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,error})
    }
})
// DELETE 
router.delete("/:id",authenticate,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check if the authenticated user is the owner of the post
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this post' });
        }
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json({success:true,message:"Post has been deleted"})
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})
// GET POST
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json({success:true,post})
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})

// GET POSTS 
router.get("/",async(req,res)=>{
    const query=req.query;
    // console.log(query);
    try {
        const searchFilter={
            title:{$regex:query.search,$options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json({success:true,posts})
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})

// GET USER POSTS 
router.get("/user/:userId",async (req,res)=>{
    try {
        
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json({success:true,posts})
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})


module.exports=router