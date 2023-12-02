const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const validate=require('../middlewares/validate-middleware')
const signupSchema=require('../validators/auth-validator')
const authenticate=require('../middlewares/authenticate')
// REGISTER 
router.post("/register",validate(signupSchema),async(req,res)=>{
    try {
        let user=await User.findOne({username:req.body.username})
        if(user){
            res.status(403).json({success:false,message:"username already taken please try a different username"})
            return;
        }
        user =await User.findOne({email:req.body.email})
        if(user){
            res.status(403).json({success:false,message:"email address is already registered"});
            return;
        }
        const {username,email,password}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt);
        const newUser=new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(200).json({success:true,savedUser})
        // res.status(200).json({savedUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error})
    }
})

// LOGIN
router.post("/login",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        const match=await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(401).json({success:false,message:"Wrong credentials entered"})
        }
        const token=jwt.sign({id:user._id},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json({success:true,info})
    } catch (error) {
        res.status(500).json({success:false,message:error});
    }
})

// LOGOUT 
router.get("/logout",async(req,res)=>{
    try {
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send({success:true,message:"user logged out"});
    } catch (error) {
        res.status(500).json({success:false,message:error});
    }
})

// REFETCH USER 
router.get("/refetch",authenticate,(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
})

module.exports=router