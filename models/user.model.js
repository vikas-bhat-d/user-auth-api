import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) return
    
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.checkPassword=async function (password) {
   const isCorrect=await bcrypt.compare(password,this.password)
   return isCorrect
}

userSchema.methods.generateAccessToken=async function() {
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'24h'
        }
    )
}

userSchema.methods.generateRefreshToken=async function (){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:'10d'
        }

    )
}

export const User=mongoose.model('User',userSchema);