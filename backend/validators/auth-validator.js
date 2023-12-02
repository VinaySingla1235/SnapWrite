const {z}=require('zod');
// Creating an object schema 
const signupSchema=z.object({
    username:z.string({required_error:"Username is required"}).trim()
    .min(3,{message:"Useername must be at least 3 chars"})
    .max(255,{message:"Username must not be more than 255 characters"}),

    email:z.string({required_error:"email is required"}).trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be at least 3 chars"})
    .max(255,{message:"email must not be more than 255 characters"}),

    password:z.string({required_error:"password is required"}).trim()
    .min(3,{message:"password must be at least 3 chars"})
    .max(1024,{message:"password must not be more than 1024 characters"}),
})
module.exports=signupSchema;