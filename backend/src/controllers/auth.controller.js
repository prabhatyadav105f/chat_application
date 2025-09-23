import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import {generateToken} from "../lib/utils.js"
import { sendWelcomeEmail } from "../email/emailHandler.js"
import "dotenv/config"

export const signup= async(req,res)=>{
    const {fullName,email,password}=req.body
    try {
        if(!fullName||!email||!password){
            return res.status(400).json({message:"all field are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be of 6 character"})
        }
        //check if email is valid or not
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user=await User.findOne({email})
    if(user) return res.status(400).json({message:"email already exist"})
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=new User({
        fullName,email,password:hashedPassword
    })
    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,

        });
        try {
            await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.CLIENT_URL)
        } catch (error) {
            console.log("fail to send welcome email");
            
        }

    }
    else{
        return res.status(400).json({message:"invalid data"})
    }

    } catch (error) {
        console.log("error in signup controller",error);
        res.status(500).json({message:"internal server error"})
        
    }
}

export const login=async(req,res)=>{
const {email,password}=req.body
try {
    const user=await User.findOne({email})
    if (!user) return res.json({message:"invalid creditenials"})//never tell the client which one is incoreect
    const isPassword=await bcrypt.compare(password,user.password)
    if(!isPassword) return res.json({message:"invalid creditenials"})
    generateToken(user._id,res);
     res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,

        });
   
} catch (error) {
    console.log("error in login controller");
    res.status(500).json({message:"internal server error"})
    
}
}

export const logout=(req,res)=>{
    res.cookies("jwt","",{maxAge:0})
    res.status(200).json({message:"logout succesfully"})
}

