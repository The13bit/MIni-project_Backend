import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],

    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validator:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:6,
        select:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    ResetPasswordToken:String,
    ResetPasswordExpire:String



});

schema.methods.getJwtToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT,{
        expiresIn:"15d"
    });
};



export const User=mongoose.model("User",schema)