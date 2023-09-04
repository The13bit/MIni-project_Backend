import {catchAsyncError} from '../middleware/CatchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import { User } from '../Models/User.js';
import { sendToken } from '../utils/sendToken.js';

export const register=catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;   
    
    if(!name || !email || !password){
        return next(new ErrorHandler("Please enter all fields",400))
    }

    let user = await User.findOne({email});

    if (user){
        return next(new ErrorHandler("User already exists",409))
    }
    user =await User.create({
        name,
        email,
        password,
    });
    sendToken(res,user,"User registered successfully",201);

});