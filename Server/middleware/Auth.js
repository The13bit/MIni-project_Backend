import jwt from 'jsonwebtoken';
import { catchAsyncError } from './CatchAsyncError';
import {User} from "../Models/User";




export const auth = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
})