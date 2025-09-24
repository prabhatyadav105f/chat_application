import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const protectRoute=async(req,next,res)=>{
    try {
        const token=req.cookies.jwt
        if(!token) return res.status(401).json({message:"not authorized"})
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({message:"invalid token"})
      const user=await User.findById(decoded.userId).select("-password")
    if(!user) return res.status(401).json({message:"user not found"})
        req.user=user
        next();
    } catch (error) {
        console.log("error in protectRoute middleware:",error);
        res.status(500).json({message:"internal server error"})
        
    }
}