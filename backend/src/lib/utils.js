import jwt from 'jsonwebtoken'
export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId:userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,//millisecond
        httpOnly:true,//prevent xss attacks corrs-site scripting 
        sameSite:"strict",//csrf attcks
        secure:true
    });
    return token;
}