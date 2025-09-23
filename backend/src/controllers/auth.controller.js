import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import {generateToken} from "../lib/utils.js"

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

    }
    else{
        return res.status(400).json({message:"invalid data"})
    }

    } catch (error) {
        console.log("error in signup controller",error);
        res.status(500).json({message:"internal server error"})
        
    }
}