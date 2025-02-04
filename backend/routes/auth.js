import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js';
const router = express.Router()

router.post('/register', async(req,res)=>{
console.log("req", req.body)
try{
const {username,name,email,password}= req.body;

const user= await User.findOne({email});

if(user){
    return res.status(401).json({success:false, message:"User already exist"})
}

const hashPassword= await bcrypt.hash(password,10);
const newUser = new User({
    name,email,password:hashPassword
})
await newUser.save()

return res.status(200).json({success:true, message:"Account Created Sucessfully"})
}catch(error){
    console.log("error", error.message);
    return res.status(500).json({success:false, message:"Something went wrong"})
}


})


router.post('/login', async(req,res)=>{
    console.log("req", req.body)
    try{
    const {email,password}= req.body;
    
    const user= await User.findOne({email});
    
    if(!user){
        return res.status(401).json({success:false, message:"User not exist"})
    }
    
  const checkpassword = await bcrypt.compare(password, user.password)
 

  if(!checkpassword){
return res.status(401).json({success:false, message:"Wrong Credentials"})
  }

  const token= jwt.sign({id:user._id}, "secretkeyofnotapp123@#", {expiresIn:"5h",}) 
   
    
    return res.status(200).json({success:true,token,user:{name:user.name}, message:"login Sucessfully"})
    }catch(error){
        console.log("error", error.message);
        return res.status(500).json({success:false, message:"Something went wrong"})
    }
    
    
    })

router.get('/verify',middleware,  async(req,res)=>{
return res.status(200).json({success:true, user: req.user})
})


export default router