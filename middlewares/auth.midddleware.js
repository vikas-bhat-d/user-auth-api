import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"

const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const accessToken=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!accessToken)
            throw new apiError(401,"Unauthorized request",["accesToken not found"])
    
        let decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        
        if(!decodedToken)
            throw new apiError(400,"Invalid token");
        
        
        const user=await User.findById(decodedToken._id).select("-password -refreshToken");
        if(!user)
            throw new apiError(400,"Invalid token,User not found")
    
        req.user=user;


    } catch (error) {
        throw new apiError(400,error.message||"verifying token failed");
        next(error)
    }
})

export {verifyJWT}